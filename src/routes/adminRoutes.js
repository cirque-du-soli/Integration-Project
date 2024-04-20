// IMPORT: Dashboard/View
import AdminDashboard from "../views/adminDashboard";

// IMPORT: components
/* TODO: add more components
import AdminTables from "../components/Tables/AdminTables";
*/


// these all start from the /admin/ path
var adminRoutes = [
 
    {
        path: "/dashboard",
        name: "Admin Dashboard",
        component: <AdminDashboard />,
    },
    
    /*
    {
        path: "/dashboard",
        name: "other thing",
        component: <AdminToggleButton />,
    },

    {
        path: "/admintables/",
        name: "Admin Tables",
        component: <AdminTables />,
    },
 */
];

export default adminRoutes;
