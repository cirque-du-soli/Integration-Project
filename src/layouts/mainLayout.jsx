// IMPORT: React
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useRef } from 'react';

// IMPORT: Styles
import logo from '../assets/ProjecTile-Logo-Icon-TransparentBG.png';
import '../styles/App.css';

// creates scrollbars on windows devices
import PerfectScrollbar from "perfect-scrollbar";

// IMPORT: Routes
import mainRoutes from "../routes/mainRoutes.js";

// IMPORT: Components
//import Header from "../components/navbars/Header.js";
import Footer from "../components/navbars/footer.jsx";
import PageNotFound from "../pages/misc/pageNotFound404.js";


const getRoutes = (routes) => {
    return routes.map((prop, key) => {
        return (
            <Route path={prop.path} element={prop.component} key={key} exact />
        );
    });
};

function MainLayout(props) {

    const mainPanelRef = useRef(null);

    return (
        <>
            <div className="App">

                < Footer />
                <div className="main-panel" ref={mainPanelRef}>
                    <Routes>
                        {/* Add standard routes & views */}
                        {getRoutes(mainRoutes)}

                        {/* Catch-all non-declared routes*/}
                        <Route
                            path="/*"
                            element={<Navigate to="/" replace />}
                        />
                    </Routes>
                </div>
                
            </div>
        </>
    );
}

export default MainLayout;
