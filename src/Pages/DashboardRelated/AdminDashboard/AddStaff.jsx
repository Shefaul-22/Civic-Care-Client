import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import ManageStaffs from "./ManageStaffs";
import { useQueryClient } from "@tanstack/react-query";
import { FaPlus, FaTimes, FaUserPlus } from "react-icons/fa";

const AddStaff = () => {
    const [isOpen, setIsOpen] = useState(false);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // errors extracted from formState
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const handleAddStaff = async (data) => {
        try {
            Swal.fire({
                title: "Processing...",
                text: "Creating staff account and uploading image",
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading(),
            });

            const profileImg = data.photo[0];
            const formData = new FormData();
            formData.append("image", profileImg);

            const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`;
            const imgRes = await axios.post(image_API_URL, formData);
            const photoURL = imgRes.data.data.url;

            const staffInfo = {
                displayName: data.name,
                email: data.email,
                password: data.password,
                phone: data.phone,
                photoURL,
            };

            const res = await axiosSecure.post("/admin/staffs", staffInfo);

            if (res.data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Force Joined!",
                    text: "New staff member added to the system.",
                    showConfirmButton: false,
                    timer: 2000
                });
                reset();
                setIsOpen(false);
                queryClient.invalidateQueries(['staffs']);
            }
        } catch (error) {
            Swal.fire("Deployment Failed", error.message, "error");
        }
    };

    return (
        <div className="p-4 md:p-8 space-y-8 bg-transparent min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter italic uppercase">
                        Personnel <span className='text-[#fa0bd2]'>Deployment</span>
                    </h2>
                    <p className="text-sm font-bold opacity-50 uppercase tracking-[0.3em] mt-1">
                        Infrastructure & Team Management
                    </p>
                </div>
                <button
                    onClick={() => setIsOpen(true)}
                    className="btn bg-[#fa0bd2] hover:bg-[#d909b5] text-white border-none rounded-2xl px-8 font-black uppercase italic tracking-widest shadow-lg shadow-[#fa0bd2]/20"
                >
                    <FaPlus className="mr-2" /> Add New Staff
                </button>
            </div>

            {/* Content Section */}
            <div className="bg-base-100 rounded-[2.5rem] border border-base-200 shadow-sm overflow-hidden">
                <ManageStaffs />
            </div>

            {/* Styled Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-base-100 w-full max-w-xl rounded-[2.5rem] border border-base-300 shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh]">
                        <div className="bg-[#fa0bd2] p-8 text-white flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-md">
                                    <FaUserPlus size={24} />
                                </div>
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter">Registration</h3>
                            </div>
                            <button onClick={() => { reset(); setIsOpen(false); }} className="hover:rotate-90 transition-transform">
                                <FaTimes size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(handleAddStaff)} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name Field */}
                            <div className="space-y-1 md:col-span-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Full Identity</label>
                                <input {...register("name", { required: "Name is required" })} placeholder="Full Name" className="input input-bordered w-full rounded-2xl bg-base-200 border-none focus:ring-2 ring-[#fa0bd2] font-bold" />
                                {errors.name && <p className="text-error text-[10px] font-bold uppercase mt-1 ml-2">{errors.name.message}</p>}
                            </div>

                            {/* Email Field */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Secure Email</label>
                                <input {...register("email", { required: "Email is required" })} type="email" placeholder="email@system.com" className="input input-bordered w-full rounded-2xl bg-base-200 border-none focus:ring-2 ring-[#fa0bd2] font-bold" />
                                {errors.email && <p className="text-error text-[10px] font-bold uppercase mt-1 ml-2">{errors.email.message}</p>}
                            </div>

                            {/* Password Field */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Access Key</label>
                                <input {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Min 6 characters required" }
                                })} type="password" placeholder="******" className="input input-bordered w-full rounded-2xl bg-base-200 border-none focus:ring-2 ring-[#fa0bd2] font-bold" />
                                {errors.password && <p className="text-error text-[10px] font-bold uppercase mt-1 ml-2">{errors.password.message}</p>}
                            </div>

                            {/* Phone Field */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Contact Line</label>
                                <input type="number" {...register("phone", { required: "Phone number is required" })} placeholder="01XXX XXXXXX" className="input input-bordered w-full rounded-2xl bg-base-200 border-none focus:ring-2 ring-[#fa0bd2] font-bold" />
                                {errors.phone && <p className="text-error text-[10px] font-bold uppercase mt-1 ml-2">{errors.phone.message}</p>}
                            </div>

                            {/* Photo Field */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Avatar Profile</label>
                                <input {...register("photo", { required: "Photo is required" })} type="file" className="file-input file-input-bordered w-full rounded-2xl bg-base-200 border-none font-bold" />
                                {errors.photo && <p className="text-error text-[10px] font-bold uppercase mt-1 ml-2">{errors.photo.message}</p>}
                            </div>

                            <div className="md:col-span-2 pt-4">
                                <button type="submit" className="btn w-full rounded-2xl bg-[#fa0bd2] hover:bg-[#d909b5] text-white border-none font-black uppercase italic tracking-[0.2em] h-14">
                                    Initialize Staff Account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddStaff;