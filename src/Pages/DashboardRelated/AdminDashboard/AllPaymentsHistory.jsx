import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Legend
} from "recharts";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FaMoneyBillWave, FaCalendarAlt, FaDownload, FaUserShield, FaHistory, FaSearchDollar } from "react-icons/fa";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";
import Loading from "../../../components/Loading/Loading";
import InvoicePDF from "../../../components/PaymentInvoice/InvoicePDF";

const AllPaymentsHistory = () => {
    const { role } = useRole();
    const axiosSecure = useAxiosSecure();
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data = {}, isLoading } = useQuery({
        queryKey: ["payments", selectedMonth, page],
        queryFn: async () => {
            const url = selectedMonth
                ? `/admin/payments/by-month?month=${selectedMonth}&page=${page}&limit=${limit}`
                : `/admin/payments?page=${page}&limit=${limit}`;
            const res = await axiosSecure.get(url);
            return res.data;
        },
        keepPreviousData: true,
    });

    const { payments = [], totalPages = 1, currentPage = 1 } = data;

    // --- Dynamic Calculation for Total Volume ---
    // যদি ব্যাকএন্ড থেকে totalAmount না আসে, তবে বর্তমান লিস্ট থেকে ক্যালকুলেট করবে
    const calculatedTotal = useMemo(() => {
        return data.totalAmount || payments.reduce((acc, curr) => acc + (curr.amount || 0), 0);
    }, [data.totalAmount, payments]);

    const chartData = useMemo(() => {
        const map = {};
        payments.forEach((p) => {
            const month = new Date(p.paidAt).toISOString().slice(0, 7);
            map[month] = (map[month] || 0) + p.amount;
        });
        return Object.keys(map).map((month) => ({ month, total: map[month] }));
    }, [payments]);

    if (isLoading) return <Loading />;

    return (
        <div className="p-4 md:p-8 space-y-8 bg-base-100 min-h-screen animate-fadeIn">

            {/* --- Header Section --- */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[#fa0bd2] font-black uppercase text-xs tracking-[0.3em]">
                        <FaHistory /> Transaction Ledger
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter">
                        All <span className="text-[#fa0bd2]">Payments</span>
                    </h2>
                    <p className="text-sm opacity-50 font-medium">Monitoring financial flow and synchronization.</p>
                </div>

                {/* --- Filter Tool --- */}
                <div className="bg-base-200/50 p-2 rounded-2xl border border-base-content/5 flex items-center gap-3 shadow-inner">
                    <div className="pl-3 text-[#fa0bd2]"><FaCalendarAlt /></div>
                    <input
                        type="month"
                        className="bg-transparent border-none focus:ring-0 font-bold text-sm uppercase cursor-pointer outline-none"
                        value={selectedMonth}
                        onChange={(e) => {
                            setSelectedMonth(e.target.value);
                            setPage(1);
                        }}
                    />
                </div>
            </div>

            {/* --- Summary Cards --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-base-200/50 border border-base-content/5 p-6 rounded-[2.5rem] flex items-center gap-5 shadow-sm">
                    <div className="w-14 h-14 rounded-2xl bg-[#fa0bd2]/10 flex items-center justify-center text-[#fa0bd2] text-2xl shadow-[0_0_20px_rgba(250,11,210,0.15)]">
                        <FaSearchDollar />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase opacity-50 tracking-widest">Total Volume</p>
                        <p className="text-2xl font-black tracking-tight">
                            $ {calculatedTotal.toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Additional Decorative Stat Card */}
                <div className="bg-base-200/50 border border-base-content/5 p-6 rounded-[2.5rem] flex items-center gap-5 opacity-60">
                    <div className="w-14 h-14 rounded-2xl bg-base-content/5 flex items-center justify-center text-base-content text-2xl">
                        <FaMoneyBillWave />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase opacity-60 tracking-widest">Active Transactions</p>
                        <p className="text-2xl font-black">{payments.length}</p>
                    </div>
                </div>
            </div>

            {/* --- Chart Section --- */}
            {chartData.length > 0 && (
                <div className="bg-base-100 border border-base-content/10 rounded-[2.5rem] p-6 md:p-8 shadow-xl overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#fa0bd2]"></div>
                    <h3 className="text-sm font-black uppercase tracking-widest mb-8 flex items-center gap-2 opacity-80">
                        <span className="w-2 h-2 rounded-full bg-[#fa0bd2] animate-pulse"></span> Revenue Stream
                    </h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#fa0bd2" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#fa0bd2" stopOpacity={0.2} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.05} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 10, fontWeight: 'bold' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 10 }} />
                                <Tooltip
                                    cursor={{ fill: 'hsl(var(--bc)/0.05)' }}
                                    contentStyle={{ borderRadius: '15px', backgroundColor: 'hsl(var(--b1))', border: '1px solid hsl(var(--bc)/0.1)', fontWeight: 'bold' }}
                                />
                                <Bar dataKey="total" fill="url(#barGradient)" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {/* --- Table Section --- */}
            <div className="bg-base-100 border border-base-content/10 rounded-[2.5rem] shadow-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full border-separate border-spacing-y-2 px-4">
                        <thead>
                            <tr className="text-[11px] uppercase tracking-[0.2em] opacity-50 border-none">
                                <th className="bg-transparent pl-6">Ref</th>
                                <th className="bg-transparent">Issue Details</th>
                                {role === "admin" && <th className="bg-transparent text-[#fa0bd2]">Source User</th>}
                                <th className="bg-transparent text-right">Amount</th>
                                <th className="bg-transparent text-center">Execution Date</th>
                                <th className="bg-transparent text-center">Invoice</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((p, i) => (
                                <tr key={p._id} className="group transition-all hover:translate-x-1">
                                    <td className="bg-base-200/50 rounded-l-2xl font-mono text-[10px] opacity-40 pl-6">
                                        #{(currentPage - 1) * limit + i + 1}
                                    </td>
                                    <td className="bg-base-200/50 font-bold text-sm">
                                        <div className="flex flex-col">
                                            <span className="truncate max-w-[200px]">{p.title || p.type}</span>
                                            <span className="text-[10px] opacity-40 font-normal italic">Verified Asset</span>
                                        </div>
                                    </td>
                                    {role === "admin" && (
                                        <td className="bg-base-200/50 text-[11px] font-semibold text-primary">
                                            <div className="flex items-center gap-2">
                                                <FaUserShield className="opacity-40" /> {p?.boostedBy || p?.email}
                                            </div>
                                        </td>
                                    )}
                                    <td className="bg-base-200/50 text-right font-black">
                                        <span className="text-[#fa0bd2]">$</span> {p.amount?.toLocaleString()}
                                    </td>
                                    <td className="bg-base-200/50 text-center text-[10px] font-bold opacity-60">
                                        {new Date(p.paidAt).toLocaleDateString()} <br />
                                        <span className="opacity-40">{new Date(p.paidAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </td>
                                    <td className="bg-base-200/50 rounded-r-2xl text-center">
                                        <PDFDownloadLink
                                            document={<InvoicePDF payment={p} />}
                                            fileName={`invoice-${p._id}.pdf`}
                                            className="btn btn-circle btn-ghost btn-sm text-[#fa0bd2] hover:bg-[#fa0bd2] hover:text-white transition-all"
                                        >
                                            {({ loading }) => (loading ? <span className="loading loading-spinner loading-xs"></span> : <FaDownload size={14} />)}
                                        </PDFDownloadLink>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* --- Pagination --- */}
                <div className="p-8 border-t border-base-content/5 flex items-center justify-between bg-base-200/20">
                    <p className="text-[10px] font-black uppercase opacity-40 tracking-tighter">Synchronized Nodes: {payments.length}</p>
                    <div className="join shadow-xl">
                        <button className="join-item btn btn-sm px-4 bg-base-100 border-base-content/10" disabled={page === 1} onClick={() => setPage(page - 1)}>PREV</button>
                        <button className="join-item btn btn-sm no-animation bg-[#fa0bd2] text-white border-none font-black text-[10px]">PAGE {currentPage} / {totalPages}</button>
                        <button className="join-item btn btn-sm px-4 bg-base-100 border-base-content/10" disabled={page === totalPages} onClick={() => setPage(page + 1)}>NEXT</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllPaymentsHistory;