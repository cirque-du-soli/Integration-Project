import { Auth } from '../context/Auth';

// IMPORT: Dashboards/Views
/* TODO: SOLI NEXT
import AdminDashboard from "../views/AdminDashboard";
import DevDashboard from "../views/DevDashboard"; 
*/

// IMPORT: Dev Components
/* TODO: SOLI LATER
import UserProfilePrivate from '../components/Pages/UserProfilePrivate';
import UserProfilePublic from '../components/Pages/UserProfilePublic';
*/

// IMPORT: All other components
import Header from '../components/navbars/mainNavbar';
import PageNotFound from '../components/Pages/PageNotFound';

/* TODO: SOLI NEXT
import AdminTables from "../components/Tables/AdminTables";
*/

var routes = [

    ///////////////////////////// ADMIN ROUTES ////////////////////////
    {
        layout: "AdminLayout",
        path: "/dashboard",
        name: "Admin Dashboard",
        component: <AdminDashboard />,
    },

    {
        layout: "AdminLayout",
        path: "/admintables/",
        name: "Admin Tables",
        component: <AdminTables />,
    },
    ///////////////////////////// USER ROUTES ////////////////////////
    {
        layout: "StandardLayout",
        path: "/",
        name: "Standard Dashboard",
        component: <StandardDashboard />,
    },

    {
        layout: "StandardLayout",
        path: "/:username",
        name: "Public profile",
        component: <UserProfile />,
    },

    {
        layout: "StandardLayout",
        path: "/products/:id",
        name: "Listing Page",
        component: <ListingPage />,
    },

    // {
    //     layout: "StandardLayout",
    //     path: "/products/:id",
    //     name: "Edit Listing",
    //     component: <ListingPage />,
    // },

    {
        layout: "StandardLayout",
        path: "/profile",
        name: "Private profile",
        component: <UserProfilePrivate />,
    },

    {
        layout: "StandardLayout",
        path: "/settings",
        name: "Settings",
        component: <EditProfile />,
    },

    {
        layout: "StandardLayout",
        path: "/sell",
        name: "Sell",
        component: <Sell />,
    },

    {
        layout: "StandardLayout",
        path: "/checkout",
        name: "Checkout",
        component: <Checkout />
    },

    ///////////////////////////// Dev ROUTES ////////////////////////

    {
        layout: "DevLayout",
        path: "/",
        name: "Dev: Dashboard",
        component: <DevDashboard />,
    },

    {
        layout: "DevLayout",
        path: "/header",
        name: "Dev: Header",
        component: <Header />,
    },

    {
        layout: "DevLayout",
        path: "/PageNotFound",
        name: "Dev: PageNotFound",
        component: <PageNotFound />,
    }

];

export default routes;
