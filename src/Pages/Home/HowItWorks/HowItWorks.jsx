import React from 'react';

const steps = [
    {
        id: "01",
        title: "Report an Issue",
        description: "Citizens report public issues like potholes, broken streetlights, or garbage problems with photos and location.",
        icon: "https://i.ibb.co.com/FLB2z0Kt/image.png",
    },
    {
        id: "02",
        title: "Admin Review",
        description: "Admins review submitted issues, verify details, and assign tasks to the appropriate government staff.",
        icon: "https://i.ibb.co.com/nqk2yWw5/image.png",
    },
    {
        id: "03",
        title: "Issue Resolution",
        description: "Assigned staff verify the issue on-site, update progress, and work towards resolving it efficiently.",
        icon: "https://i.ibb.co.com/C5s2Br5X/image.png",
    },
    {
        id: "04",
        title: "Track & Updates",
        description: "Citizens can track issue status in real time — from pending to resolved — and receive timely updates.",
        icon: "https://i.ibb.co.com/pjdWgG2v/image.png",
    }
];

const HowItWorks = () => {
    return (
        <section className="py-12 md:py-16 bg-base-100">
            <div className="container mx-auto px-4">

                {/* Section Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-black text-base-content tracking-tighter">
                        How Civic<span className='text-[#fa0bd2]'>Care Works</span>
                    </h2>
                    <p className="mt-4 text-base-content/50 font-medium max-w-lg mx-auto leading-relaxed">
                        A seamless 4-step process to transform your neighborhood and ensure a better city for everyone.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative">

                    {/* Background Connecting Line (Desktop Only) */}
                    <div className="hidden lg:block absolute top-1/3 left-0 w-full h-0.5 border-t-2 border-dashed border-base-300 -z-0"></div>

                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className="group relative flex flex-col items-center text-center space-y-6 z-10"
                        >
                            {/* Step Number Badge */}
                            <div className="absolute -top-6 bg-[#fa0bd2] text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg shadow-[#fa0bd2]/30 transform group-hover:-translate-y-1 transition-transform">
                                STEP {step.id}
                            </div>

                            {/* Icon Container */}
                            <div className="w-32 h-32 rounded-[2.5rem] bg-base-100 border-2 border-base-200 flex items-center justify-center p-6 shadow-xl shadow-base-200/50 group-hover:border-[#fa0bd2]/40 group-hover:shadow-[#fa0bd2]/5 transition-all duration-500 bg-white">
                                <img
                                    src={step.icon}
                                    alt={step.title}
                                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            {/* Content */}
                            <div className="space-y-3 px-4">
                                <h3 className="text-xl font-black text-base-content tracking-tight">
                                    {step.title}
                                </h3>
                                <p className="text-sm font-medium text-base-content/50 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>

                            {/* Mobile/Tablet Arrow Indicator (Hidden on Desktop) */}
                            {index !== steps.length - 1 && (
                                <div className="lg:hidden text-base-300 text-3xl animate-bounce mt-4">
                                    ↓
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;