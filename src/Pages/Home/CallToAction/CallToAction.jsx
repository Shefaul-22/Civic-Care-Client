import React from "react";
import { Link } from "react-router";
import { IoAddCircleOutline, IoSearchOutline, IoMegaphoneOutline } from "react-icons/io5";

const CallToAction = () => {
    return (
        <section className="py-6 md:py-12 relative overflow-hidden">
            {/* Background Decorative Shapes */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#fa0bd2]/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -z-10 animate-bounce-slow"></div>

            <div className="container mx-auto px-4">
                <div className="relative bg-base-100 border-2 border-base-200 p-8 md:p-20 rounded-[3rem] shadow-2xl overflow-hidden text-center">

                    {/* Inner Content Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-[#fa0bd2]/10 text-[#fa0bd2] rounded-2xl rotate-12 group-hover:rotate-0 transition-transform duration-500">
                            <IoMegaphoneOutline size={40} />
                        </div>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-6">
                        <h2 className="text-4xl md:text-7xl font-black text-base-content tracking-tighter leading-none italic uppercase">
                            Your City, <span className="text-[#fa0bd2]">Your Voice</span>
                        </h2>

                        <p className="text-lg md:text-xl text-base-content/60 font-medium leading-relaxed">
                            Don't just witness the problems—be the solution. Report infrastructure issues today and help authorities fix them faster than ever.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-6">
                            {/* Primary Button */}
                            <Link
                                to="/post-issue"
                                className="group relative px-8 py-4 bg-[#fa0bd2] text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-xl shadow-[#fa0bd2]/30 hover:shadow-[#fa0bd2]/50 transition-all duration-300 active:scale-95 w-full sm:w-auto"
                            >
                                <IoAddCircleOutline className="text-xl transition-transform group-hover:rotate-90" />
                                Report an Issue
                            </Link>

                            {/* Secondary Button */}
                            <Link
                                to="/allIssues"
                                className="group px-8 py-4 bg-base-200 text-base-content rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 border-2 border-transparent hover:border-base-content transition-all duration-300 w-full sm:w-auto"
                            >
                                <IoSearchOutline className="text-xl" />
                                Browse Issues
                            </Link>
                        </div>
                    </div>

                    
                </div>
            </div>

            <style jsx>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 5s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

export default CallToAction;