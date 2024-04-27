// IMPORT: React
import { Route, Routes, Navigate } from "react-router-dom";
import { useRef, useEffect, useContext } from 'react';

import { useTheme } from '../contexts/themeContext.js';
import { AuthContext } from '../contexts/authContext.js';

import mainRoutes from "../routes/mainRoutes.js";

import UserDeleted from "../pages/userDeleted";
import UserBanned from "../pages/userBanned.jsx";
import UserNotAuthorized from "../pages/notAuth/notAuthorized.js";
import LoadingSpinner from "../pages/loadingSpinner/loadingSpinner.jsx";
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

    // PROTECT ROUTES & REDIRECT ACCORDINGLY
    const userAuthContext = useContext(AuthContext);

    if (userAuthContext.userDeletedState === true) return <UserDeleted />
    if (userAuthContext.userBannedState === true) return <UserBanned />
    if (userAuthContext.authState === false) return <Navigate to='/login' />
    
    return (
        <>
            {console.log('mainLayout.jsx')}
            {console.log('userAuthContext: ', userAuthContext)}
            {
                (
                    userAuthContext.authState === true
                    &&
                    userAuthContext.userDeletedState === false
                    &&
                    userAuthContext.userBannedState === false
                )
                    ?
                    <div className="App bg-gray-200">
                        <div className="main-panel text-black" ref={mainPanelRef}>
                            <Routes>
                                {getRoutes(mainRoutes)}
                                <Route path="/*" element={<Navigate to="/" replace />} />
                            </Routes>
                            <Footer />
                        </div>
                    </div>
                    :
                    <LoadingSpinner />
            }
        </>
    );
}

export default MainLayout;