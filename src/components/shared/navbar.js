import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ username }) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    return (
        <nav className='navbar'>
            <div className="navbar-links">
                <Link to="/" className="nav-title" id='nav-title'>ProjecTile</Link>
                <Link to="/mosaics" className="nav-link">My Mosaics</Link>
                <Link to="/mosaics/add" className="nav-link">New Mosaic</Link>
                <div className='nav-item'
                    onMouseEnter={() => setDropdownVisible(true)}
                    onMouseLeave={() => setDropdownVisible(false)}
                >
                    <span className='nav-link'>{username}</span>
                    {isDropdownVisible && (
                        <div className='nav-dropdown'>
                            <Link to='/settings' className='nav-dropdown-item'>Settings</Link>
                            <Link to='/logout' className='nav-dropdown-item'>Logout</Link>
                        </div>
                    )};
                </div>
            </div>
        </nav>
    );
};

export default Navbar;