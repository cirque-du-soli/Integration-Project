import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import BackgroundImg from "../../assets/bg.jpg";

function Login({ props }) {

  const history = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // authState
  const { authState } = useContext(AuthContext);
  const { setAuthState } = useContext(AuthContext);
  const { userState } = useContext(AuthContext);
  const { adminState } = useContext(AuthContext);

  // init login state and check
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // if user is already authorized send to menu
  useEffect(() => {
    if (authState) {
      setIsLoggedIn(true);
      history("/app/home", { state: { id: userState } });
    }
  }, [authState]);

  async function handleSubmit(e) {
    e.preventDefault();

    const baseUrl = process.env.REACT_APP_API_BASE_URL;

    try {
      const response = await axios.post(`${baseUrl}/auth`, {
        username,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("accessToken", response.data);
        setAuthState(true);
        history("/app/home", { state: { id: username } });
      } else if (response.data === "notexist") {
        alert("User has not signed up");
      }
    } catch (error) {
      console.error(error);
      alert("Wrong details");
    }
  }

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: `url(${BackgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-md w-full bg-white bg-opacity-50 rounded-lg shadow-lg p-8">
          <div>
            <h1 className="text-center text-3xl font-bold text-gray-900">
              Login to Your Account
            </h1>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Username"
              required
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm mt-3"
              placeholder="Password"
              required
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="inline-block py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="text-center mt-3">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/app/register"
                className="font-medium text-primary-500 hover:text-primary-700"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>

    </>
  );
}

export default Login;
