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
                <h1>Welcome to ProjecTile. The task managing app for <i>the best</i> teams.</h1>
                <br />
                <br />
                <a href="/app/register">Click here to <b>Sign up!</b></a>
                <br />
                <br />
                <p>Already a winning team member?</p>
                <a href="/app/login">Click here to <b>log in</b>.</a>
                <br />
                <br />
            </div>
            <Footer />
        </>
    );
}
export default landing;
