import React, { useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation, useMatches } from 'react-router';
import { FaRegCreditCard, FaUser, FaHistory } from 'react-icons/fa';
import { MdReportProblem, MdOutlineSpaceDashboard, MdOutlineAdminPanelSettings, MdOutlineWbSunny } from 'react-icons/md';
import { LuUserCog, LuLayoutGrid } from "react-icons/lu";
import { HiUserAdd } from "react-icons/hi";
import { FiSettings, FiLogOut, FiMenu } from "react-icons/fi";

import useRole from '../hooks/useRole';
import UseAuth from '../hooks/UseAuth';
import useTheme from '../hooks/useTheme';
import Loading from '../components/Loading/Loading';
import Logo from '../components/Shared/Logo';
import { IoMoon } from 'react-icons/io5';

const DashboardLayout = () => {
    const { role, roleLoading } = useRole();
    const { user, logOutUser } = UseAuth();
    const { theme, toggleTheme } = useTheme();
    const matches = useMatches();

    const { pathname } = useLocation(); 

    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const closeDrawer = () => {
        const drawer = document.getElementById("my-drawer-4");
        if (drawer) drawer.checked = false;
    };

    useEffect(() => {
        const currentRoute = matches.find((match) => match.handle?.title);
        document.title = currentRoute ? `${currentRoute.handle.title} | Civic Care` : "Civic Care";
    }, [matches]);

    const handleLogout = async () => {
        try {
            await logOutUser();
            closeDrawer();
        } catch (error) {
            console.error(error);
        }
    };

    const navItemStyle = ({ isActive }) =>
        `flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300 font-bold tracking-tight uppercase text-[11px]
        ${isActive
            ? "bg-[#fa0bd2] text-white shadow-lg shadow-[#fa0bd2]/30 scale-[1.02]"
            : "text-base-content/60 hover:bg-base-200 hover:text-base-content"
        }`;

    if (roleLoading) return <Loading />;

    return (
        <div className="drawer lg:drawer-open min-h-screen w-full bg-base-100 font-sans">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

            {/* ================= CONTENT ================= */}
            <div className="drawer-content flex flex-col w-full bg-base-200/30">
                {/* ===== NAVBAR ===== */}
                <nav className="navbar bg-base-100/80 backdrop-blur-md sticky top-0 z-10 border-b border-base-200 px-4 md:px-8 py-4">
                    <div className="flex-1 gap-4">
                        <label htmlFor="my-drawer-4" className="btn btn-ghost lg:hidden">
                            <FiMenu size={24} />
                        </label>
                        <div>
                            <h2 className="text-xl md:text-2xl font-black tracking-tighter italic uppercase leading-none">
                                Welcome, <span className="text-[#fa0bd2]">{user?.displayName?.split(' ')[0]}</span>
                            </h2>
                            <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-widest mt-1">
                                {role} Account
                            </p>
                        </div>
                    </div>

                    <div className="flex-none gap-4 mr-2">
                        <button onClick={toggleTheme} className="btn btn-ghost btn-circle text-2xl mr-5">


                            {/* {theme === "light" ? "🌙" : "☀️"} */}

                            {theme === "light" ? (
                                <IoMoon size={22} className="text-slate-700 group-hover:text-[#fa0bd2]" />
                            ) : (
                                <MdOutlineWbSunny size={22} className="text-yellow-400 animate-pulse" />
                            )}
                        </button>


                        <div className="avatar">
                            <div className="w-10 rounded-xl ring ring-[#fa0bd2]/20 ring-offset-base-100 ring-offset-2">
                                <img src={user?.photoURL} alt="profile" />
                            </div>
                        </div>
                    </div>
                </nav>

                {/* ===== PAGE CONTENT ===== */}
                <main className="flex-1 p-4 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* ================= SIDEBAR ================= */}
            <div className="drawer-side z-20">
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

                <div className="flex min-h-full w-72 flex-col bg-base-100 border-r-2 border-base-200">
                    {/* SIDEBAR HEADER */}
                    <div className="p-6 border-b border-base-200">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className='w-12 h-12 pt-2'>
                                <Logo></Logo>
                            </div>
                            <h2 className="text-2xl font-black tracking-tighter text-base-content italic ml-4">
                                Civic<span className="text-[#fa0bd2]">Care</span>
                            </h2>
                        </Link>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                        <ul className="space-y-6">
                            {/* SECTION: MAIN */}
                            <div>
                                <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-base-content/50 mb-4">Main Dashboard</p>
                                <li className="list-none">
                                    <NavLink to="/dashboard" className={navItemStyle} onClick={closeDrawer} end>
                                        <LuLayoutGrid size={18} /> Dashboard Home
                                    </NavLink>
                                </li>
                            </div>

                            {/* SECTION: USER/PREMIUM */}
                            {(role === "user" || role === "premiumUser") && (
                                <div>
                                    <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-base-content/30 mb-4">Citizen Services</p>
                                    <div className="space-y-2">
                                        <li className="list-none"><NavLink to="/dashboard/my-issues" className={navItemStyle} onClick={closeDrawer}><MdReportProblem size={18} /> My Issues</NavLink></li>
                                        <li className="list-none"><NavLink to="/dashboard/allPayments-history" className={navItemStyle} onClick={closeDrawer}><FaHistory size={18} /> Payment History</NavLink></li>
                                    </div>
                                </div>
                            )}

                            {/* SECTION: STAFF */}
                            {role === "staff" && (
                                <div>
                                    <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-base-content/30 mb-4">Field Work</p>
                                    <li className="list-none"><NavLink to="/dashboard/staff-assigned-issues" className={navItemStyle} onClick={closeDrawer}><MdReportProblem size={18} /> Assigned Issues</NavLink></li>
                                </div>
                            )}

                            {/* SECTION: ADMIN */}
                            {role === "admin" && (
                                <div>
                                    <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-base-content/50 mb-4">Administration</p>
                                    <div className="space-y-2">
                                        <li className="list-none"><NavLink to="/dashboard/admin-all-issues" className={navItemStyle} onClick={closeDrawer}><MdOutlineAdminPanelSettings size={18} /> All Issues</NavLink></li>
                                        <li className="list-none"><NavLink to="/dashboard/addStaff" className={navItemStyle} onClick={closeDrawer}><HiUserAdd size={18} /> Add Staff</NavLink></li>
                                        <li className="list-none"><NavLink to="/dashboard/manage-users" className={navItemStyle} onClick={closeDrawer}><LuUserCog size={18} /> Manage Users</NavLink></li>
                                        <li className="list-none"><NavLink to="/dashboard/allPayments-history" className={navItemStyle} onClick={closeDrawer}><FaRegCreditCard size={18} /> Transactions</NavLink></li>
                                    </div>
                                </div>
                            )}

                            {/* SECTION: SETTINGS */}
                            <div className="border-t border-base-200 pt-6">
                                <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-base-content/50 mb-4">Account</p>
                                <div className="space-y-2">
                                    <li className="list-none"><NavLink to="/dashboard/profile" className={navItemStyle} onClick={closeDrawer}><FaUser size={18} /> Profile</NavLink></li>
                                    <li className="list-none"><NavLink to="/dashboard/settings" className={navItemStyle} onClick={closeDrawer}><FiSettings size={18} /> Settings</NavLink></li>
                                    <li className="list-none">
                                        <button onClick={handleLogout} className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-error hover:bg-error/10 transition-all font-bold tracking-tight uppercase text-[12px] cursor-pointer">
                                            <FiLogOut size={18} /> Logout Session
                                        </button>
                                    </li>
                                </div>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;