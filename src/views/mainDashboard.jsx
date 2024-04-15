// IMPORT: Routes
import mainRoutes from "../routes/mainRoutes.js";

function MainDashboard(props) {

    const listRoutes = (routes) => {
        return routes.map((prop, key) => {
            return (
                <li key={key}><a href={"/dev" + prop.path}>{prop.name}</a></li>
            );
        });
    };

    return (
        <>
            <h1>MAIN DASHBOARD</h1>

            <ul style={{ textAlign: "left", marginLeft: "200px" }} >
                {listRoutes(mainRoutes)}
            </ul>

            <br />
            <a href="/admin">Leave -- to Admin Dashboard</a>
            <br />
            <br />
            <a href="/app">Leave--to Landing Page</a>
            <br />

        </>
    );
}

export default MainDashboard;