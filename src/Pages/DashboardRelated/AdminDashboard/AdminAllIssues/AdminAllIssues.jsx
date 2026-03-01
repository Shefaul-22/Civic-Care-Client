import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaUserPlus, FaTimesCircle, FaExclamationTriangle, FaFilter } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";
import Swal from "sweetalert2";
import AssignStaffModal from "./AssignStaffModal";

const AdminAllIssues = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [selectedIssue, setSelectedIssue] = useState(null);

    const { data: issues = [], isLoading } = useQuery({
        queryKey: ["issues"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/issues");
            return res.data;
        }
    });

    const handleReject = async (issueId) => {
        const confirm = await Swal.fire({
            title: "Reject this issue?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#fa0bd2",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, reject it!",
            background: "hsl(var(--b1))",
            color: "currentColor"
        });

        if (confirm.isConfirmed) {
            try {
                await axiosSecure.patch(`/admin/issues/${issueId}/reject`);
                queryClient.invalidateQueries({ queryKey: ["issues"] });

                Swal.fire({
                    icon: "success",
                    title: "Rejected",
                    text: "Issue has been rejected.",
                    showConfirmButton: false,
                    timer: 1500
                });
            } catch (error) {
                console.error("Rejection failed", error);
            }
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="p-4 md:p-8 space-y-8 bg-transparent min-h-screen pb-20">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl md:text-4xl font-black tracking-tighter italic uppercase">
                        All <span className='text-[#fa0bd2]'>Reported Issues</span>
                    </h2>
                    <p className="text-sm font-bold opacity-50 uppercase tracking-widest mt-1">
                        System Management & Oversight
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-base-100 p-2 rounded-2xl border border-base-200 shadow-sm">
                    <div className="bg-[#fa0bd2] text-white p-2 rounded-xl">
                        <FaFilter size={14} />
                    </div>
                    <span className="px-2 font-black text-xs uppercase opacity-70">Total: {issues.length}</span>
                </div>
            </div>

            {/* Empty State */}
            {issues.length === 0 && (
                <div className="bg-base-100 rounded-[2.5rem] border-2 border-dashed border-base-300 p-20 text-center">
                    <div className="flex justify-center mb-4 opacity-20">
                        <MdReportProblem size={80} />
                    </div>
                    <p className="text-xl font-black opacity-40 uppercase italic">
                        Clean Slate. No issues found.
                    </p>
                </div>
            )}

            {/* Desktop Table View */}
            {issues.length > 0 && (
                <div className="hidden lg:block bg-base-100 rounded-[2.5rem] border border-base-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table w-full border-collapse">
                            <thead>
                                <tr className="bg-base-200/50 text-[11px] uppercase tracking-widest font-black">
                                    <th className="py-6 px-8">Issue Details</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                    <th>Priority</th>
                                    <th>Assignee</th>
                                    <th className="text-right px-8">Management</th>
                                </tr>
                            </thead>

                            <tbody className="text-sm font-bold">
                                {issues.map((issue) => (
                                    <tr key={issue._id} className="border-b border-base-200 last:border-0 hover:bg-base-200/30 transition-all group">
                                        <td className="py-6 px-8">
                                            <div className="flex flex-col">
                                                <span className="uppercase tracking-tighter text-base font-black group-hover:text-[#fa0bd2] transition-colors leading-tight">
                                                    {issue.title}
                                                </span>
                                                <span className="text-[10px] opacity-40 font-medium">ID: {issue._id.slice(-8).toUpperCase()}</span>
                                            </div>
                                        </td>

                                        <td>
                                            <span className="bg-base-200 px-3 py-1 rounded-lg text-[10px] uppercase">
                                                {issue.category}
                                            </span>
                                        </td>

                                        <td>
                                            <StatusBadge status={issue.status} />
                                        </td>

                                        <td>
                                            {issue.priority === "high" ? (
                                                <div className="flex items-center gap-1.5 text-error">
                                                    <FaExclamationTriangle size={12} />
                                                    <span className="text-[11px] font-black uppercase tracking-widest">High</span>
                                                </div>
                                            ) : (
                                                <span className="text-[11px] opacity-50 font-black uppercase tracking-widest">Normal</span>
                                            )}
                                        </td>

                                        <td>
                                            {issue.staffName ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-[#fa0bd2]/10 flex items-center justify-center text-[#fa0bd2]">
                                                        {issue.staffName.charAt(0)}
                                                    </div>
                                                    <span className="text-xs">{issue.staffName}</span>
                                                </div>
                                            ) : (
                                                <span className="text-[12px] italic opacity-50">Unassigned</span>
                                            )}
                                        </td>

                                        <td className="text-right px-8">
                                            <div className="flex justify-end gap-2">
                                                {!issue.staffEmail && (
                                                    <button
                                                        className="btn btn-sm bg-[#fa0bd2] hover:bg-[#d909b5] text-white border-none rounded-xl px-4 normal-case"
                                                        onClick={() => setSelectedIssue(issue)}
                                                    >
                                                        <FaUserPlus size={14} className="mr-1" /> Assign
                                                    </button>
                                                )}

                                                {issue.status === "pending" && (
                                                    <button
                                                        className="btn btn-sm btn-ghost hover:bg-error/10 hover:text-error rounded-xl px-4 border border-base-300 normal-case"
                                                        onClick={() => handleReject(issue._id)}
                                                    >
                                                        <FaTimesCircle size={14} className="mr-1" /> Reject
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Mobile Card View */}
            <div className="lg:hidden grid grid-cols-1 gap-4">
                {issues.map((issue) => (
                    <div
                        key={issue._id}
                        className="bg-base-100 rounded-[2rem] p-6 border border-base-200 shadow-sm space-y-4"
                    >
                        <div className="flex justify-between items-start">
                            <h3 className="font-black text-sm uppercase tracking-tighter leading-tight flex-1">
                                {issue.title}
                            </h3>
                            <StatusBadge status={issue.status} />
                        </div>

                        <div className="grid grid-cols-2 gap-2 py-2 border-y border-base-200 border-dashed text-[10px] font-black uppercase opacity-60">
                            <div>Cat: {issue.category}</div>
                            <div className="text-right">Pri: {issue.priority}</div>
                        </div>

                        <div className="flex justify-between items-center text-xs">
                            <span className="opacity-40 font-bold uppercase text-[10px]">Staff:</span>
                            <span className="font-black text-[#fa0bd2]">{issue.staffName || "NONE"}</span>
                        </div>

                        <div className="flex gap-2 pt-2">
                            {!issue.staffEmail && (
                                <button
                                    className="btn btn-sm bg-[#fa0bd2] hover:bg-[#d909b5] text-white border-none flex-1 rounded-2xl"
                                    onClick={() => setSelectedIssue(issue)}
                                >
                                    Assign
                                </button>
                            )}

                            {issue.status === "pending" && (
                                <button
                                    className="btn btn-sm btn-ghost border-base-300 flex-1 rounded-2xl"
                                    onClick={() => handleReject(issue._id)}
                                >
                                    Reject
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Integration */}
            {selectedIssue && (
                <AssignStaffModal
                    issue={selectedIssue}
                    close={() => setSelectedIssue(null)}
                />
            )}
        </div>
    );
};

/* ===== Enhanced Reusable Status Badge ===== */
const StatusBadge = ({ status }) => {
    const styles = {
        pending: "bg-warning/10 text-warning border-warning/20",
        closed: "bg-success/10 text-success border-success/20",
        rejected: "bg-error/10 text-error border-error/20",
        "in-progress": "bg-info/10 text-info border-info/20",
    };

    const label = status === "in-progress" ? "In Progress" : status;

    return (
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${styles[status] || "bg-base-200"}`}>
            {label}
        </span>
    );
};

export default AdminAllIssues;