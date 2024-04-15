// IMPORT: Dashboard/View
// TODO: import AdminDashboard from "../views/AdminDashboard";

// IMPORT: components
/* TODO: add more components
import AdminTables from "../components/Tables/AdminTables";
*/
import PageNotFound from "../pages/misc/pageNotFound404";


// these all start from the /admin/ path
var adminRoutes = [
/* 
    {
        path: "/dashboard",
        name: "Admin Dashboard",
        component: <AdminDashboard />,
    },

    {
        path: "/admintables/",
        name: "Admin Tables",
        component: <AdminTables />,
    },
 */
    {
        path: "/PageNotFound",
        name: "Dev: PageNotFound",
        component: <PageNotFound />,
    }
];

export default adminRoutes;
