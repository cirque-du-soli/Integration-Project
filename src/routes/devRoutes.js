// IMPORT: Dashboard/View
// TODO:
import DevDashboard from "../views/devDashboard";
import PageNotFound from "../pages/misc/pageNotFound404";
import Footer from "../components/navbars/footer"

// these all start from the /dev/ path
var devRoutes = [ 
    
/*     {
        path: "/",
        name: "Dev: Dashboard",
        component: <Navigate to="/dev/dashboard" replace />,
    }, */

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
        path: "/PageNotFound",
        name: "Dev: PageNotFound",
        component: <PageNotFound />,
    }

];

export default devRoutes;
