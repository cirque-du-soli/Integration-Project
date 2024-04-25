// IMPORT: React
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useRef, useState, React, useEffect } from 'react';
import axios from "axios";
import { AuthContext } from "../contexts/authContext.js";
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

    // Apply light theme on /app routes only
    const { toggleTheme } = useTheme();

    useEffect(() => {

        // apply light theme when the MainDashboard mounts
        toggleTheme('light');

        console.log("Toggled to Light theme")

    }, [toggleTheme]);


    //check if logged in
    const [authState, setAuthState] = useState(false);
    const [userState, setUserState] = useState("");
    const [userAdminState, setUserAdminState] = useState(false);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/auth`, {
                headers: { accessToken: localStorage.getItem("accessToken") },
            })
            .then((response) => {
                if (response.data.error) {
                    setAuthState(false);
                    setUserState("");
                    setUserAdminState(false);
                } else {
                    console.log("response.data >> user state:")
                    console.log(response.data);
                    setUserState(response.data); // SOLI TODO: this will be response.data.username
                    
                    setAuthState(true);
                    //setUserAdminState(response.data.isAdmin); // SOLI TODO: check if user is admin
                    setUserAdminState(true); // SOLI TODO: TEMPORARY
                }
            });
    }, [localStorage.getItem("accessToken")]);

    //for selected mosaic
    const [selMosaic, setSelMosaic] = useState("");

    const mainPanelRef = useRef(null);

    const [uname, setUname] = useState(sessionStorage.getItem('username'));

    return ( // SOLI TODO: move AuthContext.Provider to App.js and pass via props
        <>
            <div className="App bg-gray-200">
                <div className="main-panel text-black" ref={mainPanelRef}>
                    <AuthContext.Provider
                        value={{
                            authState,
                            setAuthState,
                            userState,
                            setUserState,
                            selMosaic,
                            setSelMosaic,
                            userAdminState,
                            setUserAdminState
                        }}
                    >
                    <Routes>
                        {/* Add standard routes & views */}
                        {getRoutes(mainRoutes)}

                        {/* Catch-all non-declared routes*/}
                        <Route
                            path="/*"
                            element={<Navigate to="/" replace />}
                        />
                        </Routes>
                        <Footer props={{setUserAdminState: setUserAdminState, userAdminState: userAdminState}} />
                    </AuthContext.Provider>
                </div>
            </div>
        </>
    );
}

export default MainLayout;