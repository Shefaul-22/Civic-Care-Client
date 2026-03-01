import React from 'react';
import { motion } from 'framer-motion';
import Banner from './Banner/Banner';
import HowItWorks from './HowItWorks/HowItWorks';
import Reviews from './Reviews/Reviews';
import Features from './Features/Features';
import LatestResolvedIssues from './LatestResolvedIssue/LatestResolvedIssue';
import Statistics from './Statistics/Statistics';
import Categories from './Categories/Categories';
import CallToAction from './CallToAction/CallToAction';
import PricingCards from './PricingCards/PricingCards';
import FAQ from './FAQ/FAQ';

const HomePage = () => {

    const revealAnimation = {
        hidden: {
            opacity: 0,
            y: 60, 
            scale: 0.98 
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 1, 
                delay: 0.3,    
                ease: [0.22, 1, 0.36, 1], 
            }
        }
    };

    return (
        <div className="overflow-hidden">
            <Banner />

            <div className='space-y-12 md:space-y-20 max-w-7xl mx-auto px-4 md:px-0 py-10 md:py-12'>

                {/*  Latest Resolved Issues */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={revealAnimation}>
                    <LatestResolvedIssues />
                </motion.div>

                {/*  Statistics */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={revealAnimation}>
                    <Statistics />
                </motion.div>

                {/* Categories */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={revealAnimation}>
                    <Categories />
                </motion.div>

                {/*Features */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={revealAnimation}>
                    <Features />
                </motion.div>

                {/*  How It Works */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={revealAnimation}>
                    <HowItWorks />
                </motion.div>

                {/*  Reviews */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={revealAnimation}>
                    <Reviews />
                </motion.div>

                {/*  FAQ */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={revealAnimation}>
                    <FAQ />
                </motion.div>

                {/*  Pricing Cards */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={revealAnimation}>
                    <PricingCards />
                </motion.div>

                {/* Call To Action */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={revealAnimation}>
                    <CallToAction />
                </motion.div>

            </div>
        </div>
    );
};

export default HomePage;