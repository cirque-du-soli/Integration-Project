import AdminDashboard from "../views/adminDashboard";
import PageNotFound from "../pages/404/pageNotFound404.js";
import NotAuthorized from "../pages/notAuth/notAuthorized.js";

// SOLI TODO: import AdminTables from "../components/Tables/AdminTables";

// these all start from the /admin/ path
var adminRoutes = [
 
    {
        path: "/dashboard",
        name: "Admin Dashboard",
        component: <AdminDashboard />,
    },

    {
        path: "/PageNotFound",
        name: "Admin PageNotFound",
        component: <PageNotFound />,
    },

    {
        path: "/NotAuthorized",
        name: "Admin NotAuthorized",
        component: <NotAuthorized />,
    },
    
    /*
    {
        path: "/admintables/",
        name: "Admin Tables",
        component: <AdminTables />,
    },
 */
];

export default adminRoutes;
