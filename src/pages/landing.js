import React from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import backgroundImage from "../assets/hero.jpg";
import logo from "../assets/ProjecTile-Logo-Icon-TransparentBG.png";

const Landing = () => {
  const logoAnimation = useSpring({
    width: "200px", // Adjust the initial width
    from: { width: "300px" }, // Adjust the final width
  });

  const welcomeAnimation = useSpring({
    from: { transform: "translateX(-100%)" },
    to: { transform: "translateX(0%)" },
    config: { duration: 1000 },
  });

  return (
    <div className="Landing bg-white">
      <section
        className="hero bg-cover bg-center py-16 md:py-24 lg:py-32 relative"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="container mx-auto text-center text-teal-600">
          <animated.img
            src={logo}
            alt="Logo"
            className="mx-auto mb-4 md:mb-6 lg:mb-8"
            style={logoAnimation}
          />
          <animated.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-2 md:mb-4 lg:mb-6"
            style={welcomeAnimation}
          >
            Welcome to Projectile
          </animated.h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 lg:mb-8">
            Organize your tasks and projects in an easy and efficient way.
          </p>
          <div className="flex justify-center">
            <Link
              to="/login" 
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 md:py-3 md:px-8 lg:py-4 lg:px-10 rounded mr-4"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 md:py-3 md:px-8 lg:py-4 lg:px-10 rounded"
            >
              Register
            </Link>
          </div>
        </div>
      </section>
      <main className="container mx-auto mt-8 mb-16">
        <section className="features mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-300 to-pink-300 rounded-lg shadow-md p-6">
              <p className="text-lg md:text-xl lg:text-2xl mb-2">
                Easy drag and drop task management
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-300 to-green-300 rounded-lg shadow-md p-6">
              <p className="text-lg md:text-xl lg:text-2xl mb-2">
                Customizable project organization
              </p>
            </div>
            <div className="bg-gradient-to-br from-yellow-300 to-orange-300 rounded-lg shadow-md p-6">
              <p className="text-lg md:text-xl lg:text-2xl mb-2">
                Comprehensive activity tracking
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-300 to-purple-300 rounded-lg shadow-md p-6">
              <p className="text-lg md:text-xl lg:text-2xl mb-2">
                Real-time updates for collaboration
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-300 to-yellow-300 rounded-lg shadow-md p-6">
              <p className="text-lg md:text-xl lg:text-2xl mb-2">
                Automatic deadline reminders
              </p>
            </div>
            <div className="bg-gradient-to-br from-pink-300 to-red-300 rounded-lg shadow-md p-6">
              <p className="text-lg md:text-xl lg:text-2xl mb-2">
                Integrated chat for streamlined communication
              </p>
            </div>
          </div>
        </section>
        <section className="get-started bg-gray-100 py-12 md:py-16 lg:py-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800">
            Get Started
          </h2>
          <p className="text-base md:text-lg lg:text-xl mb-4 md:mb-6 lg:mb-8 text-gray-700">
            Sign up for free to start organizing your tasks today.
          </p>
          <Link
            to="/register"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 md:py-4 md:px-10 lg:py-5 lg:px-12 rounded shadow-md transition duration-300 ease-in-out"
          >
            Sign Up Now
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Landing;
