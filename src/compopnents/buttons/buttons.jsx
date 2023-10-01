import React from "react";
import "./buttons.css";
import { Link } from "react-router-dom";
function Buttons() {
  return (
    <div className="buttons-head">
      <Link to="/"> <button>
       Home

        <span class="first"></span>
        <span class="second"></span>
        <span class="third"></span>
        <span class="fourth"></span>
      </button> </Link>
      <Link to="/contact-us"> <button>
        Contact
        <span class="first"></span>
        <span class="second"></span>
        <span class="third"></span>
        <span class="fourth"></span>
      </button></Link>
    </div>
  );
}

export default Buttons;
