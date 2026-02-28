import React, { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading/Loading";
import AllIssuesFilters from "./AllIssuesFilters";
import IssueCard from "./IssueCard";
import UseAxios from "../../hooks/UseAxios";
import { HiOutlineDocumentSearch } from "react-icons/hi";

const AllIssues = () => {
    const { user, loading } = UseAuth();
    const axiosSecure = useAxiosSecure();
    const axios = UseAxios();

    const [filters, setFilters] = useState({
        search: "",
        status: "",
        category: "",
        priority: ""
    });

    const [page, setPage] = useState(1);

    const { data = {}, refetch, isFetching } = useQuery({
        queryKey: [
            "allIssues",
            filters.search,
            filters.status,
            filters.category,
            filters.priority,
            page
        ],
        queryFn: async () => {
            const res = await axios.get("/issues", {
                params: {
                    ...filters,
                    page,
                }
            });
            return res.data;
        },
        keepPreviousData: true
    });

    const handleSetFilters = useCallback((update) => {
        setFilters(prev => {
            const newFilters = typeof update === "function" ? update(prev) : update;
            return newFilters;
        });
        setPage(1);
    }, []);

    const {
        issues = [],
        totalPages = 1,
        currentPage = 1,
        total = 0
    } = data;

    if (loading) return <Loading />;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 min-h-screen">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2 text-[#fa0bd2] font-bold text-sm uppercase tracking-widest mb-2">
                        <HiOutlineDocumentSearch size={20} />
                        <span>Public Directory</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-base-content tracking-tight">
                        All Issues <span className="text-[#fa0bd2]">Reported by Citizen</span>
                    </h2>
                    <p className="text-base-content/60 mt-2 font-medium">
                        Total <span className="text-primary font-bold">{total}</span> complaints submitted by citizens
                    </p>
                </div>

                {/* Optional Status Indicator */}
                {isFetching && (
                    <div className="flex items-center gap-2 text-xs font-bold text-primary animate-pulse bg-primary/10 px-4 py-2 rounded-full">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Updating List...
                    </div>
                )}
            </div>

            {/* Filters Section */}
            <div className="bg-base-200/50 p-4 rounded-[32px] border border-base-300 backdrop-blur-sm mb-10">
                <AllIssuesFilters
                    filters={filters}
                    setFilters={handleSetFilters}
                />
            </div>

            {/* Content Grid */}
            <div className="relative min-h-[400px]">
                {/* Loading Overlay for Fetching */}
                {isFetching && (
                    <div className="absolute inset-0 z-10 bg-base-100/40 backdrop-blur-[1px] flex justify-center pt-20">
                        <div className="loading loading-dots loading-lg text-[#fa0bd2]"></div>
                    </div>
                )}

                {issues.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                        {issues.map(issue => (
                            <div key={issue._id} className="w-full max-w-[400px] md:max-w-none">
                                <IssueCard
                                    issue={issue}
                                    user={user}
                                    refetch={refetch}
                                    axiosSecure={axiosSecure}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-base-content/70">No issues found</h3>
                        <p className="text-base-content/40">Try adjusting your filters or search terms</p>
                    </div>
                )}
            </div>

            {/* Pagination Section */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-16">
                    <button
                        className="btn btn-circle btn-outline border-base-300 hover:bg-[#fa0bd2] hover:border-[#fa0bd2]"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        ❮
                    </button>

                    <div className="join bg-base-200 p-1 rounded-full border border-base-300">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => setPage(index + 1)}
                                className={`join-item btn btn-sm border-none rounded-full px-5 ${page === index + 1
                                        ? 'bg-[#fa0bd2] text-white shadow-lg'
                                        : 'bg-transparent text-base-content hover:bg-base-300'
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        className="btn btn-circle btn-outline border-base-300 hover:bg-[#fa0bd2] hover:border-[#fa0bd2]"
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        ❯
                    </button>
                </div>
            )}
        </div>
    );
};

export default AllIssues;