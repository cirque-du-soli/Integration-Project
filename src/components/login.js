import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const history = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    const baseUrl = process.env.REACT_APP_API_BASE_URL;

    try {
      const response = await axios.post(`${baseUrl}/auth`, {
        username,
        password,
      });

      if (response.data === "success") {
        history("/home", { state: { id: username } });
      } else if (response.data === "notexist") {
        alert("User has not signed up");
      }
    } catch (error) {
      console.error(error);
      alert("Wrong details");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-bold text-gray-900">Login to Your Account</h1>
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
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm mt-3"
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Sign in
          </button>
        </form>
        <div className="text-center mt-3">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/regi" className="font-medium text-primary-500 hover:text-primary-700">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
