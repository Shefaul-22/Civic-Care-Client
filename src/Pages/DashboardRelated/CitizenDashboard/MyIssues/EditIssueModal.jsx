import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { handleBlockedError } from "../../../../utils/handleBlockedError";
import { FaTimes, FaCloudUploadAlt, FaInfoCircle, FaLock } from "react-icons/fa";

const EditIssueModal = ({ issue, onClose, onUpdated }) => {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: issue.title,
            category: issue.category,
            issueDescription: issue.issueDescription,
            senderName: issue.senderName,
            senderEmail: issue.senderEmail,
            senderRegion: issue.senderRegion,
            senderDistrict: issue.senderDistrict,
            senderAddress: issue.senderAddress,
        },
    });

    useEffect(() => {
        const fields = ["title", "category", "issueDescription", "senderName", "senderEmail", "senderRegion", "senderDistrict", "senderAddress"];
        fields.forEach(field => setValue(field, issue[field]));
    }, [issue, setValue]);

    const handleEditIssue = async (data) => {
        setLoading(true);
        try {
            let photoURL = issue.photoURL;

            if (data.image && data.image[0]) {
                const formData = new FormData();
                formData.append('image', data.image[0]);
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`;
                const imgRes = await axios.post(image_API_URL, formData);
                photoURL = imgRes.data.data.url;
            }

            const updatedIssue = {
                title: data.title,
                category: data.category,
                issueDescription: data.issueDescription,
                photoURL: photoURL
            };

            const res = await axiosSecure.patch(`/issues/${issue._id}`, updatedIssue);

            if (res.data.modifiedCount) {
                Swal.fire({
                    icon: "success",
                    title: "SUCCESSFULLY UPDATED",
                    text: "The issue record has been synchronized.",
                    confirmButtonColor: "#fa0bd2",
                    background: "hsl(var(--b1))",
                    color: "currentColor"
                });
                onUpdated();
            }
        } catch (error) {
            if (!handleBlockedError(error)) {
                Swal.fire({ icon: "error", title: "UPDATE FAILED", text: error.response?.data?.message || "Internal system error" });
            }
        } finally {
            setLoading(false);
        }
    };

    // Shared Input Styles for Consistency
    const inputStyle = "input input-bordered w-full rounded-xl bg-base-200/50 border-base-content/10 focus:border-[#fa0bd2] focus:ring-1 ring-[#fa0bd2]/20 font-semibold transition-all h-11 text-sm";
    const readonlyStyle = "input input-bordered w-full rounded-xl bg-base-300/30 border-base-content/5 opacity-60 cursor-not-allowed font-semibold h-11 text-sm";
    const labelStyle = "label-text text-[11px] font-black uppercase tracking-wider opacity-70 mb-1 block";

    return (
        <div className="fixed inset-0 bg-base-300/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="bg-base-100 border border-base-content/10 rounded-[2rem] w-full max-w-3xl shadow-2xl relative overflow-hidden flex flex-col max-h-[95vh]">

                {/* --- Header --- */}
                <div className="p-6 border-b border-base-content/5 flex justify-between items-center bg-base-200/30">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-10 bg-[#fa0bd2] rounded-full"></div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-base-content">
                                Edit <span className="text-[#fa0bd2]">Issue Report</span>
                            </h2>
                            <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">System Reference: {issue._id.toUpperCase()}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="btn btn-circle btn-ghost btn-sm transition-transform hover:rotate-90">
                        <FaTimes size={18} />
                    </button>
                </div>

                {/* --- Scrollable Form Body --- */}
                <form onSubmit={handleSubmit(handleEditIssue)} className="p-6 md:p-10 overflow-y-auto space-y-8 custom-scrollbar">

                    {/* Section 1: Editable Information */}
                    <div className="space-y-5">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#fa0bd2]"></span>
                            <h3 className="text-xs font-black uppercase tracking-widest opacity-80">General Information</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className={labelStyle}>Issue Subject line</label>
                                <input
                                    type="text"
                                    {...register("title", { required: "Subject is required" })}
                                    className={inputStyle}
                                    placeholder="Brief title of the issue"
                                />
                                {errors.title && <span className="text-error text-[10px] font-bold mt-1">{errors.title.message}</span>}
                            </div>

                            <div className="form-control">
                                <label className={labelStyle}>Report Category</label>
                                <select {...register("category")} className="select select-bordered w-full rounded-xl bg-base-200/50 border-base-content/10 h-11 min-h-[2.75rem] font-semibold text-sm focus:border-[#fa0bd2]">
                                    <option value="Broken streetlights">Broken streetlights</option>
                                    <option value="Potholes">Potholes</option>
                                    <option value="Water leakage">Water leakage</option>
                                    <option value="Garbage overflow">Garbage overflow</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-control">
                            <label className={labelStyle}>Detailed Description</label>
                            <textarea
                                {...register("issueDescription")}
                                className="textarea textarea-bordered rounded-xl bg-base-200/50 border-base-content/10 focus:border-[#fa0bd2] font-medium min-h-[100px]"
                                placeholder="Describe the situation in detail..."
                            ></textarea>
                        </div>

                        <div className="form-control">
                            <label className={labelStyle}>Updated Visual Evidence</label>
                            <input
                                type="file"
                                {...register('image')}
                                className="file-input file-input-bordered w-full rounded-xl bg-base-200/50 border-base-content/10 h-11 file:bg-base-content file:text-base-100 file:border-none file:h-full file:px-6 file:mr-4 file:font-black file:uppercase file:text-[10px]"
                            />
                            <p className="text-[10px] mt-2 opacity-50 flex items-center gap-1 italic"><FaInfoCircle /> New upload will replace the current file.</p>
                        </div>
                    </div>

                    {/* Section 2: Non-Editable Records (Input Style) */}
                    <div className="space-y-5 pt-4">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-base-content/30"></span>
                            <h3 className="text-xs font-black uppercase tracking-widest opacity-40">Reporter & Location Metadata</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className={labelStyle}>Full Name <FaLock className="inline ml-1 opacity-40" /></label>
                                <input type="text" {...register("senderName")} readOnly className={readonlyStyle} />
                            </div>
                            <div className="form-control">
                                <label className={labelStyle}>Email Address <FaLock className="inline ml-1 opacity-40" /></label>
                                <input type="text" {...register("senderEmail")} readOnly className={readonlyStyle} />
                            </div>
                            <div className="form-control">
                                <label className={labelStyle}>Division / Region <FaLock className="inline ml-1 opacity-40" /></label>
                                <input type="text" {...register("senderRegion")} readOnly className={readonlyStyle} />
                            </div>
                            <div className="form-control">
                                <label className={labelStyle}>District / Locality <FaLock className="inline ml-1 opacity-40" /></label>
                                <input type="text" {...register("senderDistrict")} readOnly className={readonlyStyle} />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className={labelStyle}>Precise Physical Address <FaLock className="inline ml-1 opacity-40" /></label>
                            <input type="text" {...register("senderAddress")} readOnly className={readonlyStyle} />
                        </div>
                    </div>

                    {/* --- Footer Buttons --- */}
                    <div className="flex justify-end items-center gap-4 pt-6 border-t border-base-content/5 mt-4">
                        <button type="button" onClick={onClose} className="text-xs font-black uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity">
                            Discard
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn h-12 px-10 bg-[#fa0bd2] hover:bg-[#d109b0] text-white border-none rounded-xl font-black uppercase text-xs tracking-[0.15em] shadow-lg shadow-[#fa0bd2]/20 transition-all active:scale-95 disabled:bg-base-300"
                        >
                            {loading ? <span className="loading loading-spinner loading-xs"></span> : "Confirm Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditIssueModal;