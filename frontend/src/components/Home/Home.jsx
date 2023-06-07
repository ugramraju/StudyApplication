import React, { useState } from "react";
import VendorLogin from "../vender/venderLogin"
import UserLogin from "../user/userLogin";
import VendorSignup from "../vender/venderSign";
import UserSignup from "../user/userSignUp";
import "./Home.css"
const Home = () => {
  const [showVendorLogin, setShowVendorLogin] = useState(true);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [showVendorSignup, setShowVendorSignup] = useState(false);
  const [showUserSignup, setShowUserSignup] = useState(false);

  const handleVendorClick = () => {
    setShowVendorLogin(true);
    setShowUserLogin(false);
    setShowVendorSignup(false);
    setShowUserSignup(false);
  };

  const handleUserClick = () => {
    setShowVendorLogin(false);
    setShowUserLogin(true);
    setShowVendorSignup(false);
    setShowUserSignup(false);
  };

  const handleVendorSignupClick = () => {
    setShowVendorLogin(false);
    setShowUserLogin(false);
    setShowVendorSignup(true);
    setShowUserSignup(false);
  };

  const handleUserSignupClick = () => {
    setShowVendorLogin(false);
    setShowUserLogin(false);
    setShowVendorSignup(false);
    setShowUserSignup(true);
  };

  return (
    <div className="home_container">
      <h1 className="heading_home_box">TEACHERS & STUDENT APP</h1>

      <div className="home_login_signup_container">
        <div className="home_btn_container">
          <button
            onClick={handleVendorClick}
            className={showVendorLogin ? "active" : ""}
          >
            Teacher
          </button>
          <button
            onClick={handleUserClick}
            className={showUserLogin ? "active" : ""}
          >
            Student
          </button>
        </div>

        {showVendorLogin && (
          <>
            <VendorLogin />
            {!showVendorSignup && (
              <div
                className="createAccount"
                onClick={handleVendorSignupClick}
              >
                Create Account
              </div>
            )}
          </>
        )}

        {showUserLogin && (
          <>
            <UserLogin />
            {!showUserSignup && (
              <div className="createAccount" onClick={handleUserSignupClick}>
                Create Account
              </div>
            )}
          </>
        )}

        {showVendorSignup && (
          <>
            <VendorSignup />
            <div className="createAccount" onClick={handleVendorClick}>
              SignIn
            </div>
          </>
        )}

        {showUserSignup && (
          <>
            <UserSignup />
            <div className="createAccount" onClick={handleUserClick}>
              SignIn
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
