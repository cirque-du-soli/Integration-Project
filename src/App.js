// import './App.css'
import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./components/home";
import Login from "./components/login";
import Regi from "./components/regi";
import { AuthContext } from "./components/shared/authContext";
import Settings from "./components/UserSettings";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/tailwind.css";

function App() {
  //check if logged in
  const [authState, setAuthState] = useState(false);
  const [userState, setUserState] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/auth`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
          console.log(response.data);
          setUserState(response.data);

          setAuthState(true);
        }
      });
  }, [localStorage.getItem("accessToken")]);

  return (
    <div className="App">
      <AuthContext.Provider
        value={{ authState, setAuthState, userState, setUserState }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/regi" element={<Regi />} />
            <Route path="/home" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
