import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../components/Loading/Loading";
import EditIssueModal from "../DashboardRelated/CitizenDashboard/MyIssues/EditIssueModal";
import Timeline from "./Timeline";
import { handleBlockedError } from "../../utils/handleBlockedError";
import { useQuery } from "@tanstack/react-query";
import { IoAlertCircleOutline, IoRocketOutline, IoTrashOutline, IoCreateOutline } from "react-icons/io5";

const statusColors = {
  pending: "badge-warning",
  "in-progress": "badge-info",
  resolved: "badge-success",
  closed: "badge-ghost"
};

const IssueDetails = () => {
  const { id } = useParams();
  const { user, loading: authLoading } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [editIssue, setEditIssue] = useState(null);

  useEffect(() => {
    axiosSecure.get(`/issues/${id}`).then(res => setIssue(res.data));
  }, [id, axiosSecure]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    if (sessionId) {
      axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
        .then(res => {
          if (res.data.success) {
            axiosSecure.get(`/issues/${id}`).then(r => setIssue(r.data));
            Swal.fire('Boosted!', 'Issue priority updated to High!', 'success');
          }
        });
    }
  }, [id, axiosSecure]);

  const { data: assignStaff = {}, isLoading } = useQuery({
    queryKey: ["assign-staff", issue?.staffEmail],
    enabled: !!issue?.staffEmail,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${issue.staffEmail}`);
      return res.data[0]; // Assuming it returns an array
    }
  });

  if (!issue || authLoading || isLoading) return <Loading />;

  const isCreator = user?.email === issue.senderEmail;
  const canEdit = isCreator && issue.status === "pending";
  const canDelete = isCreator;
  const canBoost = issue.priority !== "high";

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Delete Issue?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!"
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/issues/${id}`);
        Swal.fire("Deleted!", "Issue has been removed.", "success");
        navigate("/dashboard/my-issues");
      } catch (error) {
        handleBlockedError(error);
      }
    }
  };

  const handleBoost = async (issue) => {
    const confirm = await Swal.fire({
      title: "Boost Priority?",
      text: "Enhance visibility for 100 TK",
      icon: "rocket",
      showCancelButton: true,
      confirmButtonText: "Proceed to Payment",
      confirmButtonColor: "#fa0bd2"
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.post(`/create-checkout-session`, {
        issueId: issue._id,
        boostedBy: user.email,
        title: issue.title
      });
      window.location.href = res.data.url;
    } catch (error) {
      handleBlockedError(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 mt-8 md:mt-12 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-base-content">
            ISSUE <span className="text-[#fa0bd2]">DETAILS</span>
          </h1>
          <p className="text-base-content/50 font-medium">Tracking ID: {issue._id}</p>
        </div>
        
        <div className="flex gap-2">
          <div className={`badge badge-lg p-4 font-bold ${statusColors[issue.status]}`}>
            {issue.status.toUpperCase()}
          </div>
          {issue.priority === "high" && (
            <div className="badge badge-error badge-lg p-4 font-bold gap-2">
              <IoRocketOutline /> BOOSTED
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Image & Actions */}
        <div className="lg:col-span-1 space-y-6">
          <div className="relative group overflow-hidden rounded-[2rem] border-4 border-base-200 shadow-2xl">
            <img 
              src={issue.photoURL} 
              alt={issue.title} 
              className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500" 
            />
          </div>

          <div className="flex flex-col gap-3">
            {canEdit && (
              <button onClick={() => setEditIssue(issue)} className="btn btn-primary rounded-2xl flex items-center gap-2">
                <IoCreateOutline size={20} /> Edit Details
              </button>
            )}
            {issue.status !== "resolved" && issue.status !== "closed" && canBoost && (
              <button onClick={() => handleBoost(issue)} className="btn bg-[#fa0bd2] hover:bg-[#d409b8] text-white rounded-2xl gap-2 border-none">
                <IoRocketOutline size={20} /> Boost Priority
              </button>
            )}
            {canDelete && (
              <button onClick={handleDelete} className="btn btn-ghost text-error hover:bg-error/10 rounded-2xl gap-2">
                <IoTrashOutline size={20} /> Remove Issue
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Info & Timeline */}
        <div className="lg:col-span-2 space-y-8">
          {/* Info Card */}
          <div className="bg-base-200/50 p-6 md:p-10 rounded-[2.5rem] border border-base-200">
            <div className="mb-6">
              <span className="text-xs font-black uppercase tracking-widest text-[#fa0bd2]">{issue.category}</span>
              <h2 className="text-3xl font-black text-base-content tracking-tight mt-1">{issue.title}</h2>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-base-content/40 uppercase tracking-widest flex items-center gap-2">
                <IoAlertCircleOutline /> Description
              </h4>
              <p className="text-base-content/70 leading-relaxed font-medium">
                {issue.issueDescription}
              </p>
            </div>
          </div>

          {/* Assigned Staff */}
          {issue.staffId && (
            <div className="bg-base-100 p-6 rounded-[2.5rem] border-2 border-base-200 shadow-sm flex items-center gap-6">
              <div className="avatar">
                <div className="w-16 rounded-2xl ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={assignStaff?.photoURL || "https://i.pravatar.cc/150"} alt="staff" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xs font-black text-primary uppercase tracking-widest">Assigned Specialist</p>
                <h3 className="text-xl font-bold text-base-content">{issue.staffName}</h3>
                <p className="text-sm text-base-content/50 italic">"{issue.statusMessage || 'Work in progress...'}"</p>
              </div>
            </div>
          )}

          {/* Timeline Section */}
          <div className="space-y-6 pt-4">
            <h3 className="text-2xl font-black text-base-content tracking-tighter uppercase italic flex items-center gap-2">
              Resolution <span className="text-[#fa0bd2]">Timeline</span>
            </h3>
            <div className="bg-base-200/30 p-6 rounded-[2.5rem] border border-base-200">
              <Timeline timeline={issue.timeline} />
            </div>
          </div>
        </div>
      </div>

      {editIssue && (
        <EditIssueModal
          issue={editIssue}
          onClose={() => setEditIssue(null)}
          onUpdated={async () => {
            setEditIssue(null);
            const res = await axiosSecure.get(`/issues/${id}`);
            setIssue(res.data);
          }}
        />
      )}
    </div>
  );
};

export default IssueDetails;