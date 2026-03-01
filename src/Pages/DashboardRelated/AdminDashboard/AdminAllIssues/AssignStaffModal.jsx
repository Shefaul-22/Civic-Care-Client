import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaUserShield, FaTimes, FaCheckCircle, FaUserTie } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";
import Swal from "sweetalert2";

const AssignStaffModal = ({ issue, close }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [staffId, setStaffId] = useState("");

  const { data: staffs = [], isLoading } = useQuery({
    queryKey: ["staffs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/staffs");
      return res.data;
    }
  });

  const handleAssign = async () => {
    const staff = staffs.find(s => s._id === staffId);

    try {
      await axiosSecure.patch(`/admin/issues/${issue._id}/assign`, {
        staffId: staff._id,
        name: staff.name, // আপনার ডেটা অনুযায়ী staff.name বা displayName ব্যবহার করুন
        email: staff.email,
      });

      Swal.fire({
        icon: "success",
        title: "Assigned!",
        text: `${staff.name} is now responsible for this issue.`,
        showConfirmButton: false,
        timer: 2000,
        background: "hsl(var(--b1))",
        color: "currentColor"
      });

      queryClient.invalidateQueries(["issues"]);
      close();
    } catch (error) {
      Swal.fire("Error", "Something went wrong while assigning.", "error");
      console.error(error);
    }
  };

  if (isLoading) return null; // Background এ Loading কম্পোনেন্ট মেইন পেজেই আছে

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-base-100 w-full max-w-md rounded-[2.5rem] border border-base-300 shadow-2xl overflow-hidden animate-in zoom-in duration-300">

        {/* Modal Header - Hot Pink Gradient */}
        <div className="bg-gradient-to-r from-[#fa0bd2] to-[#bc089e] p-8 text-white relative">
          <button
            onClick={close}
            className="absolute top-6 right-6 hover:rotate-90 transition-transform opacity-70 hover:opacity-100"
          >
            <FaTimes size={20} />
          </button>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md shadow-inner">
              <FaUserShield size={30} />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-none">Assign Staff</h3>
              <p className="text-[10px] font-bold opacity-80 uppercase tracking-[0.2em] mt-1 text-white/90">Task Delegation</p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-8 space-y-6">
          {/* Issue Preview (Static) */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Context</label>
            <div className="bg-base-200/50 p-4 rounded-2xl border border-base-200">
              <p className="font-bold text-sm leading-tight italic uppercase tracking-tighter opacity-80">
                {issue.title}
              </p>
            </div>
          </div>

          {/* Staff Selection */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2 flex items-center gap-2">
              <FaUserTie size={12} className="text-[#fa0bd2]" /> Choose Officer
            </label>

            <div className="relative group">
              <select
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
                className="select select-bordered w-full rounded-2xl bg-base-100 border-base-300 focus:border-[#fa0bd2] focus:ring-0 focus:outline-none font-bold text-sm h-14 transition-all"
              >
                <option value="" disabled>Select from active staff</option>
                {staffs.map(staff => (
                  <option key={staff._id} value={staff._id}>
                    {staff.name} — {staff.email}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={close}
              className="btn flex-1 rounded-2xl border-2 border-base-200 bg-transparent hover:bg-base-200 font-black uppercase tracking-widest text-[10px] h-14"
            >
              Dismiss
            </button>
            <button
              onClick={handleAssign}
              disabled={!staffId}
              className={`btn flex-[1.5] rounded-2xl border-none font-black uppercase tracking-widest text-[10px] h-14 shadow-lg transition-all ${!staffId
                  ? 'bg-base-300 opacity-50 cursor-not-allowed'
                  : 'bg-[#fa0bd2] hover:bg-[#d909b5] text-white shadow-[#fa0bd2]/20'
                }`}
            >
              <FaCheckCircle className="mr-2" /> Confirm Assignment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignStaffModal;