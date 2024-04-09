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
        <>
            <footer id="standardFooter" >
                <Row className='w-100'>
                    <Col className='d-block text-start mx-3'>
                        <div className='align-self-center'>
                            <a href='/landing'
                                className="
                                link-dark 
                                link-offset-2 
                                link-offset-3-hover 
                                link-underline
                                link-underline-opacity-0
                                link-underline-opacity-75-hover">
                                Home
                            </a>
                            <span> | </span>
                            <a href='/landing'
                                className="
                                link-dark 
                                link-offset-2 
                                link-offset-3-hover 
                                link-underline
                                link-underline-opacity-0
                                link-underline-opacity-75-hover">
                                Terms of Service
                            </a>
                            <span> | </span>
                            <a href='/landing'
                                className="
                                link-dark 
                                link-offset-2 
                                link-offset-3-hover 
                                link-underline
                                link-underline-opacity-0
                                link-underline-opacity-75-hover">
                                Privacy Policy
                            </a>
                        </div>

                    </Col>

                    <Col className='d-block justify-content-end mx-3'>
                        <div className='align-self-center'>
                            ©️ 2024: Team 1 Web Development Inc.
                        </div>
                    </Col>
                </Row>
            </footer>

        </>
    );
}

export default Footer;