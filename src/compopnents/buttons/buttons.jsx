import React from "react";
import "./buttons.css";
import { Link } from "react-router-dom";
function Buttons() {
  return (
    <div className="buttons-head">
      <button>
        <Link to="/Home">Home </Link>

        <span class="first"></span>
        <span class="second"></span>
        <span class="third"></span>
        <span class="fourth"></span>
      </button>
      <button>
        Contact
        <span class="first"></span>
        <span class="second"></span>
        <span class="third"></span>
        <span class="fourth"></span>
      </button>
    </div>
  );
}

export default Buttons;
