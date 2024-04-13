// IMPORT: React
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useRef } from 'react';

// IMPORT: Styles
import '../styles/App.css';

// IMPORT: Routes
import devRoutes from "../routes/devRoutes.js";

// IMPORT: Components
import Header from "../components/navbars/Header.js";


const getRoutes = (routes) => {
    return routes.map((prop, key) => {
        return (
            <Route path={prop.path} element={prop.component} key={key} exact />
        );
    });
};

function DevLayout(props) {

    const mainPanelRef = useRef(null);

    return (
        <>
            <div className="App">

                <Header />

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
                </div>
            </div>
        </>
    );

}

export default DevLayout;
