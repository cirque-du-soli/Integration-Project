// import './App.css'
import Home from "./components/home";
import Login from "./components/login";
import Regi from "./components/regi";
import Navbar from "./components/shared/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar username="user" />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/regi" element={<Regi />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
