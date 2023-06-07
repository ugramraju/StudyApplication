import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserSignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.contact || !data.password || !data.confirmPassword) {
      setErrorMsg("Kindly fill in all the details");
      return;
    }

    if (data.password !== data.confirmPassword) {
      setErrorMsg("Password and Confirm Password do not match");
      return;
    }

    axios
      .post("https://studyapplication.onrender.com/api/student/register", data)
      .then((res) => {
        setData({});
        setErrorMsg("");
        setSuccessMsg("Registration successful. Please go and sign in.");
        if (res.status === 201) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.data === "User Already Exists") {
          setErrorMsg("User already exists. Please go and sign in.");
        } else {
          setErrorMsg("Registration failed");
        }
      });
  };

  return (
    <div className="box1">
      <span id="errMsg-1" style={{color:"red"}}>{errorMsg}</span>
      <span id="errmessage" style={{color:"green"}}>{successMsg}</span>
      <h1 style={{fontSize:"1.5em"}}>Register in your Account</h1>
      <form id="form">
        <input
        id="name"
          type="text"
          placeholder="Name"
          value={data.name || ""}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <br />
        <input
        id="email"
          type="email"
          placeholder="Email"
          value={data.email || ""}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          autoComplete="email"
        />
        <br />
        <input
        id="contact"
          type="text"
          placeholder="Contact"
          value={data.contact || ""}
          onChange={(e) => setData({ ...data, contact: e.target.value })}
        />
        <br />
        <input
        id="password"
          type="password"
          placeholder="Password"
          value={data.password || ""}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          autoComplete="new-password"
        />
        <br />
        <input
        id="confirmpassword"
          type="password"
          placeholder="Confirm Password"
          value={data.confirmPassword || ""}
          onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
          autoComplete="new-password"
        />
        <br />
        <button type="submit" id="btn" onClick={handleSubmit} className="login_register_btn">
          REGISTER
        </button>
      </form>
    </div>
  );
};

export default UserSignUp;
