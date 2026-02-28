import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import ReviewCard from './ReviewCard';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('reviews.json')
            .then(res => res.json())
            .then(result => {
                setReviews(result);
            });
    }, []);

    return (
        <section className="py-6 md:py-10 overflow-hidden">
            {/* Section Header */}
            <div className='text-center mb-12 space-y-4'>
                <h2 className='text-4xl md:text-6xl font-black text-base-content tracking-tighter'>
                    What our citi<span className='text-[#fa0bd2]'>zens say</span>
                </h2>
                <p className='max-w-3xl mx-auto text-base-content/60 font-medium px-4 leading-relaxed'>
                    Real feedback from citizens using CivicCare to improve transparency and speed up public resolutions.
                </p>
                <div className="flex justify-center gap-1">
                    <div className="w-12 h-1 bg-[#fa0bd2] rounded-full"></div>
                    <div className="w-4 h-1 bg-base-300 rounded-full"></div>
                </div>
            </div>

            {/* Swiper Section */}
            <div className="px-4">
                {reviews.length > 0 && (
                    <Swiper
                        loop={true}
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        initialSlide={1}
                        coverflowEffect={{
                            rotate: 0, 
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5,
                            slideShadows: false, 
                        }}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        breakpoints={{
                            320: { slidesPerView: 1.1, spaceBetween: 10 },
                            640: { slidesPerView: 1.8, spaceBetween: 20 },
                            1024: { slidesPerView: 2.5, spaceBetween: 30 },
                            1440: { slidesPerView: 3, spaceBetween: 40 },
                        }}
                        modules={[EffectCoverflow, Pagination, Autoplay]}
                        className="mySwiper !pb-16" 
                    >
                        {reviews.map(review => (
                            <SwiperSlide key={review.id} className="max-w-[450px]">
                                <ReviewCard review={review} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>

            {/* Custom Pagination CSS (Global Style) */}
            <style jsx global>{`
                .swiper-pagination-bullet-active {
                    background: #fa0bd2 !important;
                    width: 24px !important;
                    border-radius: 5px !important;
                }
                .swiper-slide {
                    transition: transform 0.3s ease;
                }
                .swiper-slide-active {
                   
                }
            `}</style>
        </section>
    );
};

export default Reviews;