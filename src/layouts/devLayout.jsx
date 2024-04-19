// IMPORT: React
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect, useRef, React } from 'react';


// IMPORT: Styles
import '../styles/App.css';

// IMPORT: Routes
import devRoutes from "../routes/devRoutes.js";
import AdminToggleButton from "../components/admin/adminToggleButton.jsx";

const getRoutes = (routes) => {

    let map = routes.map((prop, key) => {
        return (
            <Route path={prop.path} element={prop.component} key={key} exact />
        );
    });
    
    return map;
};


function DevLayout(props) {

    const mainPanelRef = useRef(null);

    /////////////////// TOAST MESSAGES ///////////////////////

    // initial login state
    const [isLoggedIn, setIsLoggedIn] = useState(!(localStorage.getItem('accessToken') === '' || localStorage.getItem('accessToken') === null));
    const [isAdmin, setIsAdmin] = useState('true');

    function newToastMessage(toastType, msg) { // toastType: 'success', 'error', TBD...
        let options = {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        }
        switch (toastType) {
            case 'success':
                toast.success(msg, options);
                break;
            case 'error':
                toast.error(msg, options);
                break;
            default:
                toast.warning(msg, options);
                break;
        }
    }
    function toggleIsAdmin() {
        // update storage
        localStorage.setItem('isAdmin', (localStorage.getItem('isAdmin') === 'true') ? 'false' : 'true');
        // update state (re-renders div)
        setIsAdmin(localStorage.getItem('isAdmin'));
    }

    return (
        <>
            <div className="App">
                
                <div className="main-panel" ref={mainPanelRef}>

                    <Routes>
                        {/* Add all routes & views */}
                        {getRoutes(devRoutes)}

                        {/* Catch-all non-declared routes*/}
                        <Route
                            path="/*"
                            element={<Navigate to="/dev/dashboard" replace />}
                        />

                    </Routes>
                    
                    <AdminToggleButton props={{ toggleIsAdmin: toggleIsAdmin, toast: newToastMessage, isAdmin: isAdmin}} />
                    <p>isAdmin: {isAdmin}</p>

                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />                    



                </div>
            </div>
        </>
    );

}

export default DevLayout;
