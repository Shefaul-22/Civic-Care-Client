import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import UseAuth from '../../../hooks/UseAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const BeAStaff = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm();
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(c => c.region);

    const regions = [...new Set(regionsDuplicate)];

    // explore useMemo useCallback
    const districtsByRegion = (region) => {
        const regionDistricts = serviceCenters.filter(c => c.region === region);
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }

    const staffRegion = useWatch({ control, name: 'region' });

    const handleStaffApplication = data => {

        // console.log(data);

        axiosSecure.post('/staffs', data)

            .then(res => {

                if (res.data?.success === false) {
                    return Swal.fire({
                        icon: "warning",
                        title: "Duplicate Application",
                        text: res.data.message,
                        confirmButtonText: "OK"
                    });
                }


                if (res.data.insertedId) {
                    Swal.fire({
                        // position: "top-end",
                        icon: "success",
                        title: "Your application has been submitted. We will reach you within 24 hours",
                        showConfirmButton: true,
                        timer: 2000
                    });
                }
            }).catch(error => {
                console.error(error)
                Swal.fire({
                    icon: "error",
                    title: "Something went wrong",
                    text: "Please try again later !"
                });
            })
    }

    return (
        <div>
            <h2 className="text-4xl text-primary pt-4 md:pt-8 lg:pt-10">Be a Staff of CivicCare</h2>
            <form onSubmit={handleSubmit(handleStaffApplication)} className='mt-4 md:mt-6 p-4 text-black'>


                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>

                    {/* Staff Details */}
                    <fieldset className="fieldset">
                        <h4 className="text-2xl font-semibold">Staff Details</h4>
                        {/* staff  name */}
                        <label className="label">Staff Name</label>
                        <input type="text" {...register('name')}
                            defaultValue={user?.displayName}
                            className="input w-full" placeholder="Sender Name" />

                        {/* Staff email */}
                        <label className="label">Staff Email</label>
                        <input type="text" {...register('email')}
                            defaultValue={user?.email}
                            className="input w-full" placeholder="Sender Email" />

                        {/* Staff region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Staff Regions</legend>
                            <select {...register('region')} defaultValue="Pick a region" className="select w-full">
                                <option disabled={true}>Pick a region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        {/* Staff districts */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Staff Districts</legend>
                            <select {...register('district')} defaultValue="Pick a district" className="select w-full">
                                <option disabled={true}>Pick a district</option>
                                {
                                    districtsByRegion(staffRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>


                        {/* Staff address */}
                        <label className="label mt-4">Staff Address</label>
                        <input type="text" {...register('address')} className="input w-full" placeholder="Rider Address" />


                    </fieldset>
                    {/*  Details */}
                    <fieldset className="fieldset">
                        <h4 className="text-2xl font-semibold">More Details</h4>


                        {/* receiver email */}
                        <label className="label">NID</label>
                        <input type="number" {...register('nid', { required: "NID number is required" })} className="input w-full" placeholder="NID number" />

                        {errors.nid && (
                            <p className="text-red-500">{errors.nid.message}</p>
                        )}


                        {/* Educational details */}
                        <fieldset className="fieldset">
                            <legend className=" label">Educational Details</legend>

                            <select {...register('education', { required: "Educational details is required" })}

                                defaultValue="" className="select w-full file-input-primary">

                                <option value="" disabled>Select Your Degree</option>
                                <option value="HSC">HSC</option>
                                <option value="SSC">SSC</option>


                            </select>

                            {errors.education && (
                                <p className="text-red-500">{errors.education.message}</p>
                            )}


                        </fieldset>
                        {/* Experience details */}
                        <fieldset className="fieldset">
                            <legend className=" label">Work Experience</legend>

                            <select {...register('experience', { required: "Work Experience is required" })}

                                defaultValue="" className="select w-full file-input-primary">

                                <option value="" disabled>Select Your Experince</option>

                                <option value="New">New </option>

                                <option value="One Years">One Year</option>
                                <option value="Two Years">Two Years</option>
                                <option value="Three Years">Three Years</option>


                            </select>

                            {errors.experience && (
                                <p className="text-red-500">{errors.experience.message}</p>
                            )}


                        </fieldset>



                    </fieldset>
                </div>
                <input type="submit" className='btn btn-primary mt-8 text-white' value="Apply as a Staff" />
            </form>
        </div>
    );
};

export default BeAStaff;