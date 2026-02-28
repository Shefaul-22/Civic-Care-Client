import React from 'react';
import { IoMailOutline, IoCallOutline, IoLocationOutline, IoSendSharp } from 'react-icons/io5';
import Swal from 'sweetalert2';

const ContactUs = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Form logic here
        Swal.fire({
            title: "Message Sent!",
            text: "We will get back to you within 24 hours.",
            icon: "success",
            confirmButtonColor: "#fa0bd2",
            background: 'var(--fallback-b1,oklch(var(--b1)))',
            color: 'var(--fallback-bc,oklch(var(--bc)))'
        });
        e.target.reset();
    };

    return (
        <section className="py-20 bg-base-100 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <span className="text-[#fa0bd2] font-black tracking-[0.3em] uppercase text-xs">Get in Touch</span>
                    <h2 className="text-4xl md:text-6xl font-black text-base-content leading-tight">
                        Contact <span className="text-[#fa0bd2]">Support</span>
                    </h2>
                    <p className="text-base-content/60 max-w-2xl mx-auto font-medium">
                        Have questions about our service coverage or need technical help? Our team is standing by to assist you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

                    {/* Contact Info Cards (2 Columns) */}
                    <div className="lg:col-span-2 space-y-6">
                        {[
                            {
                                icon: <IoMailOutline />,
                                title: "Email Us",
                                detail: "support@civiccare.com",
                                sub: "24/7 online support",
                                color: "text-blue-500 bg-blue-500/10"
                            },
                            {
                                icon: <IoCallOutline />,
                                title: "Call Hotline",
                                detail: "+880 1234 567 890",
                                sub: "Sun-Thu, 9am-6pm",
                                color: "text-[#fa0bd2] bg-[#fa0bd2]/10"
                            },
                            {
                                icon: <IoLocationOutline />,
                                title: "Main Headquarters",
                                detail: "Civic Plaza, Dhaka, Bangladesh",
                                sub: "Level 4, Block-C",
                                color: "text-orange-500 bg-orange-500/10"
                            }
                        ].map((info, idx) => (
                            <div key={idx} className="flex items-center gap-6 p-6 bg-base-200/50 rounded-[2rem] border border-base-300 hover:border-[#fa0bd2]/30 transition-all group">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform ${info.color}`}>
                                    {info.icon}
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-base-content/40 uppercase tracking-widest">{info.title}</h4>
                                    <p className="text-xl font-black text-base-content">{info.detail}</p>
                                    <p className="text-xs font-medium text-base-content/50 mt-1">{info.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Form (3 Columns) */}
                    <div className="lg:col-span-3 bg-base-200/50 p-8 md:p-12 rounded-[3rem] border border-base-300 relative overflow-hidden">
                        {/* Decorative Background Glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#fa0bd2]/10 blur-3xl"></div>

                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest ml-2">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="John Doe"
                                        className="w-full px-6 py-4 rounded-2xl bg-base-100 border border-base-300 focus:outline-none focus:border-[#fa0bd2] font-bold text-sm transition-all shadow-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest ml-2">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="john@example.com"
                                        className="w-full px-6 py-4 rounded-2xl bg-base-100 border border-base-300 focus:outline-none focus:border-[#fa0bd2] font-bold text-sm transition-all shadow-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest ml-2">Your Message</label>
                                <textarea
                                    rows="5"
                                    required
                                    placeholder="Tell us how we can help..."
                                    className="w-full px-6 py-4 rounded-2xl bg-base-100 border border-base-300 focus:outline-none focus:border-[#fa0bd2] font-bold text-sm transition-all shadow-sm resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-5 rounded-[2rem] bg-gradient-to-r from-[#fa0bd2] to-[#6366F1] text-white font-black uppercase tracking-[0.3em] text-sm shadow-xl shadow-[#fa0bd2]/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3"
                            >
                                <IoSendSharp className="text-xl" />
                                Send Message
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactUs;