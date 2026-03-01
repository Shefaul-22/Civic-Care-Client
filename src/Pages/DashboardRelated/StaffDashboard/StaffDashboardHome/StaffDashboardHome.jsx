import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
    ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";
import { FaClock, FaCheckCircle, FaSpinner, FaInbox, FaTasks, FaHistory } from "react-icons/fa";
import { MdReportProblem } from "react-icons/md";

import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";
import StatCard from "../../CitizenDashboard/CitizenDashboardHome/StatCard";

const StaffDashboardHome = () => {
    const axiosSecure = useAxiosSecure();

    const { data = {}, isLoading } = useQuery({
        queryKey: ["staff-dashboard-summary"],
        queryFn: async () => {
            const res = await axiosSecure.get("/staff/dashboard/summary");
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    const {
        totalAssigned = 0,
        pendingIssues = 0,
        inProgressIssues = 0,
        resolvedIssues = 0,
        closedIssues = 0,
        todayTasks = 0,
        statusPieData = [],
        latestIssues = [],
    } = data;

    // Staff Specific Stat Data
    const staffStats = [
        { title: "Assigned", value: totalAssigned, icon: <FaInbox size={22} />, trend: "Active", trendType: "up", color: "primary" },
        { title: "Pending", value: pendingIssues, icon: <FaClock size={22} />, trend: "Action", trendType: "down", color: "warning" },
        { title: "In Progress", value: inProgressIssues, icon: <FaSpinner size={22} className="animate-spin-slow" />, trend: "Live", trendType: "up", color: "info" },
        { title: "Resolved", value: resolvedIssues, icon: <FaCheckCircle size={22} />, trend: "Done", trendType: "up", color: "success" },
        { title: "Closed", value: closedIssues, icon: <FaHistory size={22} />, trend: "Archive", trendType: "down", color: "secondary" },
        { title: "Today's Tasks", value: todayTasks, icon: <FaTasks size={22} />, trend: "New", trendType: "up", color: "error" }
    ];

    const sharedTooltipStyle = {
        backgroundColor: 'rgba(23, 23, 23, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        border: '1px solid rgba(250, 11, 210, 0.2)',
        color: '#fff',
        padding: '12px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
    };

    return (
        <div className="p-4 md:p-6 space-y-10 bg-transparent text-base-content min-h-screen pb-10">
            <h2 className="text-4xl font-black tracking-tighter italic uppercase">
                Staff <span className="text-[#fa0bd2] drop-shadow-sm">Overview</span>
            </h2>

            {/* Stat Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
                {staffStats.map((stat, idx) => (
                    <StatCard
                        key={idx}
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon}
                        trend={stat.trend}
                        trendType={stat.trendType}
                        color={stat.color}
                    />
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 1. Bar Chart: Status Ratio */}
                <div className="bg-base-100 rounded-[2.5rem] p-8 border border-base-200 shadow-sm">
                    <h3 className="text-xl font-black tracking-tight flex items-center gap-2 mb-8">
                        <MdReportProblem className="text-[#fa0bd2]" /> Issues Status Ratio
                    </h3>

                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={statusPieData}>
                                <CartesianGrid strokeDasharray="10 10" vertical={false} stroke="currentColor" opacity={0.05} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 10, fontWeight: 'bold' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 10 }} allowDecimals={false} />
                                <Tooltip
                                    contentStyle={sharedTooltipStyle}
                                    cursor={{ fill: 'rgba(250, 11, 210, 0.05)' }}
                                />
                                <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={40}>
                                    {statusPieData.map((entry, index) => (
                                        <Cell key={`cell-bar-${index}`} fill={entry.color || '#fa0bd2'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 2. Pie Chart: Workload */}
                <div className="bg-base-100 rounded-[2.5rem] p-8 border border-base-200 shadow-sm">
                    <h3 className="text-xl font-black tracking-tight flex items-center gap-2 mb-8">Workload Ratio</h3>
                    <div className="h-72 w-full">
                        {statusPieData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={statusPieData}
                                        innerRadius={70} outerRadius={90}
                                        paddingAngle={8} dataKey="value"
                                        stroke="none"
                                    >
                                        {statusPieData.map((entry, index) => (
                                            <Cell key={`cell-pie-${index}`} fill={entry.color || '#fa0bd2'} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={sharedTooltipStyle} />
                                    <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center italic opacity-40">No data available</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Latest Issues Section */}
            <div className="space-y-6">
                <h3 className="text-2xl font-black tracking-tight uppercase italic px-2">
                    Latest <span className="text-[#fa0bd2]">Assigned Issues</span>
                </h3>

                {/* Desktop Table */}
                <div className="hidden md:block bg-base-100 rounded-[2.5rem] border border-base-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="table w-full border-collapse">
                            <thead>
                                <tr className="bg-base-200/50 text-[11px] uppercase tracking-widest font-black">
                                    <th className="py-5 px-8">Title</th>
                                    <th>Status</th>
                                    <th>Priority</th>
                                    <th>Created At</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-bold">
                                {latestIssues.map((issue, idx) => (
                                    <tr key={idx} className="border-b border-base-200 last:border-0 hover:bg-base-200/30 transition-colors">
                                        <td className="py-5 px-8 uppercase tracking-tighter">{issue.title}</td>
                                        <td>
                                            <span className="text-[10px] bg-base-200 px-3 py-1 rounded-full uppercase tracking-tighter border border-base-300">
                                                {issue.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className={`text-[10px] px-3 py-1 rounded-full inline-block uppercase tracking-tighter font-black ${issue.priority === "high" ? "bg-error/10 text-error border border-error/20" :
                                                    issue.priority === "medium" ? "bg-warning/10 text-warning border border-warning/20" :
                                                        "bg-secondary/10 text-secondary border border-secondary/20"
                                                }`}>
                                                {issue.priority}
                                            </div>
                                        </td>
                                        <td className="opacity-50">{new Date(issue.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile Cards */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {latestIssues.map((issue, idx) => (
                        <div key={idx} className="bg-base-100 border border-base-200 rounded-3xl p-5 space-y-4 shadow-sm">
                            <div className="flex justify-between items-start gap-4">
                                <h4 className="font-black text-sm uppercase leading-tight flex-1 tracking-tight">{issue.title}</h4>
                                <span className={`text-[9px] px-2 py-0.5 rounded-md font-black uppercase ${issue.priority === "high" ? "bg-error text-white" :
                                        issue.priority === "medium" ? "bg-warning text-black" : "bg-secondary text-white"
                                    }`}>{issue.priority}</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-bold">
                                <div className="bg-base-200 px-3 py-1 rounded-full uppercase opacity-70">{issue.status}</div>
                                <span className="opacity-40">{new Date(issue.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {latestIssues.length === 0 && (
                    <div className="text-center py-16 bg-base-100 rounded-[2.5rem] border border-base-200 opacity-40 italic">
                        No issues assigned yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default StaffDashboardHome;