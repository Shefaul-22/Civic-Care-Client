import React, { useEffect } from 'react';
import { Outlet, useLocation, useMatches } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const RootLayout = () => {
    const matches = useMatches();

    const { pathname } = useLocation(); 

    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        const currentRoute = matches.find(
            (match) => match.handle?.title
        );

        if (currentRoute) {
            document.title = `${currentRoute.handle.title} | Civic Care`;
        } else {
            document.title = "Civic Care";
        }
    }, [matches]);

    return (

        <div className='min-h-screen bg-base-100 text-base-content transition-colors duration-300 flex flex-col'>


            <header className="fixed top-0 w-full z-50">
                <Navbar />
            </header>

            {/* Main Content Area */}

            <main className='flex-grow pt-16 md:pt-20 bg-base-200/30'>
                <div className="max-w-7xl mx-auto px-0 md:px-0">
                    <Outlet />
                </div>
            </main>

            {/* Footer Section */}
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default RootLayout;