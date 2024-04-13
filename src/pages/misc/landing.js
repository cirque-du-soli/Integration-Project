import Footer from '../../components/navbars/footer';

function landing() {
    // const location = useLocation();

    return (
        <>
            <div className="landingPage">
                <h1>This is the landing page</h1>
                <h2>It is a work in progress</h2>
                <br />
                <br />
                <h1>Welcome to ProjecTile. The task managing app for <b>the best</b> teams.</h1>
                <br />
                <br />
                <a href="/regi">Click here to Sign up!</a>
                <br />
                <br />
                <p>Already a winning team member? <a href="/app/login">Click here to log in.</a></p>
                <br />
                <br />
            </div>
            <Footer />
        </>
    );
}
export default landing;
