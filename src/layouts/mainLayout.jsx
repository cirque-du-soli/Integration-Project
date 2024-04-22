// IMPORT: React
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useRef, useState, React, useEffect } from 'react';
import axios from "axios";
import { AuthContext } from "../contexts/authContext.js";

// IMPORT: Routes
import mainRoutes from "../routes/mainRoutes.js";

const getRoutes = (routes) => {
    return routes.map((prop, key) => {
        return (
            <Route path={prop.path} element={prop.component} key={key} exact />
        );
    });
};
function MainLayout(props) {

    //check if logged in
    const [authState, setAuthState] = useState(false);
    const [userState, setUserState] = useState("");

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/auth`, {
                headers: { accessToken: localStorage.getItem("accessToken") },
            })
            .then((response) => {
                if (response.data.error) {
                    setAuthState(false);
                } else {
                    console.log("response.data >> user state:")
                    console.log(response.data);
                    setUserState(response.data); // SOLI TODO: this will be response.data.username
                    // setAdminState(response.data.isAdmin); // SOLI TODO: check if user is admin
                    setAuthState(true);
                }
            });
    }, [localStorage.getItem("accessToken")]);

    //for selected mosaic
    const [selMosaic, setSelMosaic] = useState("");

    const mainPanelRef = useRef(null);

    const [uname, setUname] = useState(sessionStorage.getItem('username'));

    return ( // SOLI TODO: move AuthContext.Provider to App.js and pass via props
        <>
            <div className="App">
                <div className="main-panel" ref={mainPanelRef}>
                    <AuthContext.Provider
                        value={{
                            authState,
                            setAuthState,
                            userState,
                            setUserState,
                            selMosaic,
                            setSelMosaic,
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
                    </AuthContext.Provider>
                </div>
            </div>
        </>
    );
}

export default MainLayout;