import React, { useState } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.contact || !data.password) {
      setErrorMsg("Kindly fill in all the details");
      return;
    }

    axios
      .post("https://studyapplication.onrender.com/api/student/login", data)
      .then((res) => {
        setData({});
        setErrorMsg("");
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          navigate("/displayAllProposals");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.data.msg === "User Not Found") {
          setErrorMsg("User not found");
        } else if (error.response.data.msg === "Invalid Credentials") {
          setErrorMsg("Invalid credentials");
        } else {
          setErrorMsg("Login failed");
        }
      });
  };

  return (
    <div className="box1">
      <span id="errMsg-1" style={{color:"red"}}>{errorMsg}</span>
      <h1 style={{fontSize:"1.5em"}}>Sign in your Account</h1>
      <form id="form">
        <input
        id="name"
          type="text"
          name="name"
          placeholder="Email / Contact"
          value={data.contact || data.email || ""}
          onChange={(e) => {
            const value = e.target.value;
            setData({ ...data, contact: value, email: value });
          }}
        />
        <br />
        <input
        id="password"
        name="password"
          type="password"
          placeholder="Password"
          value={data.password || ""}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          autoComplete="current-password"
        />
      </form>
      <button type="submit" id="btn" onClick={handleSubmit} className="login_register_btn">
          LOGIN
        </button>
    </div>
  );
};

export default UserLogin;
