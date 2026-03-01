import React, { useState } from 'react';
import { FaUserCog, FaShieldAlt, FaPalette, FaBell, FaGlobe, FaSave } from 'react-icons/fa';
import useRole from '../../../hooks/useRole'; 
import UseAuth from '../../../hooks/UseAuth';


const Settings = () => {
    const { role } = useRole();
    const { user } = UseAuth();
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', label: 'General', icon: <FaUserCog /> },
        { id: 'security', label: 'Security', icon: <FaShieldAlt /> },
        { id: 'appearance', label: 'Appearance', icon: <FaPalette /> },
        { id: 'notifications', label: 'Notifications', icon: <FaBell /> },
    ];

    return (
        <div className="p-4 md:p-8 space-y-8 bg-base-100 min-h-screen animate-fadeIn">

            {/* --- Header Section --- */}
            <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#fa0bd2] font-black uppercase text-xs tracking-[0.3em]">
                    <FaGlobe /> Workspace Configuration
                </div>
                <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter">
                    Account <span className="text-[#fa0bd2]">Settings</span>
                </h2>
                <p className="text-sm opacity-50 font-medium">Manage your {role} preferences and identity.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">

                {/* --- Sidebar Tabs --- */}
                <div className="w-full lg:w-64 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === tab.id
                                    ? 'bg-[#fa0bd2] text-white shadow-lg shadow-[#fa0bd2]/30 scale-105'
                                    : 'bg-base-200/50 hover:bg-base-200 opacity-60 hover:opacity-100'
                                }`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div >

                {/* --- Content Area --- */}
                <div className="flex-1 bg-base-200/30 border border-base-content/5 rounded-[2.5rem] p-6 md:p-10 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#fa0bd2]/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

                    {activeTab === 'profile' && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                                <span className="w-2 h-8 bg-[#fa0bd2] rounded-full"></span> Profile Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label uppercase text-[10px] font-black opacity-40">Display Name</label>
                                    <input type="text" defaultValue={user?.displayName} className="input input-bordered rounded-xl bg-base-100 font-bold focus:border-[#fa0bd2] outline-none" />
                                </div>
                                <div className="form-control">
                                    <label className="label uppercase text-[10px] font-black opacity-40">Email Address</label>
                                    <input type="email" value={user?.email} readOnly className="input input-bordered rounded-xl bg-base-300/50 font-bold cursor-not-allowed" />
                                </div>
                                <div className="form-control">
                                    <label className="label uppercase text-[10px] font-black opacity-40">Current Role</label>
                                    <input type="text" value={role?.toUpperCase()} readOnly className="input input-bordered rounded-xl bg-base-300/50 font-black text-[#fa0bd2]" />
                                </div>
                                {role === 'staff' && (
                                    <div className="form-control">
                                        <label className="label uppercase text-[10px] font-black opacity-40">Staff ID</label>
                                        <input type="text" placeholder="STF-9920" className="input input-bordered rounded-xl bg-base-100 font-bold" />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                                <span className="w-2 h-8 bg-error rounded-full"></span> Security Guard
                            </h3>
                            <div className="space-y-4 max-w-md">
                                <div className="form-control">
                                    <label className="label uppercase text-[10px] font-black opacity-40">New Password</label>
                                    <input type="password" placeholder="••••••••" className="input input-bordered rounded-xl bg-base-100" />
                                </div>
                                <button className="btn btn-error btn-outline rounded-xl uppercase font-black tracking-widest btn-sm">Reset Password</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'appearance' && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                                <span className="w-2 h-8 bg-primary rounded-full"></span> System Theme
                            </h3>
                            <div className="flex gap-4">
                                <div className="p-4 border-2 border-[#fa0bd2] rounded-2xl bg-base-100 w-32 text-center cursor-pointer">
                                    <div className="h-4 w-full bg-[#fa0bd2] mb-2 rounded"></div>
                                    <span className="text-[10px] font-black">MODERN</span>
                                </div>
                                <div className="p-4 border border-base-content/10 rounded-2xl bg-slate-900 w-32 text-center cursor-pointer opacity-50 hover:opacity-100 transition-all">
                                    <div className="h-4 w-full bg-slate-700 mb-2 rounded"></div>
                                    <span className="text-[10px] font-black text-white">DARK OPS</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                                <span className="w-2 h-8 bg-warning rounded-full"></span> Alert Synchronization
                            </h3>
                            <div className="space-y-3">
                                <label className="flex items-center justify-between p-4 bg-base-100 rounded-2xl cursor-pointer">
                                    <span className="font-bold text-sm">Email Notifications</span>
                                    <input type="checkbox" className="toggle toggle-secondary" defaultChecked />
                                </label>
                                <label className="flex items-center justify-between p-4 bg-base-100 rounded-2xl cursor-pointer">
                                    <span className="font-bold text-sm">Transaction Alerts</span>
                                    <input type="checkbox" className="toggle toggle-secondary" defaultChecked />
                                </label>
                            </div>
                        </div>
                    )}

                    {/* --- Common Footer Save Button --- */}
                    <div className="mt-10 pt-6 border-t border-base-content/5 flex justify-end">
                        <button className="btn bg-[#fa0bd2] hover:bg-[#fa0bd2]/80 text-white border-none px-8 rounded-2xl font-black tracking-widest shadow-lg shadow-[#fa0bd2]/30">
                            <FaSave /> SAVE CHANGES
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;