import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='bg-slate-200'>
            <div>
                <Navbar></Navbar>
            </div>
            <div className='w-11/12 mx-auto pt-20 md:pt-24'>
                <Outlet></Outlet>
            </div>
            
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default RootLayout;