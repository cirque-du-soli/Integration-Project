import { Auth } from '../context/Auth';

// IMPORT: Dashboards/Views
// TODO: import AdminDashboard from "../views/AdminDashboard";

// IMPORT: components
import Header from '../components/navbars/mainNavbar';
import PageNotFound from '../components/Pages/pageNotFound404';

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

    {
        path: "/admintables/",
        name: "Admin Tables",
        component: <AdminTables />,
    }

];

export default adminRoutes;
