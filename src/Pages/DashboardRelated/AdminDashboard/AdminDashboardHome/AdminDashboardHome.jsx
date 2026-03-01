import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
    ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";
import { MdReportProblem } from "react-icons/md";
import { FaCheckCircle, FaTimesCircle, FaClock, FaMoneyBillWave, FaUsers } from "react-icons/fa";
import { HiOutlineLightningBolt } from "react-icons/hi";

import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";
import StatCard from "../../CitizenDashboard/CitizenDashboardHome/StatCard";


const AdminDashboardHome = () => {
    const axiosSecure = useAxiosSecure();

    const { data = {}, isLoading } = useQuery({
        queryKey: ["admin-dashboard-summary"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/dashboard/summary");
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    const { stats = {}, charts = {}, latest = {} } = data;
    const { totalIssues, pendingIssues, resolvedIssues, rejectedIssues, totalPaymentReceived } = stats;
    const { issueStatusPie = [], userRolePie = [], paymentChart = [] } = charts;
    const { issues: latestIssues = [], payments: latestPayments = [], users: latestUsers = [] } = latest;

    const sharedTooltipStyle = {
        backgroundColor: 'rgba(23, 23, 23, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        border: '1px solid rgba(250, 11, 210, 0.2)',
        color: '#fff',
        padding: '12px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
    };

    // Updated StatData to match your new StatCard props
    const statData = [
        { title: "Total Issues", value: totalIssues, icon: <MdReportProblem size={24} />, trend: "12", trendType: "up", color: "primary" },
        { title: "Pending", value: pendingIssues, icon: <FaClock size={22} />, trend: "5", trendType: "down", color: "warning" },
        { title: "Resolved", value: resolvedIssues, icon: <FaCheckCircle size={22} />, trend: "18", trendType: "up", color: "success" },
        { title: "Rejected", value: rejectedIssues, icon: <FaTimesCircle size={22} />, trend: "2", trendType: "down", color: "error" },
        { title: "Total Revenue", value: `৳${Number(totalPaymentReceived || 0).toLocaleString('en-IN')}`, icon: <FaMoneyBillWave size={22} />, trend: "25", trendType: "up", color: "info" }
    ];

    return (
        <div className="space-y-10 pb-10">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-4xl font-black tracking-tighter italic uppercase">
                        Admin <span className="text-[#fa0bd2] drop-shadow-sm">Analytics</span>
                    </h2>
                    <p className="text-sm font-bold opacity-40 uppercase tracking-[0.3em] mt-1">Real-time system pulse & monitoring</p>
                </div>
                <div className="flex items-center gap-2 bg-base-100 p-2 rounded-2xl border border-base-300 shadow-sm">
                    <div className="w-3 h-3 bg-success rounded-full animate-pulse ml-2"></div>
                    <span className="text-[10px] font-black uppercase pr-3 tracking-widest">Server Live</span>
                </div>
            </div>

            {/* --- Advanced Stats Grid using the imported StatCard --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {statData.map((stat, idx) => (
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

            {/* --- Main Visualizations --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Monthly Revenue - Bar Chart */}
                <div className="lg:col-span-2 bg-base-100 rounded-[3rem] p-8 border border-base-200 shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
                                <FaMoneyBillWave className="text-[#fa0bd2]" /> Revenue Stream
                            </h3>
                            <p className="text-[10px] uppercase font-bold opacity-40 tracking-widest">Monthly Growth Tracking</p>
                        </div>
                    </div>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={paymentChart}>
                                <defs>
                                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#fa0bd2" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#fa0bd2" stopOpacity={0.4} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="10 10" vertical={false} stroke="currentColor" opacity={0.05} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 10, fontWeight: 'bold' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 10 }} />
                                <Tooltip contentStyle={sharedTooltipStyle} cursor={{ fill: 'rgba(250, 11, 210, 0.05)' }} />
                                <Bar dataKey="total" fill="url(#barGrad)" radius={[10, 10, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Status Distribution - Pie Chart */}
                <div className="bg-base-100 rounded-[3rem] p-8 border border-base-200 shadow-sm">
                    <h3 className="text-xl font-black tracking-tight mb-2">Issue Pulse</h3>
                    <p className="text-[10px] uppercase font-bold opacity-40 tracking-widest mb-6">Status Breakdown</p>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={issueStatusPie}
                                    innerRadius={70} outerRadius={90}
                                    paddingAngle={8} dataKey="value"
                                    stroke="none"
                                >
                                    {issueStatusPie.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={sharedTooltipStyle} />
                                <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* --- Activity & Pulse Section --- */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* System Activity Feed */}
                <div className="lg:col-span-3 bg-base-100 rounded-[3rem] p-8 border border-base-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-primary/10 text-primary rounded-2xl"><HiOutlineLightningBolt size={24} /></div>
                        <div>
                            <h3 className="text-xl font-black tracking-tight">Recent Activity</h3>
                            <p className="text-[10px] uppercase font-bold opacity-40 tracking-widest">Latest Updates from citizens</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                            {latestIssues.map(issue => (
                                <div key={issue._id} className="flex items-center gap-4 p-4 rounded-3xl bg-base-200/50 border border-transparent hover:border-base-300 transition-all group">
                                    <div className="w-2 h-10 bg-[#fa0bd2] rounded-full group-hover:h-12 transition-all"></div>
                                    <div className="flex-1 overflow-hidden">
                                        <h4 className="font-bold text-sm truncate uppercase tracking-tighter">{issue.title}</h4>
                                        <div className="flex gap-3 items-center mt-1">
                                            <span className="text-[9px] font-black text-[#fa0bd2] bg-[#fa0bd2]/10 px-2 py-0.5 rounded-md uppercase">{issue.status}</span>
                                            <span className="text-[9px] font-bold opacity-40 tracking-widest">{new Date(issue.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-base-200/30 rounded-[2rem] p-6 border border-base-300/50">
                            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] opacity-30 mb-6">Inflow Monitor</h4>
                            <div className="space-y-6">
                                {latestPayments.map(p => (
                                    <div key={p._id} className="flex justify-between items-center border-b border-base-300 pb-3 last:border-0 last:pb-0">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center text-success"><FaMoneyBillWave size={14} /></div>
                                            <span className="text-xs font-black tracking-tight uppercase">{p.boostedBy}</span>
                                        </div>
                                        <span className="text-sm font-black text-success">+${p.amount}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Demographics & Roles */}
                <div className="bg-[#171717] text-white rounded-[3rem] p-8 border border-white/5 shadow-2xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-xl font-black tracking-tight mb-6 flex items-center gap-2">
                            <FaUsers className="text-[#fa0bd2]" /> New Members
                        </h3>
                        <div className="flex flex-wrap gap-3 mb-10">
                            {latestUsers.map((u) => (
                                <div key={u._id} className="avatar" title={u.email}>
                                    <div className="w-10 rounded-2xl ring-2 ring-white/10 hover:ring-[#fa0bd2] transition-all">
                                        <img src={`https://ui-avatars.com/api/?name=${u.displayName}&background=random`} alt="user" />
                                    </div>
                                </div>
                            ))}
                            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold">+12</div>
                        </div>

                        <div className="h-48 w-full mt-auto">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={userRolePie}
                                        innerRadius={45} outerRadius={60}
                                        dataKey="value" stroke="none"
                                    >
                                        {userRolePie.map((entry, index) => (
                                            <Cell key={`cell-role-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={sharedTooltipStyle} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#fa0bd2]/10 blur-[80px] rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardHome;