// IMPORT: Dashboard/View
// TODO: 
//import MainDashboard from "../views/mainDashboard";
import PageNotFound from "../pages/misc/pageNotFound404";
import LandingPage from "../pages/misc/landing"

// IMPORT: Pages
import Login from "../pages/auth/login.js";
import Regi from "../pages/auth/regi.js";
import Home from "../pages/user/user-home-page.js";
import Settings from "../pages/user/user-settings-page.js";
import Main from "../pages/mosaic/main.js";


var mainRoutes = [
/*
    {
        path: "/",
        name: "Main Dashboard",
        component: <MainDashboard />,
    },
 
    {
        path: "/:username",
        name: "Public profile",
        component: <UserProfile />,
    },

    {
        path: "/profile",
        name: "Private profile",
        component: <UserProfilePrivate />,
    },

    {
        path: "/settings",
        name: "Settings",
        component: <EditProfile />,
    },
     */
    {
        path: "/PageNotFound",
        name: "Main PageNotFound",
        component: <PageNotFound />,
    },

    {
        path: "/welcome",
        name: "Landing Page",
        component: <LandingPage />,
    }

];

export default mainRoutes;
