import React from 'react';
import { IoLocationSharp, IoTimeOutline, IoCheckmarkCircle, IoAlertCircle, IoHammer, IoLockClosedOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router';
import { SlCalender } from "react-icons/sl";
import { MdCategory } from "react-icons/md";

const IssueCard = ({ issue }) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/issues/${issue._id}`);
    };

    // স্ট্যাটাস অনুযায়ী আইকন এবং কালার কনফিগ
    const statusConfig = {
        pending: {
            color: "bg-warning/10 text-warning border-warning/20",
            icon: <IoTimeOutline className="animate-pulse" />
        },
        resolved: {
            color: "bg-success/10 text-success border-success/20",
            icon: <IoCheckmarkCircle />
        },
        "in-progress": {
            color: "bg-info/10 text-info border-info/20",
            icon: <IoHammer className="animate-bounce" />
        },
        closed: {
            color: "bg-base-300/50 text-base-content/40 border-base-content/10",
            icon: <IoLockClosedOutline />
        }
    };

    const currentStatus = statusConfig[issue.status] || statusConfig.pending;
    const isHighPriority = issue.priority === "high";

    return (
        <div className={`group card bg-base-100 transition-all duration-300 overflow-hidden rounded-3xl relative
            ${isHighPriority 
                ? 'border-2 border-[#fa0bd2] shadow-[0_0_15px_rgba(250,11,210,0.2)]' 
                : 'border border-base-300 shadow-sm'} 
            hover:shadow-xl hover:-translate-y-1`}>
            
            {/* High Priority Premium Tag */}
            {isHighPriority && (
                <div className="absolute -right-12 top-6 rotate-45 bg-[#fa0bd2] text-white py-1 px-12 z-20 text-[10px] font-black shadow-lg">
                    PREMIUM
                </div>
            )}

            {/* Image Section with Overlay Gradient */}
            <div className="relative">
                <img
                    src={issue.photoURL}
                    alt={issue.title}
                    className={`w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500 ${issue.status === 'closed' ? 'grayscale' : ''}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Floating Status & Priority Badges */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                    <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md border ${currentStatus.color}`}>
                        {currentStatus.icon}
                        {issue.status.toUpperCase()}
                    </span>

                    {isHighPriority && (
                        <span className="flex items-center gap-1 px-3 py-1.5 bg-error text-white rounded-full text-xs font-black animate-bounce shadow-lg shadow-error/40">
                            <IoAlertCircle size={14} /> HIGH
                        </span>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col gap-4">
                {/* Title & Category */}
                <div>
                    <div className="flex items-center gap-2 text-primary font-bold text-xs mb-1 uppercase tracking-widest">
                        <MdCategory className={isHighPriority ? "text-[#fa0bd2]" : ""} /> {issue.category}
                    </div>
                    <h2 className="text-xl font-black text-base-content line-clamp-1 group-hover:text-[#fa0bd2] transition-colors">
                        {issue.title}
                    </h2>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-base-200">
                    <div className="flex items-center gap-2 text-base-content/70">
                        <div className="p-2 bg-base-200 rounded-lg">
                            <IoLocationSharp className={isHighPriority ? "text-[#fa0bd2]" : "text-primary"} size={16} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-bold text-base-content/40">Location</span>
                            <span className="text-xs font-bold truncate">{issue.senderDistrict}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-base-content/70">
                        <div className="p-2 bg-base-200 rounded-lg">
                            <SlCalender className="text-primary" size={16} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-bold text-base-content/40">Reported</span>
                            <span className="text-xs font-bold">
                                {new Date(issue.createdAt).toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "short",
                                })}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <button
                    onClick={handleViewDetails}
                    className={`mt-2 w-full btn border-none text-white font-bold rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg 
                        ${issue.status === 'closed' 
                            ? 'bg-gray-500 shadow-gray-500/20' 
                            : 'bg-gradient-to-r from-[#fa0bd2] to-[#b00794] shadow-primary/20'}`}
                >
                    {issue.status === 'closed' ? 'View Archived Report' : 'View Full Report'}
                </button>
            </div>
        </div>
    );
};

export default IssueCard;