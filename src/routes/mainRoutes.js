import { Auth } from '../context/Auth';

// IMPORT: Dashboards/Views
// TODO: import MainDashboard from "../views/mainDashboard";

// IMPORT: components

var mainRoutes = [

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
    }

];

export default mainRoutes;
