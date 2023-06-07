import React, { useState, useEffect, useRef } from "react";
import "./header.css";
import { FaUserCircle } from "react-icons/fa";
import { CloudinaryContext, Image } from "cloudinary-react";
import { AiFillApple } from "react-icons/ai";

const Header = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    setShowLogout(!showLogout);
    fileInputRef.current.click();
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profileImage");
    window.location.href = "/";
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // Replace with your actual upload preset name

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/da5ptw96m/image/upload", // Replace "your_cloud_name" with your actual Cloudinary cloud name
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setSelectedImage(data.secure_url);
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
    }
  };

  const [userData, setUserData] = useState({
    profileImage: localStorage.getItem("profileImage") || null,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("https://studyapplication.onrender.com/api/teacher/profile", {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        if (data.message) {
          console.log(data.message);
        } else {
          setUserData(data);
          if (data.profileImage) {
            setSelectedImage(data.profileImage);
            localStorage.setItem("profileImage", data.profileImage);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <section className="icons-container">
      <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <AiFillApple size="20%" color="#64A1F5" /> Logo
      </h1>

      <section className="vender-box">
        {userData && <div>{userData.name}</div>}
        <CloudinaryContext cloudName="da5ptw96m"> {/* Replace "your_cloud_name" with your actual Cloudinary cloud name */}
          {selectedImage ? (
            <Image
            publicId={selectedImage}
            onClick={handleAvatarClick}
            style={{ cursor: "pointer" }}
            width="35"
            height="35"
            secure={true}
            alt="Profile Image"
          />
          
          ) : (
            <FaUserCircle
              onClick={handleAvatarClick}
              style={{ cursor: "pointer" }}
              size={35}
            />
          )}
        </CloudinaryContext>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageUpload}
          ref={fileInputRef}
        />
        {showLogout && (
          <button
            style={{
              marginLeft: "10px",
              marginTop: "25px",
              height: "25px",
              width: "55px",
              backgroundColor: "skyblue",
              borderRadius: "4px",
              border: "0px solid",
            }}
            onClick={handleLogoutClick}
          >
            Logout
          </button>
        )}
      </section>
    </section>
  );
};

export default Header;
