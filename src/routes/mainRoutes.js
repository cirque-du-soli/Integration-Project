// IMPORT: Dashboard/View
// TODO: 
//import MainDashboard from "../views/mainDashboard";
import PageNotFound from "../pages/misc/pageNotFound404";

// IMPORT: components

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
        name: "Dev: PageNotFound",
        component: <PageNotFound />,
    }

];

export default mainRoutes;
