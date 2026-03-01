import React from 'react';

const Loading = () => {
    return (
        <div className="flex justify-center items-center min-h-[60vh] md:min-h-[70vh]">
            <div className="relative flex items-center justify-center">

                {/* --- Outer Soft Pulse (Halo Effect) --- */}
                <div className="absolute animate-ping h-20 w-20 rounded-full bg-[#fa0bd2] opacity-10"></div>

                {/* --- Secondary Rotating Ring --- */}
                <div className="absolute animate-spin h-14 w-14 border-t-2 border-b-2 border-[#fa0bd2]/20 rounded-full"></div>

                {/* --- Main DaisyUI Spinner --- */}
                <div className="relative">
                    <span className="loading loading-spinner w-10 md:w-12 text-[#fa0bd2]"></span>
                </div>

                {/* --- Subtle Background Glow --- */}
                <div className="absolute pointer-events-none w-40 h-40 bg-[#fa0bd2]/5 blur-[60px] rounded-full"></div>

            </div>
        </div>
    );
};

export default Loading;