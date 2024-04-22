// IMPORT: React
import { Route, Routes, Navigate } from "react-router-dom";
import { useRef, useEffect, useState } from 'react';

// IMPORT: Routes
import adminRoutes from "../routes/adminRoutes.js";

// IMPORT: Components
import PageNotFound from "../pages/misc/pageNotFound404.js";
import UserNotAuthorized from "../pages/misc/notAuthorized.js";
import AdminToggleButton from "../components/admin/AdminToggleButton.jsx";
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

    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin'));

    return (
        <>
            <div className="App">
                {(localStorage.getItem('isAdmin') === "true") ? (
                    <div className="main-panel" ref={mainPanelRef}>

                        <Routes>
                            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
                            {getRoutes(adminRoutes)}
                            <Route path="/*" element={<PageNotFound />} />
                        </Routes>
                    </div>
                ) : (<UserNotAuthorized />)
                }
                <p>isAdmin: {isAdmin}</p>

            </div>
        </>
    );

}

export default AdminLayout;
