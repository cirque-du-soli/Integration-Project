import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, Navigate } from "react-router-dom";
import BackgroundImg from "../../assets/bg.jpg";
import { validatePassword } from "../../util/fe-validations/validatePassword";
import { newToastMessage } from '../../components/customToast';
import { AuthContext } from "../../contexts/authContext";

function Registration() {

  const history = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  // authState
  const { authState } = useContext(AuthContext);
  const { userState } = useContext(AuthContext);
  const userAuthContext = useContext(AuthContext);

  // init login state and check
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handlePasswordValidation = (value) => {
    const validationMessage = validatePassword(value);
    if (validationMessage !== "") {
      setPasswordErrorMsg(validationMessage);
    } else {
      setPasswordErrorMsg("");
    }
  };


  async function submit(e) {

    e.preventDefault();
    const baseUrl = process.env.REACT_APP_API_BASE_URL;

    if (passwordErrorMsg === "") {
      try {
        const response = await axios.post(`${baseUrl}/auth/regi`, {
          username,
          email,
          password,
        });

        if (response.data === "exist") {
          newToastMessage("error", "Username already exists. Try Again.");
        } else if (response.data === "success") {
          history("/login", { state: { id: username } });
        }
      } catch (error) {
        //console.error(error);
        newToastMessage("error", "Registration Error. Try Again.");
      }
    }
  }

// handle if user is already logged in and/or banned or deleted
  if (userAuthContext.authState === true) {
    if (userAuthContext.userDeletedState === true || userAuthContext.userBannedState === true) {
      // log user out if banned or deleted, and on the registration page
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");
      userAuthContext.setAuthState(null);
      userAuthContext.setUserState(null);
      userAuthContext.setUserAdminState(null);
      userAuthContext.setUserDeletedState(null);
      userAuthContext.setUserBannedState(null);
      newToastMessage("error", "User is banned or deleted. Please register a new account.");
      // then continue rendering
    } else {
      // user is logged in -- redirect to user homepage
      return <Navigate to="/app/home" />;
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
              Register an Account
            </h1>
          </div>
          <form className="mt-8 space-y-6" onSubmit={submit}>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Username"
              required
            />
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm mt-3"
              placeholder="Email"
              required
            />
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
                handlePasswordValidation(e.target.value);
              }}
              value={password}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm mt-3"
              placeholder="Password"
              required
            />
            {passwordErrorMsg && (
              <span className="text-red-600">{passwordErrorMsg}</span>
            )}
            <div className="flex justify-center">
              <button
                type="submit"
                className="inline-block py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all"
              >
                Register
              </button>
            </div>
          </form>
          <div className="text-center mt-3">
            <p className="text-sm text-gray-600">
              Already have an account?
              <Link
                to="/login"
                className="font-medium text-primary-500 hover:text-primary-700"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registration;
