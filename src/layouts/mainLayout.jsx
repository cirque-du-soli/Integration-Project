// IMPORT: React
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useRef, useState, React } from 'react';

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

//import EditProfile from "../components/Pages/EditProfile";

const getRoutes = (routes) => {
    return routes.map((prop, key) => {
        return (
            <Route path={prop.path} element={prop.component} key={key} exact />
        );
    });
};
function MainLayout(props) {

    /*  TODO: later -- implement popups / toast messages   
    const newPopup = (msg) => {
        console.log("StandardLayout.js: newPopup() called");
        console.log("StandardLayout.js: msg: " + msg);
        PopupAlert({ props: { msg: msg } });
    } 
    */
    
    const mainPanelRef = useRef(null);

    const [uname, setUname] = useState(sessionStorage.getItem('username'));

    return (
        <>
            <div className="App">
                {/* Standard Header */}
                {/* FIXME: <Header props={{ uname: uname }} /> */}
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