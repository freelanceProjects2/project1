import React from "react";
import "./enter.css"; // CSS file for styling
import { Link } from "react-router-dom";

export default function Enter() {
  // Check if 'userInfo' exists in localStorage
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className="container-bee">
      <div className="left-container">
        <div className="title-bee">
          <h1
            className="title-bee"
            style={{ fontWeight: "normal", fontSize: "64px" }}
          >
            KillerBee
          </h1>
          <p>"Safeguarding Excellence, Digitizing Precision"</p>
        </div>
      </div>

      <div className="right-container">
        {userInfo ? (
          // If 'userInfo' exists, render a link to "Home"
          <Link to="/home" className="custom-button">
            Enter
          </Link>
        ) : (
          // If 'userInfo' doesn't exist, render a link to "Login"
          <Link to="/login" className="custom-button">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
