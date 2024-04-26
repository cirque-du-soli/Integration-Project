// IMPORT: React
import { Route, Routes, Navigate } from "react-router-dom";
import { useRef, useEffect } from 'react';
import adminRoutes from "../routes/adminRoutes.js";
import PageNotFound from "../pages/404/pageNotFound404.js";
import { useTheme } from '../contexts/themeContext.js';

const getRoutes = (routes) => {
    return routes.map((prop, key) => {
        return (
            <Route path={prop.path} element={prop.component} key={key} exact />
        );
    });
};

function AdminLayout(props) {

    const mainPanelRef = useRef(null);

    const { toggleTheme } = useTheme();

    useEffect(() => {
        // synthwave theme when the AdminDashboard mounts
        toggleTheme('synthwave'); 
    }, [toggleTheme]);

    return (
        <>
            <div className="App bg-slate-800 min-h-screen">
                <div className="main-panel" ref={mainPanelRef}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
                        {getRoutes(adminRoutes)}
                        <Route path="/*" element={<PageNotFound />} />
                    </Routes>
                </div>
            </div>
        </>
    );

}

export default AdminLayout;
