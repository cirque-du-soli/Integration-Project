// IMPORT: React
import { red } from '@mui/material/colors';
import { React, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// IMPORT: Popups
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// IMPORT: Reactstrap
import {
    Badge,
    Container,
    FormControl,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    Button,
} from 'reactstrap';



function AdminToggleButton({ props }) {

    const handleClick = async (e) => {
        e.preventDefault();
        console.log("adminToggleButton.jsx: handleClick() called");
        props.toggleIsAdmin();
    }

    return (
        <>
            <Button onClick={handleClick}>
                <b>---Toggle isAdmin---</b>
            </Button>
        </>
    );
}

export default AdminToggleButton;