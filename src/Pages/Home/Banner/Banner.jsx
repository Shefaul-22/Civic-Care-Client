import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import TypeWriter from './TypeWriter';
import { Link } from 'react-router';

const slides = [
    {
        img: "https://i.ibb.co.com/5W3mYsJn/image.png",
        title: "Your Voice. Your City.",
        desc: "Report civic issues instantly and help improve your community.",
        btn: "Get Started",
        link: "/allIssues"
    },
    {
        img: "https://i.ibb.co.com/wNtL4Y61/image.png",
        title: "Report Garbage Overflow",
        desc: "Help keep your city clean and healthy.",
        btn: "Report Now",
        link: "/post-issue"
    },
    {
        img: "https://i.ibb.co.com/SXp99rdB/image.png",
        title: "Fix Road Potholes",
        desc: "Ensure safer roads for everyone.",
        btn: "Submit Complaint",
        link: "/post-issue"
    },
    {
        img: "https://i.ibb.co.com/99BsYTjd/image.png",
        title: "Repair Streetlights",
        desc: "Improve visibility and public safety.",
        btn: "Request Service",
        link: "/service-centers"
    },
    {
        img: "https://i.ibb.co.com/HDtqp0ZW/image.png",
        title: "Water Leakage Issues",
        desc: "Prevent water wastage in your area.",
        btn: "Report Issue",
        link: "/post-issue"
    },
    {
        img: "https://i.ibb.co.com/N243grq5/image.png",
        title: "Damaged Footpaths",
        desc: "Make walking safe and accessible.",
        btn: "Take Action",
        link: "/post-issue"
    }
];

const Banner = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [startDesc, setStartDesc] = useState(false);

    return (
        <div className="relative overflow-hidden mt-8 group rounded-xl">
            <Carousel
                autoPlay
                infiniteLoop
                interval={7000}
                showThumbs={false}
                showStatus={false}
                stopOnHover={false}
                transitionTime={1000}
                className="main-banner"
                onChange={(index) => {
                    setActiveIndex(index);
                    setStartDesc(false);
                }}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="relative w-full h-[65vh] md:h-[80vh]">
                        {/* Hero Image with slight zoom effect animation */}
                        <img
                            src={slide.img}
                            alt={slide.title}
                            className="h-full w-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-[7000ms]"
                        />

                        {/* Dark Overlay with Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex pt-14 md:pt-6 lg:pt-10">

                            {/* Content Wrapper */}
                            <div className="container mx-auto px-6 md:px-12  text-left">
                                <div className="max-w-xl backdrop-blur-[2px] bg-black/10 p-6 lg:p-10 rounded-3xl border border-white/10 shadow-2xl animate-in fade-in slide-in-from-left-10 duration-1000">

                                    {/* Title with TypeWriter */}
                                    <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight tracking-tighter text-white">
                                        <TypeWriter
                                            key={"title" + activeIndex}
                                            text={slide.title}
                                            speed={80}
                                            start={activeIndex === index}
                                            onComplete={() => setStartDesc(true)}
                                            lastColor={true} 
                                        />
                                    </h1>

                                    {/* Description */}
                                    <p className="mb-8 text-lg md:text-2xl text-white/80 font-medium max-w-xl">
                                        <TypeWriter
                                            key={"desc" + activeIndex}
                                            text={slide.desc}
                                            speed={40}
                                            start={startDesc && activeIndex === index}
                                        />
                                    </p>

                                    {/* Action Button - Polished with Pink Gradient */}
                                    <div className={`transition-all duration-700 delay-500 ${startDesc ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                                        <Link
                                            to={slide.link}
                                            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#fa0bd2] to-[#b00794] text-white rounded-full text-lg font-bold shadow-lg shadow-[#fa0bd2]/30 hover:shadow-[#fa0bd2]/50 hover:scale-105 active:scale-95 transition-all"
                                        >
                                            {slide.btn}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>

            {/* Bottom Curve or Indicator Polish */}
            {/* <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-base-100 to-transparent pointer-events-none"></div> */}
        </div>
    );
};

export default Banner;