import React from "react";
import { useQuery } from "@tanstack/react-query";
import IssueCard from "./IssueCard";
import UseAxios from "../../../hooks/UseAxios";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { Link } from "react-router";

const LatestResolvedIssues = () => {
    const axios = UseAxios();

    const { data: issues = [], isLoading } = useQuery({
        queryKey: ["latest-resolved-issues"],
        queryFn: async () => {
            const res = await axios.get("/issues/resolved/latest");
            return res.data;
        }
    });

    // Loading State with Skeleton (Optional but Recommended)
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto px-4 py-20">
                {[1, 2, 3].map(n => (
                    <div key={n} className="h-80 w-full bg-base-300 animate-pulse rounded-3xl"></div>
                ))}
            </div>
        );
    }

    return (
        <section className="py-10 md:py-16 bg-base-100">
            <div className="container mx-auto px-4">

                {/* Section Header */}
                <div className="flex flex-col items-center text-center mb-12 md:mb-20">
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#fa0bd2]/10 text-[#fa0bd2] rounded-full text-xs md:text-sm font-black mb-6 uppercase tracking-widest shadow-sm">
                        <HiOutlineBadgeCheck size={18} className="animate-pulse" />
                        <span>Resolved Communities</span>
                    </div>

                    <h2 className="text-4xl md:text-7xl font-black text-base-content tracking-tighter leading-none">
                        Latest <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#fa0bd2] via-[#fa0bd2] to-[#6366F1]">Resolved</span>
                    </h2>

                    <p className="mt-6 text-base-content/60 max-w-xl font-medium text-lg leading-relaxed">
                        Actual results from our citizens and authorities working together to build a safer city.
                    </p>
                </div>

                {/* Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {issues.length > 0 ? (
                        issues.slice(0, 6).map(issue => (
                            <div key={issue._id} className="group hover:-translate-y-2 transition-transform duration-500">
                                <IssueCard issue={issue} />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center bg-base-200/50 rounded-[3rem] border-2 border-dashed border-base-300">
                            <p className="text-base-content/40 font-bold italic">No issues resolved recently. Be the first to report!</p>
                        </div>
                    )}
                </div>

                {/* View All Button with Glow Effect */}
                <div className="flex justify-center mt-16">
                    <Link to="/allIssues"
                        className="group relative px-8 py-3 font-black text-xs uppercase tracking-[0.2em] text-base-content/60 hover:text-[#fa0bd2] transition-all">
                        <span className="relative btn z-10">View All Resolved Cases</span>
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#fa0bd2] group-hover:w-full transition-all duration-300"></div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LatestResolvedIssues;