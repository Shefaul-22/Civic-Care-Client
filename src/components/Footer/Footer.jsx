import React from 'react';
import Logo from "../Shared/Logo";
import { CiMail } from "react-icons/ci";
import { FaClock, FaFacebook, FaInstagram, FaLinkedin, FaRegCopyright, FaTwitter } from "react-icons/fa";
import { FaLocationDot, FaWhatsapp } from "react-icons/fa6";
import { MdCall } from "react-icons/md";
import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="bg-[#0f172a] text-slate-400 py-16 mt-20 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4 lg:gap-16">

                    {/* Branding Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-1 bg-white/5 rounded-lg">
                                <Logo />
                            </div>
                            <h2 className="text-2xl font-black text-white tracking-tight italic">
                                Civic<span className="text-[#fa0bd2]">Care</span>
                            </h2>
                        </div>
                        <p className="text-sm leading-relaxed font-medium">
                            Empowering citizens to report and track public issues easily, ensuring faster responses and smarter city services for everyone.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white mb-6">Contact Support</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex gap-3 items-center group cursor-pointer hover:text-white transition-colors">
                                <div className="p-2 bg-slate-800 rounded-full group-hover:bg-[#fa0bd2]/20 group-hover:text-[#fa0bd2] transition-all">
                                    <CiMail size={18} />
                                </div>
                                support@civiccare.com
                            </li>
                            <li className="flex gap-3 items-center group cursor-pointer hover:text-white transition-colors">
                                <div className="p-2 bg-slate-800 rounded-full group-hover:bg-[#fa0bd2]/20 group-hover:text-[#fa0bd2] transition-all">
                                    <MdCall size={18} />
                                </div>
                                +880 1234-567890
                            </li>
                            <li className="flex gap-3 items-start group cursor-pointer hover:text-white transition-colors">
                                <div className="p-2 bg-slate-800 rounded-full group-hover:bg-[#fa0bd2]/20 group-hover:text-[#fa0bd2] transition-all mt-0.5">
                                    <FaLocationDot size={18} />
                                </div>
                                <span>House 12, Road 5, Uttara,<br />Dhaka, Bangladesh</span>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white mb-6">Explore</h3>
                        <ul className="grid grid-cols-1 gap-3 text-sm font-medium">
                            {['Home', 'All Issues', 'Services', 'Service Centers'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(" ", "")}`}
                                        className="hover:text-[#fa0bd2] transition-all duration-300 flex items-center gap-2 group"
                                    >
                                        <span className="h-[1px] w-0 bg-[#fa0bd2] group-hover:w-3 transition-all"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal & Social */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white mb-6">Legal & Social</h3>
                        <ul className="space-y-3 text-sm mb-8">
                            <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>

                        <div className="flex gap-3">
                            {[
                                { icon: <FaWhatsapp />, link: "https://wa.me/+8801300108645" },
                                { icon: <FaFacebook />, link: "#" },
                                { icon: <FaInstagram />, link: "#" },
                                { icon: <FaLinkedin />, link: "https://linkedin.com/in/..." }
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-3 bg-slate-800 rounded-xl hover:bg-[#fa0bd2] hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-lg"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold tracking-widest text-slate-500">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-[10px] md:text-xs uppercase tracking-[0.15em] font-bold opacity-80">
                        <span>{new Date().getFullYear()}</span>
                        <FaRegCopyright className="text-[#fa0bd2] animate-pulse" />
                        <span className="italic">CivicCare</span>
                        <span className="hidden md:inline text-slate-500">|</span>
                        <span className="text-[#fa0bd2]/95">All Rights Reserved</span>
                    </div>
                    <p className="hover:text-white cursor-default transition-colors">Designed for Better Governance</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;