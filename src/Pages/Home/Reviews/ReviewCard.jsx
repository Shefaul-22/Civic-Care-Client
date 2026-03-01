import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
    const { userName, review: Testimonial, userPhotoUrl, userCity, rating = 5 } = review;

    return (
        <div className="flex justify-center items-center p-6 group">
            <div className="relative card w-full max-w-md bg-base-100 shadow-2xl hover:shadow-[#fa0bd2]/10 transition-all duration-500 border border-base-content/5 rounded-[2.5rem] p-8 md:p-10 overflow-hidden">

                {/* --- Background Decorative Element --- */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#fa0bd2]/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-[#fa0bd2]/10 transition-colors"></div>

                {/* Quote Icon & Rating */}
                <div className="flex justify-between items-start mb-6">
                    <div className="text-[#fa0bd2] opacity-20 text-5xl group-hover:opacity-40 transition-opacity">
                        <FaQuoteLeft />
                    </div>
                    <div className="flex gap-1 text-yellow-400">
                        {[...Array(rating)].map((_, i) => (
                            <FaStar key={i} size={14} />
                        ))}
                    </div>
                </div>

                {/* Testimonial Content */}
                <div className="card-body p-0  z-10">
                    <p className="text-base-content text-lg  font-medium ">
                        "{Testimonial}"
                    </p>

                    {/* Gradient Divider */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-[#fa0bd2]/30 to-transparent my-8"></div>

                    {/* Profile Section */}
                    <div className="flex items-center gap-4">
                        <div className="avatar">
                            <div className="w-14 h-14 rounded-2xl ring ring-[#fa0bd2] ring-offset-base-100 ring-offset-2 overflow-hidden shadow-lg">
                                <img
                                    src={userPhotoUrl || "https://i.ibb.co/mRpgS98/user-placeholder.png"}
                                    alt={userName}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-xl font-black tracking-tight text-base-content uppercase">
                                {userName}
                            </h2>
                            <div className="flex items-center gap-2">
                                <span className="w-4 h-[2px] bg-[#fa0bd2]"></span>
                                <p className="text-[#fa0bd2] text-xs font-bold uppercase tracking-widest">
                                    {userCity || "Verified User"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[#fa0bd2] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
        </div>
    );
};

export default ReviewCard;