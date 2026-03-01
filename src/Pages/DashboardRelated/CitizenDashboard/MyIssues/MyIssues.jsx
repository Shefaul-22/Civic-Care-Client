import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../../hooks/UseAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";
import { useNavigate } from "react-router";
import Loading from "../../../../components/Loading/Loading";
import EditIssueModal from "./EditIssueModal";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaEye, FaFilter, FaLayerGroup, FaDotCircle } from "react-icons/fa";

const MyIssues = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [filters, setFilters] = useState({ status: "", category: "" });
    const [editModalData, setEditModalData] = useState(null);

    const { data: issues = [], refetch, isLoading } = useQuery({
        queryKey: ["myIssues", user?.email, filters],
        queryFn: async () => {
            const res = await axiosSecure.get(`/citizen-issues?email=${user.email}`, {
                params: filters
            });
            return res.data;
        },
    });

    const handleDelete = async (issueId) => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

        const confirm = await Swal.fire({
            title: "PURGE RECORD?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#fa0bd2",
            cancelButtonColor: isDark ? "#374151" : "#d1d5db",
            confirmButtonText: "YES, DELETE",
            background: isDark ? "#1f2937" : "#ffffff",
            color: isDark ? "#f3f4f6" : "#1f2937"
        });

        if (confirm.isConfirmed) {
            try {
                await axiosSecure.delete(`/issues/${issueId}`);
                refetch();
                Swal.fire({
                    title: "Deleted!",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                    background: isDark ? "#1f2937" : "#ffffff",
                    color: isDark ? "#f3f4f6" : "#1f2937"
                });
            } catch (err) {
                Swal.fire("Error", "Failed to delete", "error");
                console.error(err);
            }
        }
    };

    // Adaptive Status Styles
    const getStatusStyles = (status) => {
        const config = {
            pending: "text-warning border-warning/30 bg-warning/5",
            "in-progress": "text-info border-info/30 bg-info/5",
            working: "text-primary border-primary/30 bg-primary/5",
            resolved: "text-success border-success/30 bg-success/5",
            closed: "text-base-content/50 border-base-content/20 bg-base-content/5"
        };
        return config[status] || "text-base-content/40 border-base-content/10";
    };

    if (isLoading) return <Loading />;

    return (
        <div className="p-4 md:p-8 space-y-8 min-h-screen transition-colors duration-300">

            {/* --- Header Section --- */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter italic uppercase text-base-content">
                        My Submitted <span className="text-[#fa0bd2] drop-shadow-[0_0_8px_rgba(250,11,210,0.3)]">Issues</span>
                    </h2>
                    <p className="text-xs font-bold opacity-60 uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
                        <span className="w-8 h-[2px] bg-[#fa0bd2]"></span>
                        Tracking {issues.length} active reports
                    </p>
                </div>

                {/* Filters Interface - Adaptive Glassmorphism */}
                <div className="flex flex-wrap items-center gap-3 bg-base-200/40 backdrop-blur-md p-3 rounded-2xl border border-base-content/10 shadow-sm">
                    <div className="flex items-center gap-2 px-3 text-[10px] font-black uppercase opacity-60 text-base-content">
                        <FaFilter className="text-[#fa0bd2]" /> Filters
                    </div>
                    <select
                        className="select select-sm rounded-xl bg-base-100 text-base-content border-base-content/10 font-bold text-xs focus:ring-2 ring-[#fa0bd2]/50 transition-all"
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    >
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="working">Working</option>
                        <option value="resolved">Resolved</option>
                    </select>

                    <select
                        className="select select-sm rounded-xl bg-base-100 text-base-content border-base-content/10 font-bold text-xs focus:ring-2 ring-[#fa0bd2]/50 transition-all"
                        value={filters.category}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    >
                        <option value="">All Categories</option>
                        <option value="Broken streetlights">Streetlights</option>
                        <option value="Potholes">Potholes</option>
                        <option value="Water leakage">Water Leak</option>
                        <option value="Garbage overflow">Garbage</option>
                    </select>
                </div>
            </div>

            {/* --- Desktop View --- */}
            <div className="hidden lg:block bg-base-100 rounded-[2.5rem] border border-base-content/5 shadow-2xl overflow-hidden transition-all hover:border-base-content/10">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-base-200/60 text-[10px] uppercase tracking-widest font-black text-base-content/50 border-b border-base-content/5">
                            <th className="py-6 px-8">Subject & Identity</th>
                            <th>Status & Severity</th>
                            <th>Classification</th>
                            <th className="text-right px-8">Operations</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-bold text-base-content/80">
                        {issues.map((issue) => (
                            <tr key={issue._id} className="border-b border-base-content/5 hover:bg-base-200/40 transition-all group">
                                <td className="py-6 px-8">
                                    <div className="flex flex-col gap-1">
                                        <span className="uppercase tracking-tighter font-black group-hover:text-[#fa0bd2] transition-colors duration-300">
                                            {issue.title}
                                        </span>
                                        <span className="text-[9px] opacity-40 font-mono tracking-widest">
                                            REF: {issue._id.slice(-8).toUpperCase()}
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex flex-col gap-2">
                                        <span className={`px-4 py-1.5 rounded-lg border text-[10px] font-black uppercase text-center w-max shadow-sm ${getStatusStyles(issue.status)}`}>
                                            {issue.status}
                                        </span>
                                        <div className={`text-[9px] uppercase font-black px-1 flex items-center gap-1.5 ${issue.priority === 'high' ? 'text-error animate-pulse' : 'opacity-40'}`}>
                                            <FaDotCircle size={8} /> {issue.priority} priority
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                                        <div className="p-2 bg-base-300 rounded-lg text-[#fa0bd2]">
                                            <FaLayerGroup size={12} />
                                        </div>
                                        <span className="text-[10px] uppercase tracking-wider">{issue.category}</span>
                                    </div>
                                </td>
                                <td className="text-right px-8 space-x-1">
                                    <button onClick={() => navigate(`/issues/${issue._id}`)} className="btn btn-sm btn-ghost hover:bg-info/10 hover:text-info rounded-xl group/btn" title="View Details">
                                        <FaEye className="group-hover/btn:scale-110 transition-transform" />View
                                    </button>
                                    {issue.status === "pending" && (
                                        <button onClick={() => setEditModalData(issue)} className="btn btn-sm btn-ghost hover:bg-warning/10 hover:text-warning rounded-xl group/btn" title="Edit">
                                            <FaEdit className="group-hover/btn:scale-110 transition-transform" />Edit
                                        </button>
                                    )}
                                    <button onClick={() => handleDelete(issue._id)} className="btn btn-sm btn-ghost hover:bg-error/10 hover:text-error rounded-xl group/btn" title="Delete">
                                        <FaTrash className="group-hover/btn:scale-110 transition-transform text-[12px]" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- Mobile Card View --- */}
            <div className="lg:hidden grid grid-cols-1 gap-5">
                {issues.map((issue) => (
                    <div key={issue._id} className="bg-base-100 rounded-[2rem] p-6 border border-base-content/5 shadow-lg space-y-5 active:scale-[0.98] transition-transform">
                        <div className="flex justify-between items-start">
                            <h3 className="font-black uppercase tracking-tighter italic text-xl leading-none text-base-content group-hover:text-[#fa0bd2]">
                                {issue.title}
                            </h3>
                            <span className={`px-3 py-1 rounded-lg border text-[9px] font-black uppercase ${getStatusStyles(issue.status)}`}>
                                {issue.status}
                            </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 py-4 border-y border-dashed border-base-content/10 text-[10px] font-bold uppercase text-base-content/60">
                            <span className="flex items-center gap-1.5"><FaLayerGroup className="text-[#fa0bd2]" /> {issue.category}</span>
                            <span className={`flex items-center gap-1.5 ${issue.priority === 'high' ? 'text-error' : ''}`}>
                                <FaDotCircle size={8} /> {issue.priority}
                            </span>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={() => navigate(`/issues/${issue._id}`)} className="btn btn-sm flex-1 bg-base-200 text-base-content border-none rounded-xl font-black text-[10px] uppercase tracking-widest">Details</button>
                            {issue.status === "pending" && (
                                <button onClick={() => setEditModalData(issue)} className="btn btn-sm flex-1 bg-warning/10 text-warning rounded-xl border-none font-black text-[10px] uppercase tracking-widest">Edit</button>
                            )}
                            <button onClick={() => handleDelete(issue._id)} className="btn btn-sm px-5 bg-error/10 text-error rounded-xl border-none"><FaTrash /></button>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- Empty State --- */}
            {!isLoading && issues.length === 0 && (
                <div className="py-32 text-center bg-base-200/20 rounded-[3rem] border-2 border-dashed border-base-content/10">
                    <div className="opacity-10 text-6xl mb-4 flex justify-center italic font-black">NULL</div>
                    <p className="text-sm font-black uppercase italic opacity-30 tracking-[0.5em]">No Records Found</p>
                </div>
            )}

            {/* Edit Modal Component */}
            {editModalData && (
                <EditIssueModal
                    issue={editModalData}
                    onClose={() => setEditModalData(null)}
                    onUpdated={() => {
                        setEditModalData(null);
                        refetch();
                    }}
                />
            )}
        </div>
    );
};

export default MyIssues;