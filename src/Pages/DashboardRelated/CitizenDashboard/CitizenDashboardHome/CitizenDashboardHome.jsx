import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
    ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";
import { FaMoneyBillWave, FaClock, FaCheckCircle, FaSpinner } from "react-icons/fa";
import { MdReportProblem } from "react-icons/md";

import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import UseAuth from "../../../../hooks/UseAuth";
import Loading from "../../../../components/Loading/Loading";
import StatCard from "./StatCard";

const CitizenDashboardHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = UseAuth();

    const { data = {}, isLoading } = useQuery({
        queryKey: ["citizen-dashboard", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/citizen/dashboard/summary?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    if (isLoading) return <Loading />;

    const {
        totalIssues = 0,
        pendingIssues = 0,
        inProgressIssues = 0,
        resolvedIssues = 0,
        totalPayments = 0,
        chartData = [],
        statusPieData = []
    } = data;

    const hasPieData = statusPieData && statusPieData.length > 0;

    // StatCard এর জন্য ডাটা স্ট্রাকচার
    const citizenStats = [
        { 
            title: "Total Issues", 
            value: totalIssues, 
            icon: <MdReportProblem size={24} />, 
            trend: "10", 
            trendType: "up", 
            color: "primary" 
        },
        { 
            title: "Pending", 
            value: pendingIssues, 
            icon: <FaClock size={22} />, 
            trend: "5", 
            trendType: "down", 
            color: "warning" 
        },
        { 
            title: "In Progress", 
            value: inProgressIssues, 
            icon: <FaSpinner size={22} className="animate-spin-slow" />, 
            trend: "2", 
            trendType: "up", 
            color: "info" 
        },
        { 
            title: "Resolved", 
            value: resolvedIssues, 
            icon: <FaCheckCircle size={22} />, 
            trend: "15", 
            trendType: "up", 
            color: "success" 
        },
        { 
            title: "Total Payments", 
            value: `৳${totalPayments.toLocaleString('en-IN')}`, 
            icon: <FaMoneyBillWave size={22} />, 
            trend: "8", 
            trendType: "up", 
            color: "secondary" 
        }
    ];

    return (
        <div className="p-4 md:p-6 space-y-8 bg-transparent text-base-content min-h-screen">
            <h2 className="text-3xl font-black tracking-tight uppercase italic">
                Citizen <span className="text-[#fa0bd2]">Overview</span>
            </h2>

            {/* StatCards Section - Using Updated Props */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {citizenStats.map((stat, idx) => (
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

                {/* 1. Bar Chart: Monthly Payments */}
                <div className="bg-base-100 rounded-[2.5rem] shadow-sm border border-base-200 p-8">
                    <h3 className="text-xl font-black mb-6 flex items-center gap-2 tracking-tight">
                        <FaMoneyBillWave className="text-[#fa0bd2]" /> Monthly Contribution
                    </h3>

                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <defs>
                                    <linearGradient id="citizenBarGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#fa0bd2" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#fa0bd2" stopOpacity={0.4} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="10 10" vertical={false} stroke="currentColor" opacity={0.05} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 10, fontWeight: 'bold' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 10 }} />
                                <Tooltip
                                    contentStyle={{ 
                                        backgroundColor: 'rgba(23, 23, 23, 0.8)', 
                                        backdropFilter: 'blur(10px)',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(250, 11, 210, 0.2)',
                                        color: '#fff' 
                                    }}
                                    cursor={{ fill: 'rgba(250, 11, 210, 0.05)' }}
                                />
                                <Bar dataKey="total" fill="url(#citizenBarGrad)" radius={[8, 8, 0, 0]} barSize={35} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 2. Pie Chart: Issues Status */}
                <div className="bg-base-100 rounded-[2.5rem] shadow-sm border border-base-200 p-8">
                    <h3 className="text-xl font-black mb-6 flex items-center gap-2 tracking-tight">
                        <MdReportProblem className="text-[#fa0bd2]" /> Status Analysis
                    </h3>

                    <div className="h-72 w-full flex items-center justify-center">
                        {hasPieData ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={statusPieData}
                                        innerRadius={70}
                                        outerRadius={90}
                                        paddingAngle={8}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {statusPieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ 
                                            backgroundColor: 'rgba(23, 23, 23, 0.8)', 
                                            backdropFilter: 'blur(10px)',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(250, 11, 210, 0.2)',
                                            color: '#fff' 
                                        }}
                                    />
                                    <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex flex-col items-center opacity-40 italic">
                                <p>No status data available yet</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CitizenDashboardHome;