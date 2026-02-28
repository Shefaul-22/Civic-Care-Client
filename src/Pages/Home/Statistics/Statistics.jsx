import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../hooks/UseAxios";
import Loading from "../../../components/Loading/Loading";
import {
    IoBarChartOutline,
    IoCheckmarkDoneCircleOutline,
    IoCloseCircleOutline,
    IoTimeOutline,
    IoSettingsOutline
} from "react-icons/io5";

const Statistics = () => {
    const axios = UseAxios();

    const { data, isLoading } = useQuery({
        queryKey: ["statistics"],
        queryFn: async () => {
            const res = await axios.get("/issues/statistics");
            return res.data;
        }
    });

    if (isLoading || !data) return <Loading />;

    const stats = [
        {
            label: "Total Issues",
            value: data.totalNum,
            icon: <IoBarChartOutline className="text-3xl" />,
            color: "border-blue-500 text-blue-500 bg-blue-500/5"
        },
        {
            label: "Resolved",
            value: data.resolved|| data.closed,
            icon: <IoCheckmarkDoneCircleOutline className="text-3xl" />,
            color: "border-green-500 text-green-500 bg-green-500/5"
        },
        {
            label: "In Progress",
            value: data.inProgress,
            icon: <IoSettingsOutline className="text-3xl animate-spin-slow" />,
            color: "border-amber-500 text-amber-500 bg-amber-500/5"
        },
        {
            label: "Pending",
            value: data.pending,
            icon: <IoTimeOutline className="text-3xl" />,
            color: "border-[#fa0bd2] text-[#fa0bd2] bg-[#fa0bd2]/5"
        },
        {
            label: "Closed",
            value: data.closed,
            icon: <IoCloseCircleOutline className="text-3xl" />,
            color: "border-gray-500 text-gray-500 bg-gray-500/5"
        }
    ];

    return (
        <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-6xl font-black text-base-content tracking-tighter">
                        Platform <span className="text-[#fa0bd2]">Impact</span>
                    </h2>
                    <p className="text-base-content/50 font-medium mt-3">Real-time data on how we are making the city better together.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`relative group overflow-hidden border-b-4 ${stat.color} bg-base-100 p-8 rounded-[2rem] shadow-xl shadow-base-300/10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}
                        >
                            {/* Decorative Background Icon */}
                            <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity scale-[2.5] rotate-12">
                                {stat.icon}
                            </div>

                            <div className="flex flex-col items-center justify-center space-y-4">
                                <div className={`p-4 rounded-2xl bg-white dark:bg-base-200 shadow-inner`}>
                                    {stat.icon}
                                </div>

                                <div className="text-center">
                                    <h3 className="text-4xl font-black tracking-tight text-base-content">
                                        {stat.value || 0}
                                    </h3>
                                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-base-content/40 mt-1">
                                        {stat.label}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tailwind Custom Animation for the gear icon */}
            <style jsx>{`
                .animate-spin-slow {
                    animation: spin 6s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </section>
    );
};

export default Statistics;