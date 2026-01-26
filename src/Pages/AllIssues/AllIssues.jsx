import React,{ useState } from "react";
import { useQuery } from "@tanstack/react-query";

import UseAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import Loading from "../../components/Loading/Loading";
import AllIssuesFilters from "./AllIssuesFilters";
import IssueCard from "./IssueCard";

const AllIssues = () => {
    
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const [filters, setFilters] = useState({
        search: "",
        status: "",
        category: "",
        priority: ""
    });

    const { data: issues = [], isLoading, refetch } = useQuery({

        queryKey: ["allIssues", filters],
        queryFn: async () => {
            const res = await axiosSecure.get("/issues", {
                params: filters
            });
            return res.data;
        }
    });

    // console.log(issues);

    if (isLoading) return <Loading />;

    return (
        <div>
            <h2 className="text-3xl mb-4">
                All Issues: {issues.length}
            </h2>

            {/* Filters */}
            <AllIssuesFilters filters={filters} setFilters={setFilters} />

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {issues.map(issue => (
                    <IssueCard
                        key={issue._id}
                        issue={issue}
                        user={user}
                        refetch={refetch}
                        
                        axiosSecure={axiosSecure}
                    />
                ))}
            </div>
        </div>
    );
};

export default AllIssues;
