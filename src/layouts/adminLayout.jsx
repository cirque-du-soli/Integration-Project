// IMPORT: React
import { Route, Routes, Navigate } from "react-router-dom";
import { useRef, useEffect, useState } from 'react';

// IMPORT: Routes
import adminRoutes from "../routes/adminRoutes.js";

// IMPORT: Components
import PageNotFound from "../pages/misc/pageNotFound404.js";
import UserNotAuthorized from "../pages/misc/notAuthorized.js";
import AdminToggleButton from "../components/admin/adminToggleButton.jsx";
import { newToastMessage } from '../components/customToast.js';

const getRoutes = (routes) => {
    return routes.map((prop, key) => {
        return (
            <Route path={prop.path} element={prop.component} key={key} exact />
        );
    });
};

function AdminLayout(props) {

    const mainPanelRef = useRef(null);

    // initial states
    const [isAdmin, setIsAdmin] = useState('true');
    localStorage.setItem('isAdmin', isAdmin);

    function toggleIsAdmin() {
        // update storage
        localStorage.setItem('isAdmin', (localStorage.getItem('isAdmin') === 'true') ? 'false' : 'true');
        // update state (re-renders div)
        setIsAdmin(localStorage.getItem('isAdmin'));
    }

    return (
        <>
            <div className="App">
                { (localStorage.getItem('isAdmin') === "true") ? ( 
                        <div className="main-panel" ref={mainPanelRef}>

                            <Routes>
                                <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
                                {getRoutes(adminRoutes)}
                                <Route path="/*" element={<PageNotFound />}/>
                            </Routes>
                        </div>
                ) : (<UserNotAuthorized />)
                }
                <AdminToggleButton props={{ toggleIsAdmin: toggleIsAdmin, newToastMessage: newToastMessage, isAdmin: isAdmin }} />
                <p>isAdmin: {isAdmin}</p>
                
            </div>
        </>
    );

}

export default AdminLayout;
