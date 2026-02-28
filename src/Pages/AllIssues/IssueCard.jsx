import React from 'react';
import { AiFillLike } from 'react-icons/ai';
import { IoLocationSharp, IoTimeOutline, IoCheckmarkCircle, IoAlertCircle, IoHammer, IoLockClosedOutline, IoRocketSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router';
import { MdCategory } from "react-icons/md";
import Swal from "sweetalert2";

const IssueCard = ({ issue, user, refetch, axiosSecure }) => {
    const navigate = useNavigate();

    const handleUpvote = async () => {
        if (!user) {
            navigate("/login");
            return;
        }

        if (issue.senderEmail === user.email) {
            Swal.fire({
                title: "Not allowed",
                text: "You cannot upvote your own issue",
                icon: "warning",
                background: 'var(--fallback-b1,oklch(var(--b1)))',
                color: 'var(--fallback-bc,oklch(var(--bc)))'
            });
            return;
        }

        try {
            await axiosSecure.patch(`/issues/${issue._id}/upvote`);
            refetch();
        } catch (err) {
            Swal.fire({
                title: "Information",
                text: err.response?.data?.message || "You have already upvoted this issue",
                icon: "info",
                background: 'var(--fallback-b1,oklch(var(--b1)))',
                color: 'var(--fallback-bc,oklch(var(--bc)))'
            });
        }
    };

    const handleViewDetails = () => {
        navigate(`/issues/${issue._id}`);
    };

    const statusConfig = {
        pending: {
            color: "bg-orange-500 text-white border-none shadow-lg shadow-orange-500/20",
            icon: <IoTimeOutline className="animate-pulse" />
        },
        resolved: {
            color: "bg-success/20 text-success border-success/30",
            icon: <IoCheckmarkCircle className="animate-bounce" />
        },
        "in-progress": {
            color: "bg-blue-600 text-white border-none shadow-lg shadow-blue-600/20",
            icon: <IoHammer className="animate-spin-slow" />
        },
        closed: {
            color: "bg-base-300 text-base-content/50 border-base-content/10",
            icon: <IoLockClosedOutline />
        }
    };

    const currentStatus = statusConfig[issue.status] || statusConfig.pending;
    const isHighPriority = issue.priority === "high";

    return (
        <div className={`group relative card bg-base-100 transition-all duration-500 overflow-hidden rounded-[2.5rem] 
            ${isHighPriority
                ? 'border-2 border-[#fa0bd2] shadow-[0_0_25px_rgba(250,11,210,0.2)]'
                : 'border border-base-300 shadow-sm'} 
            hover:shadow-2xl hover:-translate-y-2`}>

            {/* Image Section */}
            <div className="relative">
                <img
                    src={issue.photoURL}
                    alt={issue.title}
                    className={`w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700 ${issue.status === 'closed' ? 'grayscale opacity-50' : ''}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

                {/* Badges Overlay */}
                <div className="absolute top-5 left-5 right-5 flex flex-col gap-2 z-10">
                    <div className="flex justify-between items-start w-full">
                        {/* Status Badge */}
                        <span className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-black backdrop-blur-md border shadow-xl ${currentStatus.color}`}>
                            {currentStatus.icon}
                            {issue.status.toUpperCase()}
                        </span>

                        {/* High Priority Badge */}
                        {isHighPriority && (
                            <span className="flex items-center gap-1 px-4 py-2 bg-error text-white rounded-full text-[10px] font-black shadow-lg">
                                <IoAlertCircle size={14} /> HIGH
                            </span>
                        )}
                    </div>

                    {/* Boosted Badge - Positioned below High badge when it exists */}
                    {isHighPriority && (
                        <div className="flex justify-end">
                            <span className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#fa0bd2] to-[#b00794] text-white rounded-full text-[10px] font-black shadow-xl animate-pulse border border-white/20">
                                <IoRocketSharp className="animate-bounce" size={14} /> BOOSTED
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col gap-4">
                <div>
                    <div className="flex items-center gap-2 text-primary font-bold text-[10px] mb-2 uppercase tracking-[0.2em]">
                        <MdCategory className={isHighPriority ? "text-[#fa0bd2]" : ""} /> {issue.category}
                    </div>
                    <h2 className="text-xl font-black text-base-content line-clamp-1 group-hover:text-[#fa0bd2] transition-colors leading-tight">
                        {issue.title}
                    </h2>
                </div>

                {/* Location Box */}
                <div className="flex items-center gap-3 p-4 bg-base-200/50 rounded-3xl border border-base-300">
                    <div className={`p-2.5 rounded-2xl ${isHighPriority ? 'bg-[#fa0bd2]/10 text-[#fa0bd2]' : 'bg-primary/10 text-primary'}`}>
                        <IoLocationSharp size={20} />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-[10px] uppercase font-bold text-base-content/30 tracking-widest mb-1">Citizen Location</span>
                        <span className="text-sm font-bold text-base-content/80 truncate">{issue.senderDistrict}, {issue.senderRegion}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 mt-2">
                    {/* Upvote Button */}
                    <button
                        onClick={handleUpvote}
                        className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all active:scale-90 font-bold border cursor-pointer 
                        ${isHighPriority
                                ? 'bg-[#fa0bd2]/5 text-[#fa0bd2] border-[#fa0bd2]/20 hover:bg-[#fa0bd2] hover:text-white'
                                : 'bg-base-200 text-base-content border-base-300 hover:border-primary hover:text-primary'}`}
                    >
                        <AiFillLike className={issue.upvotes > 0 ? "animate-bounce text-xl" : "text-xl"} />
                        <span className="text-xl">{issue.upvotes || 0}</span>
                    </button>

                    {/* View Details Button */}
                    <button
                        onClick={handleViewDetails}
                        className={`flex-grow py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg transition-all cursor-pointer active:scale-95
                        ${isHighPriority
                                ? 'bg-gradient-to-r from-[#fa0bd2] to-[#6366F1] text-white shadow-[#fa0bd2]/20 hover:brightness-110'
                                : 'bg-base-content text-base-100 hover:opacity-90'}`}
                    >
                        View Report
                    </button>
                </div>
            </div>

            <style jsx>{`
                .animate-spin-slow {
                    animation: spin 4s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default IssueCard;