// IMPORT: React
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useRef } from 'react';

// IMPORT: Styles
import logo from '../assets/ProjecTile-Logo-Icon-TransparentBG.png';
import '../styles/App.css';

// creates scrollbars on windows devices
import PerfectScrollbar from "perfect-scrollbar";

// IMPORT: Routes
import routes from "../routes/routes.js";

// IMPORT: Components
import Header from "../components/Navbars/Header.js";
//import Footer from "../components/Navbars/Footer.jsx";
import PageNotFound from "../components/Pages/PageNotFound";


const getRoutes = (routes) => {
    return routes.map((prop, key) => {
        if (prop.layout === "AdminLayout") {
            return (
                <Route path={prop.path} element={prop.component} key={key} exact />
            );
        } else {
            return null;
        }
    });
};

function AdminLayout(props) {

    const mainPanelRef = useRef(null);

    return (
        <div className="App">

            <Header />

            <Footer />

            {true ?
                ( //(sessionStorage.getItem('isAdmin') === "true") ? ( FIXME: Uncomment this line to enable admin authorization   
                    <div className="main-panel" ref={mainPanelRef}>

                        <Routes>
                            {/* This adds all possible routes & views */}
                            {getRoutes(routes)}

                            {/* Catch-all non-declared routes*/}
                            <Route
                                path="/*"
                                element={<Navigate to="/admin/dashboard" replace />}
                            />
                        </Routes>
                    </div>
                ) : (<PageNotFound />)// FIXME: Change this to UserNotAuthorized component
            }

        </div>
    );

}

export default AdminLayout;
