import React, { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
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
        total = 0
    } = data;

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1 
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 min-h-screen">

            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8"
            >
                <div>
                    <div className="flex items-center gap-2 text-[#fa0bd2] font-bold text-sm uppercase tracking-widest mb-2">
                        <HiOutlineDocumentSearch size={20} />
                        <span>Public Directory</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-base-content tracking-tight uppercase italic">
                        All Issues <span className="text-[#fa0bd2]">Reported</span>
                    </h2>
                    <p className="text-base-content/60 mt-2 font-medium">
                        Total <span className="text-[#fa0bd2] font-black">{total}</span> complaints submitted by citizens
                    </p>
                </div>

                {/* Optional Status Indicator */}
                <AnimatePresence>
                    {isFetching && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex items-center gap-2 text-xs font-bold text-[#fa0bd2] bg-[#fa0bd2]/10 px-4 py-2 rounded-full border border-[#fa0bd2]/20"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fa0bd2] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#fa0bd2]"></span>
                            </span>
                            Syncing Data...
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Filters Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-base-200/40 p-5 rounded-[2.5rem] border border-base-content/5 backdrop-blur-md mb-10 shadow-inner"
            >
                <AllIssuesFilters
                    filters={filters}
                    setFilters={handleSetFilters}
                />
            </motion.div>

            {/* Content Grid */}
            <div className="relative min-h-[400px]">
                {issues.length > 0 ? (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        key={page + filters.search} 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
                    >
                        {issues.map(issue => (
                            <motion.div
                                key={issue._id}
                                variants={itemVariants}
                                className="w-full"
                            >
                                <IssueCard
                                    issue={issue}
                                    user={user}
                                    refetch={refetch}
                                    axiosSecure={axiosSecure}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-32 text-center"
                    >
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-[#fa0bd2]/10 blur-3xl rounded-full"></div>
                            <HiOutlineDocumentSearch className="text-8xl text-base-content/10 relative" />
                        </div>
                        <h3 className="text-2xl font-black uppercase tracking-tighter">No issues found</h3>
                        <p className="text-base-content/40 font-medium max-w-xs">We couldn't find any reports matching your current filter criteria.</p>
                    </motion.div>
                )}
            </div>

            {/* Pagination Section */}
            {totalPages > 1 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center items-center gap-3 mt-16"
                >
                    <button
                        className="btn btn-circle btn-ghost bg-base-200 hover:bg-[#fa0bd2] hover:text-white transition-all shadow-md"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        ❮
                    </button>

                    <div className="flex items-center bg-base-200/50 p-1.5 rounded-full border border-base-content/5">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => setPage(index + 1)}
                                className={`w-10 h-10 flex items-center justify-center text-sm font-black rounded-full transition-all ${page === index + 1
                                        ? 'bg-[#fa0bd2] text-white shadow-lg scale-110'
                                        : 'hover:bg-base-300 text-base-content/60'
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        className="btn btn-circle btn-ghost bg-base-200 hover:bg-[#fa0bd2] hover:text-white transition-all shadow-md"
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        ❯
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default AllIssues;