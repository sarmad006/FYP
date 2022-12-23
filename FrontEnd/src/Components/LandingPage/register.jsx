import React, { Component } from "react";
import Nav from "./Nav";
import "./register.css";
import { useWeb3React } from "@web3-react/core";
import { Link } from "react-router-dom";

const RegisterComponent = () => {
  return (
    <div>
      <Nav />
      <div id="reg_desc">
        <span class="reg_desc_span">
          Thankyou for choosing us , You're just one step away from becoming
          part of a
        </span>
        <span class="reg_desc_span">
          Global Network , Where all the magic happens ,
        </span>
        <span class="reg_desc_span">LETS GO !</span>
      </div>
      <form action="" id="reg_input">
        <span
          id="reg_input_first_span"
          class="bg-gradient-to-r from-gradx1 to-gradx2 font-bold text-white py-1 text-2xl drop-shadow-2xl"
        >
          Kindly Enter your Hospital Details
        </span>
        <span id="reg_input_box">
          <span className="reg_input_upper_box">
            <label htmlFor="">Name</label>
            <input id="input_special" type="text" />
          </span>
          <span className="reg_input_lower_box">
            <label htmlFor="">MetaMask Address</label>
            <input id="input_special" type="text" />
          </span>
        </span>
        <span id="reg_input_box">
          <span className="reg_input_upper_box">
            <label htmlFor="">Country</label>
            <input id="input_special" type="text" />
          </span>
          <span className="reg_input_lower_box">
            <label htmlFor="">Department</label>
            <input id="input_special" type="text" />
          </span>
        </span>
        <span id="reg_input_box">
          <span className="reg_input_upper_box">
            <label htmlFor="">Email</label>
            <input id="input_special" type="email" />
          </span>
          <span className="reg_input_lower_box">
            <label htmlFor="">Doctors</label>
            <input id="input_special" type="text" />
          </span>
        </span>
        <span id="reg_input_email">
          <label htmlFor="">City</label>
          <input id="input_special" type="text" />
        </span>
        <Link to="/thnx">
          <button id="btn_special"
            className="rounded-full bg-limgreen text-sm font-poppins drop-shadow-2xl tracking-widest w-1/7 btn_special"
          >
            NEXT
          </button>
        </Link>
      </form>
    </div>
  );
};

export default RegisterComponent;
