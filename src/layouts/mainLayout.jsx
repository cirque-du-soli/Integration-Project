// IMPORT: React
import { Route, Routes, Navigate } from "react-router-dom";
import { useRef, React, useEffect } from 'react';
import { useTheme } from '../contexts/themeContext.js';

// IMPORT: Routes
import mainRoutes from "../routes/mainRoutes.js";
import Footer from "../components/navbars/footer.jsx";


const getRoutes = (routes) => {
    return routes.map((prop, key) => {
        return (
            <Route path={prop.path} element={prop.component} key={key} exact />
        );
    });
};

function MainLayout(props) {

    const mainPanelRef = useRef(null);

    const { toggleTheme } = useTheme();

    useEffect(() => {
        // light theme when the Main routes mount
        toggleTheme('light');
    }, [toggleTheme]);

    return ( 
        <>
            <div className="App bg-gray-200">
                <div className="main-panel text-black" ref={mainPanelRef}>
                    <Routes>
                        {getRoutes(mainRoutes)}
                        <Route path="/*" element={<Navigate to="/" replace />} />
                    </Routes>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default MainLayout;