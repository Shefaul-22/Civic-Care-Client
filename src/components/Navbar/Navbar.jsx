import React from 'react';
import { Link, NavLink } from 'react-router';
import UseAuth from '../../hooks/UseAuth';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { BiSolidHomeCircle, BiStar } from 'react-icons/bi';
import useRole from '../../hooks/useRole';
import { MdContactPhone, MdOutlineLogin, MdReportProblem, MdSyncProblem, MdDashboard, MdOutlineWbSunny } from 'react-icons/md';
import { FcServices } from 'react-icons/fc';
import { HiInformationCircle } from 'react-icons/hi';
import Logo from '../Shared/Logo';
import useTheme from '../../hooks/useTheme';
import { IoMoon } from 'react-icons/io5';
import { AiOutlineProfile } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';

const Navbar = () => {

    const { theme, toggleTheme } = useTheme();
    const { user, logOutUser } = UseAuth();
    const { role } = useRole();
    const axiosSecure = useAxiosSecure();

    const { data: userData = {} } = useQuery({
        queryKey: ['user', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${encodeURIComponent(user.email)}`);
            return res.data;
        }
    });

    const handleSignOut = () => {
        logOutUser()
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Signed Out!",
                    text: "See you again soon.",
                    timer: 1500,
                    showConfirmButton: false,
                    background: 'var(--b1)',
                    color: 'var(--bc)'
                });
            });
    };

    const navItemStyles = ({ isActive }) =>
        `flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold transition-all duration-300 ${isActive
            ? "text-[#fa0bd2] bg-[#fa0bd2]/10 shadow-[inset_0_0_10px_rgba(250,11,210,0.1)]"
            : "text-base-content/70 hover:text-[#fa0bd2] hover:bg-base-200"
        }`;

    const closeDropdown = () => {
        const elem = document.activeElement;
        if (elem) {
            elem.blur();
        }
    };

    const links = (
        <>
            <li><NavLink onClick={closeDropdown} to="/" className={navItemStyles}><BiSolidHomeCircle size={20} />Home</NavLink></li>
            <li><NavLink onClick={closeDropdown} to="/allIssues" className={navItemStyles}><MdSyncProblem size={20} />All Issues</NavLink></li>
            <li><NavLink onClick={closeDropdown} to="/services" className={navItemStyles}><FcServices size={20} />Services</NavLink></li>
            <li><NavLink onClick={closeDropdown} to="/aboutUs" className={navItemStyles}><HiInformationCircle size={20} />About Us</NavLink></li>
            <li><NavLink onClick={closeDropdown} to="/service-centers" className={navItemStyles}><MdContactPhone size={20} />Contact</NavLink></li>
            {(role === "user" || role === "premiumUser") && (
                <li><NavLink onClick={closeDropdown} to="/post-issue" className={navItemStyles}><MdReportProblem size={20} />Report Issue</NavLink></li>
            )}

            {
                user && (
                    <li>
                        <NavLink onClick={closeDropdown} to="/dashboard" className="flex items-center gap-2 py-3 hover:bg-[#fa0bd2]/10 hover:text-[#fa0bd2] font-bold">
                            <MdDashboard size={18} /> Dashboard
                        </NavLink>
                    </li>
                )
            }

            {/* --- Theme Toggle Icon --- */}
            <li className="flex items-center ml-2 ">
                <button

                    onClick={() => {
                        toggleTheme();     
                        closeDropdown();  
                    }}


                    className="p-2 rounded-full bg-base-200 hover:bg-[#fa0bd2]/10 transition-all duration-300 group"
                    title={theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
                >
                    {theme === "light" ? (
                        <IoMoon size={22} className="text-slate-700 group-hover:text-[#fa0bd2]" />
                    ) : (
                        <MdOutlineWbSunny size={22} className="text-yellow-400 animate-pulse" />
                    )}
                </button>
            </li>
        </>
    );

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-2 md:p-4 pointer-events-none">
            <div className="navbar w-full max-w-7xl pointer-events-auto bg-base-100/70 backdrop-blur-md border border-base-300/50 shadow-lg rounded-2xl md:rounded-full px-4 transition-all duration-500">

                {/* Navbar Start */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden hover:bg-[#fa0bd2]/10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#fa0bd2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-50 p-2 shadow-2xl bg-base-100 rounded-2xl w-64 border border-base-300 gap-1">
                            {links}
                        </ul>
                    </div>

                    <div className="scale-90 md:scale-100 origin-left">
                        <Logo />
                    </div>
                </div>

                {/* Navbar Center */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-1 px-1">
                        {links}
                    </ul>
                </div>

                {/* Navbar End */}
                <div className="navbar-end gap-3">
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar online">
                                <div className="w-10 rounded-full ring-2 ring-[#fa0bd2] ring-offset-base-100 ring-offset-2 hover:scale-110 transition-transform">
                                    <img
                                        alt="User"
                                        src={user.photoURL || "https://i.ibb.co.com/JWv2ftcD/usericon.jpg"}
                                    />
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-4 z-50 p-3 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-2xl w-64 border border-base-300">
                                <li className="px-4 py-3 mb-2 bg-base-200/50 rounded-xl">
                                    <div className="flex flex-col items-start gap-1 p-0">
                                        <div className="flex items-center gap-2">
                                            <span className="font-black text-base-content">{user.displayName}</span>
                                            {userData.role === "premiumUser" && (
                                                <span className='bg-gradient-to-r from-yellow-400 to-orange-500 text-[10px] text-white font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm animate-pulse'>
                                                    <BiStar /> PRO
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-xs text-base-content/50 truncate w-full">{user.email}</span>
                                    </div>
                                </li>
                                <li>
                                    <Link to="/dashboard/profile" className="flex items-center gap-2 py-3 hover:bg-[#fa0bd2]/10 hover:text-[#fa0bd2] font-bold">
                                        <FaUser size={18} /> Profile
                                    </Link>
                                </li>
                                <li className="mt-2 border-t border-base-300 pt-2">
                                    <button
                                        onClick={handleSignOut}
                                        className="btn btn-error btn-sm text-white rounded-xl hover:bg-red-600 border-none"
                                    >
                                        Log Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link to="/login" className="group flex items-center gap-2 bg-gradient-to-r from-[#fa0bd2] to-[#b00794] text-white px-5 py-2.5 rounded-full font-bold shadow-lg shadow-[#fa0bd2]/20 hover:shadow-[#fa0bd2]/40 transition-all active:scale-95">
                            <MdOutlineLogin size={20} className="group-hover:translate-x-1 transition-transform" />
                            <span>Sign In</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;