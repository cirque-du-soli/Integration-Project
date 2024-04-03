import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Registration() {
  const history = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:3001/regi", {
          username,
          password,
        })
        .then((res) => {
          if (res.data == "exist") {
            alert("User already exists");
          } else if (res.data == "notexist") {
            history("/home", { state: { id: username } });
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="login">
      <h1>Register</h1>

      <form action="POST">
        <input
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="Username"
        />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
        <input type="submit" onClick={submit} />
      </form>

      <br />
      <br />

      <Link to="/">Already have an account? Login here!</Link>
    </div>
  );
}

export default Registration;
