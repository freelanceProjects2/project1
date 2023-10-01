import React, { useState } from "react";
import classes from "./home.module.css";
import Freezbe from "../../compopnents/freezbe/freezbe";
import Ingredients from "../../compopnents/ingreedients/ingredients";
import Procedures from "../../compopnents/procedures/procedures";

function Home() {
  // State to track the active component
  const [activeComponent, setActiveComponent] = useState("Freezbe");

  // Function to set the active component
  const setActive = (component) => {
    setActiveComponent(component);
  };

  return (
    <>
      <div className={classes.landingPage}>
        <h1>Model table management</h1>
        <div className={classes.titles}>
          <div
            className={`${classes.msCard} ${
              activeComponent === "Freezbe" ? classes.active : ""
            }`}
            onClick={() => setActive("Freezbe")}
          >
            MS - Freezbe
          </div>
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
        </div>
        {activeComponent === "Freezbe" && <Freezbe />}
        {activeComponent === "Ingredients" && <Ingredients />}
        {activeComponent === "Procedures" && <Procedures />}
      </div>
    </>
  );
}

export default Home;
