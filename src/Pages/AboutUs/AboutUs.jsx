import React from 'react';
import { Link } from 'react-router';
import { IoShieldCheckmarkSharp, IoRocketSharp, IoPeopleSharp, IoStatsChartSharp } from 'react-icons/io5';

const AboutUs = () => {
    const stats = [
        { label: "Issues Resolved", value: "12K+", icon: <IoShieldCheckmarkSharp className="text-[#fa0bd2]" /> },
        { label: "Active Citizens", value: "50K+", icon: <IoPeopleSharp className="text-blue-500" /> },
        { label: "Cities Covered", value: "24+", icon: <IoRocketSharp className="text-orange-500" /> },
        { label: "Success Rate", value: "98%", icon: <IoStatsChartSharp className="text-green-500" /> },
    ];

    return (
        <div className="bg-base-100 py-16 md:py-24 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 space-y-24">

                {/* 1. Hero Section (Intro) */}
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1 relative group">
                        {/* Background Glow */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-[#fa0bd2] to-blue-500 opacity-20 blur-2xl rounded-full"></div>
                        <img
                            src="https://i.ibb.co.com/SXp99rdB/image.png"
                            alt="About CivicCare"
                            className="relative w-full rounded-[2.5rem] shadow-2xl object-cover border border-base-300 transform group-hover:rotate-2 transition-transform duration-500"
                        />
                    </div>

                    <div className="flex-1 space-y-6 text-center md:text-left">
                        <span className="text-[#fa0bd2] font-black tracking-[0.3em] uppercase text-sm">Who we are</span>
                        <h2 className="text-4xl md:text-6xl font-black text-base-content leading-tight">
                            Building a <span className="text-[#fa0bd2]">Smarter</span> City Together
                        </h2>
                        <p className="text-base-content/70 text-lg md:text-xl leading-relaxed">
                            CivicCare is a cutting-edge platform designed to bridge the gap between citizens and local authorities. We believe that every citizen deserves a safe, clean, and functional environment.
                        </p>
                        <p className="text-base-content/70 text-lg md:text-xl leading-relaxed">
                            Our platform empowers you to report infrastructure issues, track resolutions in real-time, and hold the system accountable—all from the palm of your hand.
                        </p>
                        <div className="pt-4">
                            <Link to="/services" className="btn btn-lg bg-[#fa0bd2] hover:bg-[#b00794] text-white border-none rounded-2xl px-10 shadow-lg shadow-[#fa0bd2]/20">
                                Explore Services
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 2. Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="p-8 bg-base-200/50 rounded-[2rem] border border-base-300 text-center hover:border-[#fa0bd2]/30 transition-all group">
                            <div className="text-3xl mb-3 flex justify-center group-hover:scale-110 transition-transform">
                                {stat.icon}
                            </div>
                            <h3 className="text-3xl font-black text-base-content">{stat.value}</h3>
                            <p className="text-base-content/50 font-bold uppercase text-[10px] tracking-widest">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* 3. Mission & Vision (Zig-Zag) */}
                <div className="grid md:grid-cols-2 gap-10">
                    <div className="p-10 bg-gradient-to-br from-base-200 to-base-100 rounded-[3rem] border border-base-300 shadow-xl space-y-4">
                        <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 text-2xl font-bold italic">M</div>
                        <h3 className="text-3xl font-black">Our Mission</h3>
                        <p className="text-base-content/70 leading-relaxed text-lg">
                            To digitize civic engagement by providing a transparent and efficient ecosystem where city problems are reported, tracked, and resolved with maximum accountability.
                        </p>
                    </div>

                    <div className="p-10 bg-gradient-to-br from-base-200 to-base-100 rounded-[3rem] border border-base-300 shadow-xl space-y-4">
                        <div className="w-14 h-14 bg-[#fa0bd2]/10 rounded-2xl flex items-center justify-center text-[#fa0bd2] text-2xl font-bold italic">V</div>
                        <h3 className="text-3xl font-black">Our Vision</h3>
                        <p className="text-base-content/70 leading-relaxed text-lg">
                            To become the backbone of urban development, making every city a "Smart City" where every resident feels heard and every issue is addressed within 24-48 hours.
                        </p>
                    </div>
                </div>

                {/* 4. Core Values Section */}
                <div className="text-center space-y-12">
                    <h2 className="text-3xl md:text-5xl font-black text-base-content">
                        Our Core <span className="text-[#fa0bd2]">Values</span>
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Transparency", desc: "No more hidden files. Track every step of your report's journey live.", color: "text-blue-500" },
                            { title: "Efficiency", desc: "Automated routing ensures your issue reaches the right department instantly.", color: "text-[#fa0bd2]" },
                            { title: "Community", desc: "We are stronger together. Join thousands of citizens making an impact.", color: "text-green-500" }
                        ].map((item, idx) => (
                            <div key={idx} className="space-y-3">
                                <div className={`text-xl font-black uppercase tracking-widest ${item.color}`}>{item.title}</div>
                                <div className="h-1 w-12 bg-base-300 mx-auto rounded-full"></div>
                                <p className="text-base-content/60 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. Call to Action */}
                <div className="bg-neutral rounded-[3.5rem] p-10 md:p-16 text-center text-neutral-content relative overflow-hidden">
                    {/* Decorative Blobs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#fa0bd2]/20 blur-[100px]"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 blur-[100px]"></div>

                    <div className="relative z-10 space-y-6">
                        <h2 className="text-3xl md:text-5xl font-black">Ready to change your city?</h2>
                        <p className="text-neutral-content/70 max-w-2xl mx-auto text-lg">
                            Don't wait for someone else to act. Report your first issue today and be the hero your community needs.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/login" className="btn btn-lg bg-white text-black hover:bg-white/90 border-none rounded-2xl px-10">
                                Join Now
                            </Link>
                            <Link to="/contact" className="btn btn-lg btn-outline text-white border-white/20 hover:bg-white/10 rounded-2xl px-10">
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutUs;