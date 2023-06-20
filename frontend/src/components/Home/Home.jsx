import React, { useState } from "react";
import VendorLogin from "../vender/venderLogin";
import UserLogin from "../user/userLogin";
import VendorSignup from "../vender/venderSign";
import UserSignup from "../user/userSignUp";
import ForgotPassword from "../user/ForgotPassword";
import ForgotPasswordTeacher from "../vender/ForgotPassword";
import "./Home.css";

const Home = () => {
  const [showVendorLogin, setShowVendorLogin] = useState(true);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [showVendorSignup, setShowVendorSignup] = useState(false);
  const [showUserSignup, setShowUserSignup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showForgotPasswordTeacher, setShowForgotPasswordTeacher] = useState(false);

  const handleVendorClick = () => {
    setShowVendorLogin(true);
    setShowUserLogin(false);
    setShowVendorSignup(false);
    setShowUserSignup(false);
    setShowForgotPassword(false);
    setShowForgotPasswordTeacher(false);
  };

  const handleUserClick = () => {
    setShowVendorLogin(false);
    setShowUserLogin(true);
    setShowVendorSignup(false);
    setShowUserSignup(false);
    setShowForgotPassword(false);
    setShowForgotPasswordTeacher(false);
  };

  const handleVendorSignupClick = () => {
    setShowVendorLogin(false);
    setShowUserLogin(false);
    setShowVendorSignup(true);
    setShowUserSignup(false);
    setShowForgotPassword(false);
    setShowForgotPasswordTeacher(false);
  };

  const handleUserSignupClick = () => {
    setShowVendorLogin(false);
    setShowUserLogin(false);
    setShowVendorSignup(false);
    setShowUserSignup(true);
    setShowForgotPassword(false);
    setShowForgotPasswordTeacher(false);
  };

  const handleForgotPasswordClick = () => {
    setShowVendorLogin(false);
    setShowUserLogin(false);
    setShowVendorSignup(false);
    setShowUserSignup(false);
    setShowForgotPassword(true);
    setShowForgotPasswordTeacher(false);
  };

  const handleForgotPasswordTeacherClick = () => {
    setShowVendorLogin(false);
    setShowUserLogin(false);
    setShowVendorSignup(false);
    setShowUserSignup(false);
    setShowForgotPassword(false);
    setShowForgotPasswordTeacher(true);
  };

  return (
    <div className="home_container">
      <h1 className="heading_home_box">TEACHERS & STUDENT APP</h1>

      <div className="home_login_signup_container">
        <div className="home_btn_container">
          <button
            onClick={handleVendorClick}
            className={`${showVendorLogin ? "active" : ""} ${
              showForgotPasswordTeacher ? "highlight" : ""
            }`}
          >
            Teacher
          </button>
          <button
            onClick={handleUserClick}
            className={`${showUserLogin ? "active" : ""} ${
              showForgotPassword ? "highlight" : ""
            }`}
          >
            Student
          </button>
        </div>

        {showVendorLogin && (
          <>
            <VendorLogin />
            <div
              className={`forgotPassword ${
                showForgotPasswordTeacher ? "highlight" : ""
              }`}
              onClick={handleForgotPasswordTeacherClick}
            >
              Forgot Password?
            </div>
            {!showVendorSignup && (
              <div className="createAccount" onClick={handleVendorSignupClick}>
                Create Account
              </div>
            )}
          </>
        )}

        {showUserLogin && (
          <>
            <UserLogin />
            <div
              className={`forgotPassword ${
                showForgotPassword ? "highlight" : ""
              }`}
              onClick={handleForgotPasswordClick}
            >
              Forgot Password?
            </div>
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

        {showForgotPassword && (
          <>
            <ForgotPassword />
            <div className="createAccount" onClick={handleUserClick}>
              SignIn
            </div>
          </>
        )}

        {showForgotPasswordTeacher && (
          <>
            <ForgotPasswordTeacher />
            <div className="createAccount" onClick={handleVendorClick}>
              SignIn
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
