import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';



// reactstrap components
import {
    Row,
    Col,
    Navbar,
} from "reactstrap";

import logoFull from '../../assets/ProjecTile-Logo-Icon-TransparentBG.png';

function Footer() {

    // STATES

    // HOOKS

    return (
        <footer className="bg-teal-500 text-white py-4 fixed bottom-0 w-full">
        <div className="container mx-auto flex flex-wrap justify-between items-center font-semibold">
            <div className="w-full md:w-auto mb-4 md:mb-0">
                <a href='/landing' className="text-black hover:text-gray-400 mr-4">Home</a>
                <span className="text-black">|</span>
                <a href='/landing' className="text-black hover:text-gray-400 ml-4 mr-4">Terms of Service</a>
                <span className="text-black">|</span>
                <a href='/landing' className="text-black hover:text-gray-400 ml-4">Privacy Policy</a>
            </div>

            <div className="w-full md:w-auto text-center md:text-right">
                <p className="text-black">© 2024: Team 1 Web Development Inc.</p>
            </div>
        </div>
    </footer>
    );
}

export default Footer;