import React, { useState } from "react";
import classes from "./home.module.css";
import Freezbe from "../../compopnents/freezbe/freezbe";
import Ingredients from "../../compopnents/ingreedients/ingredients";
import Procedures from "../../compopnents/procedures/procedures";
import User from "../../compopnents/user/user";


export default function Home() {
  // State to track the active component
  const [activeComponent, setActiveComponent] = useState("Ingredients");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  
  // Define the handleLogout function
  const handleLogout = () => {
    // Clear user info from localStorage (if needed)
    localStorage.removeItem("userInfo");

// Redirect to the "/entry" page
window.location.href = '/';  };

  // Function to set the active component
  const setActive = (component) => {
    setActiveComponent(component);
  };
  const isSuperAdmin = userInfo && userInfo.role === "superadmin";

  return (
    <>
      <div className={classes.landingPage}>
        <h1>Model table management</h1>
        <div className={classes.titles}>
          <div
            className={`${classes.msCard} ${
              activeComponent === "Ingredients" ? classes.active : ""
            }`}
            onClick={() => setActive("Ingredients")}
          >
            MS - Ingredients
          </div>
          <div
            className={`${classes.msCard} ${
              activeComponent === "Procedures" ? classes.active : ""
            }`}
            onClick={() => setActive("Procedures")}
          >
            MS - Procedures
          </div>
          <div
            className={`${classes.msCard} ${
              activeComponent === "Freezbe" ? classes.active : ""
            }`}
            onClick={() => setActive("Freezbe")}
          >
            MS - Freezbe
          </div>
          {userInfo?.role === "superadmin" && (
            <div
              className={`${classes.msCard} ${
                activeComponent === "User" ? classes.active : ""
              }`}
              onClick={() => setActive("User")}
            >
              MS - Users
            </div>
          )}
        </div>
        {activeComponent === "Freezbe" && <Freezbe />}
        {activeComponent === "Ingredients" && <Ingredients />}
        {activeComponent === "Procedures" && <Procedures />}
        {userInfo?.role === "superadmin" && activeComponent === "User" && (
          <User />
        )}
      </div>
      <a
        href="#"
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '10px',
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'white', // Initial color
        }}
        onMouseEnter={(e) => (e.target.style.color = 'yellow')} // Color on hover
        onMouseLeave={(e) => (e.target.style.color = 'white')} // Color on hover out
        onClick={handleLogout} // Call the handleLogout function on click
      >
        <i className="fas fa-sign-out-alt" style={{ marginRight: '5px' }}></i>
        Logout
      </a>
    </>
  );
}