// IMPORT: Dashboard/View
// TODO:
import DevDashboard from "../views/devDashboard";
import PageNotFound from "../pages/404/pageNotFound404.js";
import Footer from "../components/navbars/footer"
import LandingPage from "../pages/landing.js"

// IMPORT: Pages
import LoginPage from "../pages/user/login.js";
import RegistrationPage from "../pages/user/regi.js";
import UserHomePage from "../pages/user/user-home-page.js";
import UserSettingsPage from "../pages/user/user-settings-page.js";
import MosaicMainPage from "../pages/mosaic/main.js";
import LoadingSpinner from "../pages/loadingSpinner/loadingSpinner.jsx";
import NotAuthorized from "../pages/notAuth/notAuthorized.js";

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
        path: "/not-authorized",
        name: "Dev: NotAuthorized",
        component: <NotAuthorized />,
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
    },

    {
        path: "/LoadingSpinner",
        name: "Dev: LoadingSpinner",
        component: <LoadingSpinner />,
    }
];

export default devRoutes;
