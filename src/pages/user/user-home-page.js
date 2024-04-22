import React, { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Navbar from "../../components/navbars/mainNavbar";
import { AuthContext } from "../../contexts/authContext";
import backgroundImage from "../../assets/hero.jpg";
import LoadingSpinner from "../loadingSpinner/loadingSpinner.jsx";

function Home() {
  const location = useLocation();
  const { userState, authState } = useContext(AuthContext);

  return (
    <>
      {
        authState
          ?
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <section
              className="hero bg-cover bg-center py-32 md:py-48 lg:py-64 relative flex-1"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            >
              <div className="container mx-auto text-center text-gray-900">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 lg:mb-6">
                  Hello {userState} and welcome back!
                </h1>
              </div>
            </section>
          </div>
          :
          !(userState === null || userState === undefined || userState === "")
            ?
            < Navigate to="/app/login" replace />
            :
            <LoadingSpinner />
      }
    </>
  );
}

export default Home;
