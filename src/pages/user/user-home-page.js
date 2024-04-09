import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbars/mainNavbar";
import Footer from "../../components/Navbars/footer";
import { AuthContext } from "../../contexts/authContext";

function Home() {
  const location = useLocation();
  const { userState } = useContext(AuthContext);

  return (
    <>
      <div className="homepage">
        <Navbar username={userState} />
        <h1>Hello {userState} and welcome to the home</h1>
      </div>

      <Footer />
    </>
  );
}

export default Home;
