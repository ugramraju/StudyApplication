import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://studyapplication.onrender.com/api/forgot-password", { email });
      setErrorMsg("");
      setSuccessMsg("Password reset email sent");
    } catch (error) {
      console.error(error.response.data);
      setErrorMsg("Failed to send reset email");
      setSuccessMsg("");
    }
  };

  return (
    <>
      <form onSubmit={handleForgotPassword}>
      {errorMsg && <p>{errorMsg}</p>}
      {successMsg && <p>{successMsg}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <button className="login_register_btn" type="submit">Reset Password</button>
      </form>
    </>
  );
};

export default ForgotPassword;
