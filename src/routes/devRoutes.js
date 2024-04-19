// IMPORT: Dashboard/View
// TODO:
import DevDashboard from "../views/devDashboard";
import PageNotFound from "../pages/misc/pageNotFound404";
import Footer from "../components/navbars/footer"
import LandingPage from "../pages/misc/landing"
import { Lan } from "@mui/icons-material";

// IMPORT: Pages
import LoginPage from "../pages/user/login.js";
import RegistrationPage from "../pages/user/regi.js";
import UserHomePage from "../pages/user/user-home-page.js";
import UserSettingsPage from "../pages/user/user-settings-page.js";
import MosaicMainPage from "../pages/mosaic/main.js";

import AdminToggleButton from "../components/admin/adminToggleButton";

// these all start from the /dev/ path
var devRoutes = [

    {
        path: "/dashboard",
        name: "Dev: Dashboard",
        component: <DevDashboard />,
    },

    {
        path: "/footer",
        name: "Dev: Footer",
        component: <Footer />,
    },

    {
        path: "/404-page-not-found",
        name: "Dev: PageNotFound",
        component: <PageNotFound />,
    },

    {
        path: "/LandingPage",
        name: "Dev: Landing Page",
        component: <LandingPage />,
    },

    {
        path: "/LoginPage",
        name: "Dev: Login Page",
        component: <LoginPage />,
    },

    {
        path: "/RegistrationPage",
        name: "Dev: Registration Page",
        component: <RegistrationPage />,
    },

    {
        path: "/UserHomePage",
        name: "Dev: User Home Page",
        component: <UserHomePage />,
    },

    {
        path: "/UserSettingsPage",
        name: "Dev: User Settings Page",
        component: <UserSettingsPage />,
    },

    {
        path: "/MosaicMainPage",
        name: "Dev: Main Mosaic Page",
        component: <MosaicMainPage />,
    }/* ,

    {
        path: "/dashboard",
        name: "Dev: ToggleAdmin",
        component: <AdminToggleButton />,
    }  */

];

export default devRoutes;
