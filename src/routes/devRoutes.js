import { Auth } from '../context/Auth';

// IMPORT: Dashboards & Views
// TODO: import DevDashboard from "../views/devDashboard"; 

// these all start from the /dev/ path
var devRoutes = [ 
    
    {
        path: "/",
        name: "Dev: Dashboard",
        component: <Navigate to="/dev/dashboard" replace />,
    },

    {
        path: "/dashboard",
        name: "Dev: Dashboard",
        component: <DevDashboard />,
    },

    {
        path: "/header",
        name: "Dev: Header",
        component: <Header />,
    },

    {
        path: "/PageNotFound",
        name: "Dev: PageNotFound",
        component: <PageNotFound />,
    }

];

export default devRoutes;
