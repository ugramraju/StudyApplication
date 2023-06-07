import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VenderSignup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.contact || !data.password || !data.confirmPassword) {
      setErrorMsg("Kindly fill in all the details");
      return;
    }

    if (data.password !== data.confirmPassword) {
      setErrorMsg("Password and Confirm Password do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/teacher/register", data);
      setData({});
      setErrorMsg("");
      setSuccessMsg("Registration successful. Please go and sign in.");
      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data === "User Already Exists") {
        setErrorMsg("User already exists. Please go and sign in.");
      } else {
        setErrorMsg("Registration failed");
      }
    }
  };

  return (
    <div className="box1">
      <span id="errMsg-1">{errorMsg}</span>
      <span id="errmessage">{successMsg}</span>
      <h1 style={{fontSize:"1.5em"}}>Register in your Account</h1>
      <form id="form">
        <input
          type="text"
          placeholder="Name"
          value={data.name || ""}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={data.email || ""}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          autoComplete="email"
        />
        <br />
        <input
          type="text"
          placeholder="Contact"
          value={data.contact || ""}
          onChange={(e) => setData({ ...data, contact: e.target.value })}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={data.password || ""}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          autoComplete="new-password"
        />
        <br />
        <input
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
  )
}
export default VenderSignup; 
