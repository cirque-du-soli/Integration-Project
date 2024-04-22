// IMPORT: React
import { Route, Routes, Navigate } from "react-router-dom";
import { useRef, useEffect, useState } from 'react';

// IMPORT: Routes
import adminRoutes from "../routes/adminRoutes.js";

// IMPORT: Components
import PageNotFound from "../pages/404/pageNotFound404.js";
import UserNotAuthorized from "../pages/notAuth/notAuthorized.js";

import { AuthContext } from "../contexts/authContext.js";
import axios from "axios";

import LoadingSpinner from "../pages/loadingSpinner/loadingSpinner.jsx";


const getRoutes = (routes) => {
    return routes.map((prop, key) => {
        return (
            <Route path={prop.path} element={prop.component} key={key} exact />
        );
    });
};

function AdminLayout(props) {

    const mainPanelRef = useRef(null);

    //check if logged in
    const [authState, setAuthState] = useState(false);
    const [userState, setUserState] = useState("");
    const [userAdminState, setUserAdminState] = useState(""); // SOLI TODO: change to props.userAdminState -- must move entire auth context up one level

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

    return (
        <>
            <div className="App">
                {
                    userAdminState
                        ?
                        <div className="main-panel" ref={mainPanelRef}>

                            <Routes>
                                <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
                                {getRoutes(adminRoutes)}
                                <Route path="/*" element={<PageNotFound />} />
                            </Routes>
                        </div>
                        :
                        !(userAdminState === null || userAdminState === undefined || userAdminState === "")
                            ?
                            <UserNotAuthorized />
                            :
                            <LoadingSpinner />
                }
                <p>isAdmin: {userAdminState}</p>

            </div>
        </>
    );

}

export default AdminLayout;
