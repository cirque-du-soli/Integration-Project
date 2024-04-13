// IMPORT: Dashboard/View
// TODO: 
import MainDashboard from "../views/mainDashboard.jsx";
import PageNotFound from "../pages/misc/pageNotFound404";
import LandingPage from "../pages/misc/landing"

// IMPORT: Pages
import LoginPage from "../pages/user/login.js";
import RegistrationPage from "../pages/user/regi.js";
import UserHomePage from "../pages/user/user-home-page.js";
import UserSettingsPage from "../pages/user/user-settings-page.js";
import MosaicMainPage from "../pages/mosaic/main.js";
import { Settings } from "@mui/icons-material";


var mainRoutes = [

    {
        path: "/dashboard",
        name: "Main Dashboard",
        component: <MainDashboard />,
    },
    /*
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
    },

    {
        path: "/register",
        name: "Registration Page",
        component: <RegistrationPage />,
    },

    {
        path: "/login",
        name: "Login Page",
        component: <LoginPage />,
    },

    {
        path: "/mosaic",
        name: "General Mosaic Page",
        component: <MosaicMainPage />,
    },

    {
        path: "/settings",
        name: "Login Page",
        component: <UserSettingsPage />,
    },

    {
        path: "/home",
        name: "User Home Page",
        component: <UserHomePage />,
    }

];

export default mainRoutes;
