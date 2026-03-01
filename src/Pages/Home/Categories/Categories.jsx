import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../hooks/UseAxios";
import Loading from "../../../components/Loading/Loading";
import {
    IoWarningOutline,
    IoWaterOutline,
    IoFlashOutline,
    IoTrashOutline,
    IoConstructOutline,
    IoEllipsisHorizontalCircleOutline
} from "react-icons/io5";
import { Link } from "react-router";

const Categories = () => {
    const axios = UseAxios();

    
    const categoryStyles = {
        "Broken streetlights": { icon: <IoFlashOutline />, color: "text-yellow-500 bg-yellow-500/10" },
        "Potholes": { icon: <IoConstructOutline />, color: "text-orange-600 bg-orange-600/10" },
        "Water leakage": { icon: <IoWaterOutline />, color: "text-blue-500 bg-blue-500/10" },
        "Garbage overflow": { icon: <IoTrashOutline />, color: "text-green-600 bg-green-600/10" },
        "Default": { icon: <IoWarningOutline />, color: "text-[#fa0bd2] bg-[#fa0bd2]/10" }
    };

    const { data = [], isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await axios.get("/issues", {
                params: { limit: 1000 }
            });

            const issues = res.data.issues || [];
            const categoryMap = {};

            issues.forEach(issue => {
                if (!categoryMap[issue.category]) {
                    categoryMap[issue.category] = 0;
                }
                categoryMap[issue.category]++;
            });

            return Object.entries(categoryMap).map(
                ([name, count]) => ({ name, count })
            );
        }
    });

    if (isLoading) return <Loading />;

    return (
        <section className="py-8 md:py-14">
            <div className="container mx-auto px-4">

                {/* Section Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-base-content tracking-tighter italic">
                        Explore <span className="text-[#fa0bd2]">Categories</span>
                    </h2>
                    <div className="w-20 h-1.5 bg-[#fa0bd2] rounded-full mt-4"></div>
                    <p className="mt-6 text-base-content/50 max-w-md font-medium uppercase text-xs tracking-widest">
                        Browse issues by department to see where we need the most attention.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.map((category, index) => {
                        
                        const style = categoryStyles[category.name] || categoryStyles["Default"];

                        return (
                            <div
                                key={index}
                                className="group relative bg-base-100 p-8 rounded-[2.5rem] border border-base-300 hover:border-[#fa0bd2]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#fa0bd2]/5 overflow-hidden"
                            >
                                {/* Background Decorative Circle */}
                                <div className="absolute -right-10 -top-10 w-32 h-32 bg-base-200 rounded-full group-hover:bg-[#fa0bd2]/5 transition-colors duration-500"></div>

                                <div className="relative flex items-start gap-6">
                                    {/* Icon Box */}
                                    <div className={`p-5 rounded-2xl text-3xl shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${style.color}`}>
                                        {style.icon}
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-black text-base-content tracking-tight group-hover:text-[#fa0bd2] transition-colors">
                                            {category.name}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <span className="flex h-2 w-2 rounded-full bg-[#fa0bd2] animate-pulse"></span>
                                            <p className="text-sm font-bold text-base-content/40 uppercase tracking-tighter">
                                                {category.count} Reports Logged
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Arrow Link (Visual Only) */}
                                <div className="mt-8 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-500">
                                    <Link to="/allIssues" className="text-xs font-black uppercase text-[#fa0bd2] tracking-widest flex items-center gap-1 cursor-pointer">
                                        View All <IoEllipsisHorizontalCircleOutline className="text-lg" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Categories;