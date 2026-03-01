import React from 'react';

import { FaArrowUp, FaArrowDown } from 'react-icons/fa';



const StatCard = ({ title, value, icon, trend, trendType, color }) => {



    const isUp = trendType === "up";



    return (

        <div className="group relative overflow-hidden bg-base-100 p-6 rounded-[2.5rem] border border-base-200 hover:border-[#fa0bd2]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#fa0bd2]/10">

            {/* Icon Circle */}

            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:rotate-6 bg-${color}/10 text-${color}`}>

                {icon}

            </div>



            <h3 className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{title}</h3>



            <div className="flex items-end justify-between">

                <span className="text-2xl font-black tracking-tight text-base-content">{value}</span>



                {/* Dynamic Trend Badge */}

                {trend && (

                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black 

                        ${isUp ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>

                        {isUp ? <FaArrowUp size={8} /> : <FaArrowDown size={8} />}

                        {trend}%

                    </div>

                )}

            </div>



            {/* Background Aesthetic Layer */}

            <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity scale-150">

                {icon}

            </div>

        </div>

    );

};



export default StatCard;