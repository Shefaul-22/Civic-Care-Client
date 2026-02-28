import React from 'react';
import { FaRoad, FaTrashAlt, FaLightbulb, FaWater, FaWalking } from 'react-icons/fa';
import { Link } from 'react-router';

const Services = () => {
    const serviceData = [
        {
            title: "Repair Potholes",
            description: "We quickly identify and repair dangerous potholes to ensure safer roads and smoother travel for all citizens. You can report potholes easily and track progress in real time. Our teams prioritize high-risk areas to reduce accidents.",
            img: "https://i.ibb.co.com/SXp99rdB/image.png",
            icon: <FaRoad />,
            color: "from-blue-500 to-cyan-400"
        },
        {
            title: "Remove Garbage Overflow",
            description: "We respond promptly to garbage overflow issues to maintain a clean and healthy environment. Residents can report waste problems and track cleanup status easily. Regular monitoring helps prevent unhygienic conditions.",
            img: "https://i.ibb.co.com/wNtL4Y61/image.png",
            icon: <FaTrashAlt />,
            color: "from-green-500 to-emerald-400"
        },
        {
            title: "Repair Streetlights",
            description: "Faulty or broken streetlights are repaired quickly to ensure public safety at night. Citizens can report non-functioning lights with exact locations. Timely repairs help reduce crime risks and improve visibility.",
            img: "https://i.ibb.co.com/99BsYTjd/image.png",
            icon: <FaLightbulb />,
            color: "from-yellow-500 to-orange-400"
        },
        {
            title: "Fix Water Leakage",
            description: "We address water leakage issues efficiently to reduce water waste and infrastructure damage. Users can report leaks in pipelines or public taps and follow updates. Quick action helps ensure a reliable water supply.",
            img: "https://i.ibb.co.com/HDtqp0ZW/image.png",
            icon: <FaWater />,
            color: "from-cyan-500 to-blue-400"
        },
        {
            title: "Repair Damaged Footpaths",
            description: "Damaged footpaths are repaired to ensure safe walking for pedestrians. Improved footpaths enhance accessibility for children, elderly, and disabled people. Citizens can report broken walkways easily through the system.",
            img: "https://i.ibb.co.com/N243grq5/image.png",
            icon: <FaWalking />,
            color: "from-purple-500 to-[#fa0bd2]"
        }
    ];

    return (
        <div className='py-16 px-4 max-w-7xl mx-auto overflow-hidden'>
            {/* Header Section */}
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-4xl md:text-6xl font-black tracking-tight text-base-content">
                    Civic Services <span className="text-[#fa0bd2]">We Offer</span>
                </h2>
                <div className="w-24 h-2 bg-[#fa0bd2] mx-auto rounded-full"></div>
                <p className="max-w-2xl mx-auto text-base-content/60 font-medium">
                    Ensuring a better urban life by addressing community issues with speed, transparency, and care.
                </p>
            </div>

            {/* Services Grid */}
            <div className="space-y-20 md:space-y-32">
                {serviceData.map((service, index) => (
                    <div
                        key={index}
                        className={`flex flex-col gap-10 items-center md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                    >
                        {/* Image Side */}
                        <div className="flex-1 group relative">
                            <div className={`absolute -inset-4 bg-gradient-to-r ${service.color} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500 rounded-[2rem]`}></div>
                            <div className="relative overflow-hidden rounded-[2rem] border border-base-300 shadow-2xl">
                                <img
                                    src={service.img}
                                    alt={service.title}
                                    className="w-full h-[300px] md:h-[400px] object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                {/* Icon Badge */}
                                <div className={`absolute top-6 left-6 p-4 rounded-2xl bg-gradient-to-br ${service.color} text-white text-2xl shadow-xl`}>
                                    {service.icon}
                                </div>
                            </div>
                        </div>

                        {/* Text Side */}
                        <div className="flex-1 space-y-6 text-center md:text-left px-2">
                            <span className="text-[#fa0bd2] font-bold tracking-[0.3em] uppercase text-sm">Service 0{index + 1}</span>
                            <h4 className="text-3xl md:text-5xl font-black text-base-content leading-tight">
                                {service.title}
                            </h4>
                            <p className="text-lg md:text-xl text-base-content/70 leading-relaxed font-medium">
                                {service.description}
                            </p>
                            <Link to="/post-issue" className="btn btn-ghost hover:bg-[#fa0bd2] hover:text-white rounded-full px-8 border-2 border-[#fa0bd2] text-[#fa0bd2] font-bold transition-all">
                                Report This Issue
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;