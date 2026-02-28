import React from 'react';

const features = [
    {
        id: 1,
        title: "Easy Issue Reporting",
        description: "Citizens can quickly report streetlights, potholes, water leaks, and other public issues with photos and location.",
        icon: "https://i.ibb.co.com/Jw0smFTT/image.png",
        accent: "bg-blue-500/10"
    },
    {
        id: 2,
        title: "Real-time Tracking",
        description: "Track the status of reported issues from Pending → In-Progress → Resolved → Closed, anytime from your dashboard.",
        icon: "https://i.ibb.co.com/jP8cNHNh/image.png",
        accent: "bg-purple-500/10"
    },
    {
        id: 3,
        title: "Data & Analytics",
        description: "CivicCare helps authorities collect and analyze infrastructure data to improve city services efficiently.",
        icon: "https://i.ibb.co.com/5m35w7m/image.png",
        accent: "bg-emerald-500/10"
    },
    {
        id: 4,
        title: "Priority Support",
        description: "Premium citizens get priority assistance and updates on reported issues for faster resolutions.",
        icon: "https://i.ibb.co.com/NnLXGR8C/image.png",
        accent: "bg-[#fa0bd2]/10"
    }
];

const Features = () => {
    return (
        <section className="py-6 md:py-10">
            <div className="container mx-auto px-4">

                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black text-base-content tracking-tighter">
                        Core <span className='text-[#fa0bd2]'>Features</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-base-content/60 font-medium leading-relaxed">
                        Explore the key features of CivicCare that make reporting and resolving public issues easier, faster, and more transparent.
                    </p>
                    <div className="flex justify-center gap-1">
                        <div className="w-10 h-1 bg-[#fa0bd2] rounded-full"></div>
                        <div className="w-4 h-1 bg-base-300 rounded-full"></div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map(feature => (
                        <div
                            key={feature.id}
                            className="group relative bg-base-100 p-8 rounded-[2.5rem] border border-base-200 hover:border-[#fa0bd2]/30 transition-all duration-500 shadow-xl shadow-base-200/20 hover:shadow-2xl hover:shadow-[#fa0bd2]/5"
                        >
                            {/* Icon Background Circle */}
                            <div className={`w-20 h-20 ${feature.accent} rounded-3xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                                <img
                                    src={feature.icon}
                                    alt={feature.title}
                                    className="w-12 h-12 object-contain drop-shadow-md"
                                />
                            </div>

                            <div className="space-y-3">
                                <h3 className="font-black text-xl text-base-content tracking-tight group-hover:text-[#fa0bd2] transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-base-content/50 text-sm font-medium leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Corner Accent (Hover Only) */}
                            <div className="absolute top-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="h-1.5 w-1.5 rounded-full bg-[#fa0bd2] animate-ping"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;