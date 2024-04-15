// IMPORT: React
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useRef } from 'react';

// IMPORT: Styles
import logo from '../assets/ProjecTile-Logo-Icon-TransparentBG.png';
import '../styles/App.css';

// creates scrollbars on windows devices
import PerfectScrollbar from "perfect-scrollbar";

// IMPORT: Routes
import adminRoutes from "../routes/adminRoutes.js";

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

function AdminLayout(props) {

    const mainPanelRef = useRef(null);

    return (
        <>
            <div className="App">
                <Footer />

                {true ?
                    ( //(sessionStorage.getItem('isAdmin') === "true") ? ( FIXME: Uncomment this line to enable admin authorization   
                        <div className="main-panel" ref={mainPanelRef}>

                            <Routes>
                                {/* Add all admin routes & views */}
                                {getRoutes(adminRoutes)}

                                {/* Catch-all non-declared routes*/}
                                <Route
                                    path="/*"
                                    element={<Navigate to="/dashboard" replace />}
                                />
                            </Routes>
                        </div>
                    ) : (<PageNotFound />)// FIXME: Change this to UserNotAuthorized component
                }
                
            </div>
        </>
    );

}

export default AdminLayout;
