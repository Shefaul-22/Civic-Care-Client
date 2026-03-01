import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import Swal from "sweetalert2";
import { FaUserShield, FaUserCheck, FaCrown, FaUserSlash } from "react-icons/fa";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ["admin-users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/users");
            return res.data;
        },
    });

    const handleBlock = async (user) => {
        const confirm = await Swal.fire({
            title: 'BLOCK USER?',
            text: `Restrict access for ${user.displayName || user.email}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "YES, BLOCK",
            confirmButtonColor: "#fa0bd2",
            cancelButtonColor: "#3085d6",
            background: "hsl(var(--b1))",
            color: "currentColor"
        });

        if (confirm.isConfirmed) {
            await axiosSecure.patch(`/admin/users/block/${user._id}`);
            queryClient.invalidateQueries({ queryKey: ["admin-users"] });
            Swal.fire({ title: "Blocked!", icon: "success", timer: 1500, showConfirmButton: false });
        }
    };

    const handleUnblock = async (user) => {
        const confirm = await Swal.fire({
            title: 'UNBLOCK USER?',
            text: `Restore access for ${user.displayName || user.email}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "YES, UNBLOCK",
            confirmButtonColor: "#fa0bd2",
            background: "hsl(var(--b1))",
            color: "currentColor"
        });

        if (confirm.isConfirmed) {
            await axiosSecure.patch(`/admin/users/unblock/${user._id}`);
            queryClient.invalidateQueries({ queryKey: ["admin-users"] });
            Swal.fire({ title: "Unblocked!", icon: "success", timer: 1500, showConfirmButton: false });
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="p-4 md:p-8 space-y-8 bg-transparent min-h-screen">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter italic uppercase">
                        User <span className='text-[#fa0bd2]'>Management</span>
                    </h2>
                    <p className="text-sm font-bold opacity-50 uppercase tracking-[0.3em] mt-1">
                        System Access & Authority Control
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="bg-base-100 rounded-[2.5rem] border border-base-200 shadow-sm overflow-hidden">

                {/* Empty State */}
                {users.length === 0 && (
                    <div className="p-20 text-center">
                        <p className="font-black uppercase italic opacity-20 text-2xl">No Data Found</p>
                    </div>
                )}

                {/* Desktop Table */}
                {users.length > 0 && (
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="table w-full border-collapse">
                            <thead>
                                <tr className="bg-base-200/50 text-[10px] uppercase tracking-widest font-black">
                                    <th className="py-6 px-8">User Identity</th>
                                    <th>Access Status</th>
                                    <th>Tier</th>
                                    <th className="text-right px-8">Operations</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-bold">
                                {users.map((user) => (
                                    <tr key={user._id} className="border-b border-base-200 hover:bg-base-200/30 transition-all group">
                                        <td className="py-6 px-8">
                                            <div className="flex items-center gap-4">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12 ring-2 ring-[#fa0bd2]/20 group-hover:ring-[#fa0bd2] transition-all">
                                                        <img src={user.photoURL} alt="Avatar" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="uppercase tracking-tighter font-black group-hover:text-[#fa0bd2] transition-colors">
                                                        {user.displayName || "Anonymous"}
                                                    </div>
                                                    <div className="text-[10px] opacity-40 uppercase truncate max-w-[200px]">
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <StatusBadge status={user.userStatus} />
                                        </td>
                                        <td>
                                            <SubscriptionBadge isPremium={user.isPremium} />
                                        </td>
                                        <td className="text-right px-8">
                                            <ActionButton
                                                user={user}
                                                handleBlock={handleBlock}
                                                handleUnblock={handleUnblock}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Mobile View */}
                <div className="lg:hidden grid grid-cols-1 gap-4 p-4">
                    {users.map((user) => (
                        <div key={user._id} className="bg-base-100 rounded-[2rem] p-6 border border-base-200 shadow-sm space-y-4">
                            <div className="flex items-center gap-4">
                                <img className="w-16 h-16 rounded-2xl object-cover border-2 border-[#fa0bd2]" src={user.photoURL} alt="" />
                                <div>
                                    <h3 className="font-black uppercase tracking-tighter italic">{user.displayName || "Anonymous"}</h3>
                                    <p className="text-[10px] opacity-50  font-black truncate max-w-[150px]">{user.email}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-3 border-y border-dashed border-base-200">
                                <SubscriptionBadge isPremium={user.isPremium} />
                                <StatusBadge status={user.userStatus} />
                            </div>
                            <ActionButton
                                user={user}
                                handleBlock={handleBlock}
                                handleUnblock={handleUnblock}
                                fullWidth
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

/* ===== Styled Reusable Components ===== */

const SubscriptionBadge = ({ isPremium }) => {
    return isPremium ? (
        <div className="flex items-center gap-1 text-[#fa0bd2] text-[10px] font-black uppercase tracking-widest">
            <FaCrown /> Premium
        </div>
    ) : (
        <div className="text-[10px] font-black uppercase tracking-widest opacity-50">
            Standard
        </div>
    );
};

const StatusBadge = ({ status }) => {
    const isBlocked = status === "blocked";
    return (
        <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${isBlocked ? 'text-error' : 'text-success'}`}>
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isBlocked ? 'bg-error' : 'bg-success'}`}></span>
            {status}
        </div>
    );
};

const ActionButton = ({ user, handleBlock, handleUnblock, fullWidth }) => {
    const isBlocked = user.userStatus === "blocked";

    return (
        <button
            onClick={() => isBlocked ? handleUnblock(user) : handleBlock(user)}
            className={`btn btn-sm rounded-xl border-none font-black text-[10px] uppercase italic tracking-widest transition-all
                ${isBlocked
                    ? "bg-success/10 text-success hover:bg-success hover:text-white"
                    : "bg-error/10 text-error hover:bg-error hover:text-white"} 
                ${fullWidth ? "w-full h-12" : "px-4"}`}
        >
            {isBlocked ? <><FaUserCheck className="mr-1" /> Unblock Access</> : <><FaUserSlash className="mr-1" /> Block Access</>}
        </button>
    );
};

export default ManageUsers;