import { useState, useEffect } from "react";
import PageNotFound from './pageNotFound404.js';
//import Footer from '../components/navbars/Footer';
import Header from '../components/navbars/Header';

function landing() {
    const location = useLocation();

    return (
        <>
            <Header />
            <div className="landing">
                <h1>This is the landing page</h1>
            </div>
            <Footer />
        </>
    );
    
}
export default landing;
