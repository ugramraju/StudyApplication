import React, { useState } from "react";
import axios from "axios";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://studyapplication.onrender.com/api/teacher/forgot-password", { email });
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
      <h1 style={{fontSize:"1.5em"}}>Forgot Password</h1>
      <form onSubmit={handleForgotPassword}>
      {errorMsg && <p id="errMsg-1" style={{color:"red"}}>{errorMsg}</p>}
      {successMsg && <p id="errmessage" style={{color:"green"}}>{successMsg}</p>}
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
