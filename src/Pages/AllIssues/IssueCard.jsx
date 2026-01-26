import React from 'react';
import { AiFillLike } from 'react-icons/ai';
import { IoLocationSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router';

import Swal from "sweetalert2";

const IssueCard = ({ issue, user, refetch,  axiosSecure }) => {

    // console.log(user,issue);

    const navigate = useNavigate();

    const handleUpvote = async () => {

        if (!user) {
            navigate("/login");
            return;
        }

        if (issue.senderEmail === user.email) {
            Swal.fire(
                "Not allowed", 
                "You cannot upvote your own issue", 
                "warning"
            );

            return;
        }

        try {
            await axiosSecure.patch(`/issues/${issue._id}/upvote`);
            refetch();
        } catch (err) {
            Swal.fire(
                "Error",
                err.response?.data?.message || "Already upvoted",
                "error"
            );
        }
    };

    return (
        <div className="card bg-base-200 shadow-md border">

            <figure className="h-40">
                <img
                    src={issue.photoURL}
                    alt={issue.title}
                    className="w-full h-full object-cover"
                />
            </figure>

            <div className="card-body p-4">

                <h2 className="card-title">{issue.title}</h2>
                <p className="text-sm text-gray-500">{issue.category}</p>

                {/* Status + Priority */}
                <div className="flex gap-2 my-2">
                    <span className={`badge
                        ${issue.status === "pending" && "badge-warning"}
                        ${issue.status === "resolved" && "badge-success"}
                        ${issue.status === "in-progress" && "badge-info"}
                    `}>
                        {issue.status}
                    </span>

                    <span
                        className={
                            issue.priority === "high"
                                ? "badge badge-error"
                                : "badge badge-outline"
                        }
                    >
                        {issue.priority}
                    </span>
                </div>

                {/* Location */}
                <p className="text-sm flex items-center gap-2">
                    <IoLocationSharp size={24}/> {issue.senderDistrict}, {issue.senderRegion}
                </p>

                {/* Actions */}
                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={handleUpvote}
                        className="btn flex items-center gap-3 text-blue-600 bg-gray-200"
                    >
                        <AiFillLike size={24}/> <span className='text-xl font-semibold'>{issue.upvotes || 0}</span>
                    </button>

                    <button
                        className="btn btn-sm btn-primary"
                        onClick={() => navigate(`/issues/${issue._id}`)}
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IssueCard;
