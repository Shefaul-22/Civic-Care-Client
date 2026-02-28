import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import UseAuth from '../../hooks/UseAuth';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { handleBlockedError } from '../../utils/handleBlockedError';
import { IoCloudUploadOutline, IoInformationCircleOutline, IoRocketSharp } from 'react-icons/io5';

const ReportIssue = () => {
    
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            category: "",
            senderRegion: "",
            senderDistrict: ""
        }
    });

    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const serviceCenters = useLoaderData();

    const [issueCount, setIssueCount] = useState(0);
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/users/${user.email}/issues/count`)
                .then(res => {
                    setIssueCount(res.data.count);
                    setRole(res.data.role);
                })
                .catch(err => console.error(err));
        }
    }, [user?.email, axiosSecure]);

    const regions = [...new Set(serviceCenters.map(c => c.region))];
    const senderRegion = useWatch({ control, name: 'senderRegion' });

    const districtsByRegion = (region) => {
        return serviceCenters.filter(c => c.region === region).map(d => d.district);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) setImagePreview(URL.createObjectURL(file));
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('image', data.image[0]);
            const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`;
            const imgRes = await axios.post(image_API_URL, formData);

            const issueInfo = {
                title: data.issueName,
                category: data.category,
                issueDescription: data.issueDescription,
                photoURL: imgRes.data.data.url,
                senderName: user?.displayName,
                senderEmail: user?.email,
                senderRegion: data.senderRegion,
                senderDistrict: data.senderDistrict,
                senderAddress: data.senderAddress,
                status: 'pending',
                createdAt: new Date()
            };

            const res = await axiosSecure.post('/issues', issueInfo);
            if (res.data.insertedId) {
                Swal.fire({ icon: "success", title: "Reported Successfully!", confirmButtonColor: "#fa0bd2" });
                navigate('/dashboard/my-issues');
            }
        } catch (error) {
            if (!handleBlockedError(error)) {
                Swal.fire({ icon: "error", title: "Oops...", text: "Something went wrong!" });
            }
        } finally {
            setLoading(false);
        }
    };

    const isLimitReached = role !== 'premiumUser' && issueCount >= 3;

    const inputStyle = "input input-bordered w-full rounded-xl bg-base-100/50 focus:border-[#fa0bd2] focus:outline-none py-6 font-medium text-sm transition-all";

    const selectStyle = "select select-bordered w-full rounded-xl bg-base-100/50 focus:border-[#fa0bd2] focus:outline-none font-medium text-sm transition-all text-base-content";
    const labelStyle = "label-text font-bold text-base-content/70 uppercase text-[11px] tracking-wider ml-1";

    return (
        <div className="max-w-6xl mx-auto p-10 md:p-14 mt-4 md:mt-6 bg-base-100 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div className="space-y-2">
                    <h2 className="text-3xl md:text-5xl font-black text-base-content">
                        Report <span className="text-[#fa0bd2]">Issue</span>
                    </h2>
                    <p className="text-base-content/50 font-medium">Submit details about local concerns for quick resolution.</p>
                </div>

                <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl border ${role === 'premiumUser' ? 'border-amber-500/30 bg-amber-500/5' : 'border-base-300 bg-base-200/50'}`}>
                    <div className={`p-2 rounded-lg ${role === 'premiumUser' ? 'bg-amber-500 text-white' : 'bg-base-300 text-base-content/70'}`}>
                        {role === 'premiumUser' ? <IoRocketSharp /> : <IoInformationCircleOutline />}
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase opacity-50 leading-none">Your Status</p>
                        <p className="text-sm font-bold">{role === 'premiumUser' ? 'Premium Member' : `Free Account (${issueCount}/3)`}</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-base-200/40 p-6 rounded-[2.5rem] border border-base-300">
                        <span className={labelStyle}>Evidence Photo</span>
                        <div className="mt-3">
                            <label className={`relative flex flex-col items-center justify-center w-full h-72 border-2 border-dashed rounded-[2rem] cursor-pointer transition-all hover:bg-base-200/50 ${errors.image ? 'border-error' : 'border-base-content/20'}`}>
                                {imagePreview ? (
                                    <img src={imagePreview} className="w-full h-full object-cover rounded-[1.8rem]" alt="Preview" />
                                ) : (
                                    <div className="text-center p-4">
                                        <IoCloudUploadOutline className="text-4xl mx-auto mb-2 opacity-30" />
                                        <p className="text-[11px] font-black uppercase opacity-40">Drop or Click to upload</p>
                                    </div>
                                )}
                                <input type="file" className="hidden" {...register('image', { required: true, onChange: handleImageChange })} />
                            </label>
                            {errors.image && <p className="text-error text-[10px] mt-2 font-bold ml-2 italic">Photo is required *</p>}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="form-control w-full space-y-1.5">
                            <label className="label py-0"><span className={labelStyle}>Title of Issue</span></label>
                            <input type="text" {...register('issueName', { required: true })} className={inputStyle} placeholder="Short headline..." />
                        </div>
                        <div className="form-control w-full space-y-1.5">
                            <label className="label py-0"><span className={labelStyle}>Category</span></label>

                            <select {...register('category', { required: true })} className={selectStyle}>
                                <option value="" disabled>Choose Category</option>
                                <option value="Broken streetlights">Broken streetlights</option>
                                <option value="Potholes">Potholes</option>
                                <option value="Water leakage">Water leakage</option>
                                <option value="Garbage overflow">Garbage overflow</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-control w-full space-y-1.5">
                        <label className="label py-0"><span className={labelStyle}>Detailed Description</span></label>
                        <textarea {...register('issueDescription')} rows="3" className="textarea textarea-bordered w-full rounded-xl bg-base-100/50 focus:border-[#fa0bd2] focus:outline-none font-medium text-sm resize-none p-4" placeholder="Explain the situation in detail..."></textarea>
                    </div>

                    <div className="bg-base-200/30 p-8 rounded-[2.5rem] border border-base-300 space-y-6">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#fa0bd2] mb-4">Location Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className={labelStyle}>Region</label>
                                <select {...register('senderRegion', { required: true })} className={selectStyle}>
                                    <option value="" disabled>Select Region</option>
                                    {regions.map((r, i) => <option key={i} value={r}>{r}</option>)}
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className={labelStyle}>District</label>
                                <select {...register('senderDistrict', { required: true })} className={selectStyle} disabled={!senderRegion}>
                                    <option value="" disabled>Select District</option>
                                    {senderRegion && districtsByRegion(senderRegion).map((d, i) => <option key={i} value={d}>{d}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className={labelStyle}>Exact Address / Point of Interest</label>
                            <input type="text" {...register('senderAddress', { required: true })} className={inputStyle} placeholder="House, Street, Landmark..." />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-6 pt-4">
                        <button
                            type="submit"
                            disabled={isLimitReached || loading}
                            className="btn btn-lg bg-[#fa0bd2] hover:bg-[#b00794] text-white border-none rounded-2xl px-10 shadow-lg shadow-[#fa0bd2]/20 disabled:opacity-50 transition-all w-full md:w-auto"
                        >
                            {loading ? <span className="loading loading-spinner"></span> : "Submit Report"}
                        </button>

                        {isLimitReached && (
                            <div className="flex-1 flex items-center gap-4 p-4 bg-error/10 rounded-2xl border border-error/20 w-full">
                                <IoInformationCircleOutline className="text-2xl text-error shrink-0" />
                                <div className="flex-1">
                                    <p className="text-[11px] font-black uppercase text-error">Limit Reached</p>
                                    <p className="text-xs font-bold opacity-70">Upgrade to premium for unlimited reporting.</p>
                                </div>
                                <button type="button" onClick={() => navigate('/profile')} className="btn btn-sm btn-error text-white rounded-xl lowercase">Upgrade</button>
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ReportIssue;