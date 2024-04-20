// IMPORT: Routes
import devRoutes from "../routes/devRoutes.js";

function DevDashboard(props) {

    const listRoutes = (routes) => {
        return routes.map((prop, key) => {
            return (
                <li key={key}><a href={"/dev" + prop.path}>{prop.name}</a></li>
            );

        });
    };

    return (
        <>
            <h1>Welcome to the Dev Dashboard</h1>
            <h2>Click on a component below to render it on its own route.</h2>

            <ul style={{ textAlign: "left", marginLeft: "200px" }} >
                {listRoutes(devRoutes)}
            </ul>

            <br />
            <a href="/admin">Leave -- to Admin Dashboard</a>
            <br />
            <br />
            <a href="/app">Leave--to Landing Page</a>
            <br />
            <br />

            
        </>
    );
}

export default DevDashboard;