import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrash, FaPhoneAlt, FaEnvelope, FaUserTag } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const ManageStaffs = () => {
    const axiosSecure = useAxiosSecure();
    const [editStaff, setEditStaff] = useState(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { data: staffs = [], isLoading, refetch } = useQuery({
        queryKey: ['staffs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/staffs');
            return res.data;
        }
    });

    useEffect(() => {
        if (editStaff) {
            reset({ name: editStaff.displayName, phone: editStaff.phone || "" });
        }
    }, [editStaff, reset]);

    const handleUpdateSubmit = async (data) => {
        if (data.name === editStaff.displayName && data.phone === (editStaff.phone || "")) {
            setEditStaff(null);
            return;
        }

        try {
            const res = await axiosSecure.patch(`/admin/staffs/${editStaff._id}`, {
                name: data.name,
                phone: data.phone
            });

            if (res.data.success || res.data.modifiedCount > 0) {
                Swal.fire({ title: "Updated", icon: "success", timer: 1500, showConfirmButton: false });
                refetch();
                setEditStaff(null);
                reset();
            }
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

    const handleDelete = (staff) => {
        Swal.fire({
            title: 'TERMINATE ACCESS?',
            text: `Permanently remove ${staff.displayName} from system?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#fa0bd2',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'YES, REMOVE',
            background: "hsl(var(--b1))",
            color: "currentColor"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/admin/staffs/${staff._id}`);
                Swal.fire('REMOVED', 'Staff record purged.', 'success');
                refetch();
            }
        });
    };

    if (isLoading) return <Loading />;

    return (
        <div className="w-full">
            {/* --- Desktop Table View (Visible on md and up, hidden on mobile) --- */}
            <div className="hidden md:block overflow-x-auto">
                <table className="table w-full border-collapse">
                    <thead>
                        <tr className="bg-base-200/50 text-[10px] uppercase tracking-widest font-black">
                            <th className="py-6 px-8">Staff Member</th>
                            <th>Communication</th>
                            <th className="text-right px-8">Operations</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-bold">
                        {staffs.map(staff => (
                            <tr key={staff._id} className="border-b border-base-200 hover:bg-base-200/30 transition-all group">
                                <td className="py-6 px-8">
                                    <div className="flex items-center gap-4">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12 ring-2 ring-[#fa0bd2]/20 group-hover:ring-[#fa0bd2] transition-all">
                                                <img src={staff.photoURL} alt="Avatar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="uppercase tracking-tighter font-black group-hover:text-[#fa0bd2] transition-colors">{staff.displayName}</div>
                                            <div className="text-[10px] opacity-40 uppercase flex items-center gap-1">
                                                <FaUserTag className="text-[#fa0bd2]" /> {staff.role || 'Personnel'}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex flex-col gap-1">
                                        <span className="flex items-center gap-2 text-xs opacity-70 italic"><FaEnvelope size={10} className="text-[#fa0bd2]" /> {staff.email}</span>
                                        <span className="flex items-center gap-2 text-xs"><FaPhoneAlt size={10} className="text-[#fa0bd2]" /> {staff.phone || "---"}</span>
                                    </div>
                                </td>
                                <td className="text-right px-8 space-x-2">
                                    <button onClick={() => setEditStaff(staff)} className="btn btn-sm rounded-xl border-base-300 hover:bg-[#fa0bd2] hover:text-white transition-all"><FaEdit />Edit</button>
                                    <button onClick={() => handleDelete(staff)} className="btn btn-sm rounded-xl border-base-300 hover:bg-error hover:text-white transition-all"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- Mobile Card View (Visible only on mobile, hidden on md and up) --- */}
            <div className="md:hidden grid grid-cols-1 gap-4 p-4">
                {staffs.map(staff => (
                    <div key={staff._id} className="bg-base-100 rounded-[2rem] p-6 border border-base-200 shadow-sm space-y-4">
                        <div className="flex items-center gap-4">
                            <img className="w-16 h-16 rounded-2xl object-cover border-2 border-[#fa0bd2]" src={staff.photoURL} alt="" />
                            <div>
                                <h3 className="font-black uppercase tracking-tighter italic">{staff.displayName}</h3>
                                <p className="text-[10px] opacity-50 uppercase font-black">{staff.role}</p>
                            </div>
                        </div>
                        <div className="py-3 border-y border-dashed border-base-200 text-xs space-y-1">
                            <p className="opacity-60">{staff.email}</p>
                            <p className="font-bold">{staff.phone || "No Phone"}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setEditStaff(staff)} className="btn btn-sm flex-1 bg-base-200 rounded-xl border-none font-black text-[10px] uppercase">Update</button>
                            <button onClick={() => handleDelete(staff)} className="btn btn-sm flex-1 bg-error/10 text-error rounded-xl border-none font-black text-[10px] uppercase">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Modal (Remains same) */}
            {/* Edit Modal */}
            {editStaff && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
                    <div className="bg-base-100 w-full max-w-sm rounded-[2.5rem] border border-base-300 shadow-2xl p-8 animate-in zoom-in duration-200">
                        <h3 className="text-xl font-black uppercase italic tracking-tighter mb-6 text-center">
                            Modify <span className="text-[#fa0bd2]">Record</span>
                        </h3>
                        <form onSubmit={handleSubmit(handleUpdateSubmit)} className="space-y-4">

                            {/* Name Field */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Display Name</label>
                                <input
                                    {...register("name", { required: "Name is required" })}
                                    className="input input-bordered w-full rounded-2xl bg-base-200 border-none font-bold"
                                />
                                {errors.name && <p className="text-error text-[10px] font-bold uppercase mt-1 ml-2">{errors.name.message}</p>}
                            </div>

                            {/* Phone Field */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Phone Line</label>
                                <input
                                    {...register("phone", {
                                        required: "Phone is required",
                                        minLength: { value: 11, message: "Must be 11 digits" },
                                        maxLength: { value: 11, message: "Must be 11 digits" }
                                    })}
                                    className="input input-bordered w-full rounded-2xl bg-base-200 border-none font-bold"
                                />
                                {errors.phone && <p className="text-error text-[10px] font-bold uppercase mt-1 ml-2">{errors.phone.message}</p>}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => { setEditStaff(null); reset(); }}
                                    className="btn flex-1 rounded-2xl bg-base-200 border-none font-black uppercase text-[10px]"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn flex-[2] rounded-2xl bg-[#fa0bd2] hover:bg-[#d909b5] text-white border-none font-black uppercase text-[10px] shadow-lg shadow-[#fa0bd2]/20"
                                >
                                    Update Record
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageStaffs;