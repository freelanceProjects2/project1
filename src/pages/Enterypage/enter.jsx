import React from "react";
import "./enter.css"; // CSS file for styling
import { Link } from "react-router-dom";

export default function Enter() {
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
        <Link to="/Home" className="custom-button">
          Enter{" "}
        </Link>
      </div>
    </div>
  );
}
