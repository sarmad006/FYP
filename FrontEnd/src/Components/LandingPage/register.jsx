import React, { Component } from "react";
import Nav from "./Nav";
import "./register.css";
import metaContext from "../../context/metaContext";
import { useContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import { abi } from "../../Contracts/abi";
import axios from "axios";

const RegisterComponent = () => {
  const API_KEY = "c303a8d05f40b047e81f";
  const API_Secret =
    "869916f5afead162492bf1d096a41082e189f911afc0e007b9f2feee7a56abc5";
  const JWT_token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxZWY5NzU1Yy02NjNjLTRkMDUtYTY1NS1kNjRmZjFlOGM2YWIiLCJlbWFpbCI6ImtoaXplcmppbGFuaUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZDRlMzlkMzhhODgyOTVkNWJiMDkiLCJzY29wZWRLZXlTZWNyZXQiOiJlYjAzZDhlZTM4NDRiZDIwN2RiYzg3MDQ5M2FlMjlmMmE2NmMwZTEyMzU0MGIxZWIzNjU3MmZhMGNhMGJkNDUyIiwiaWF0IjoxNjc4MTk5MDg1fQ.2CJ7itaFc-K8VX7GbQqiu1VzSkrh68O3TfYH2IwJY8M";
  const [add, setAdd] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    city: "",
    department: "",
    doctors: "",
  });
  const con = useContext(metaContext);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      fetchAddress();
      window.ethereum.on("accountsChanged", function (accounts) {
        getAccount();
      });
      console.log("hello");
    }
  }, [add]);

  const fetchAddress = async () => {
    await con.accountSet();
    setAdd(con.acn.address);
  };

  async function getAccount() {
    const accounts = await window.ethereum.enable();
    window.location.reload(false);
    // do something with new account here
  }
  async function registerHospital() {
    var f = new File([""], "hospitalOne.txt", { type: "text/plain" });
    let formdata = new FormData();
    formdata.append("file", f);
    try {
      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formdata,
        headers: {
          pinata_api_key: API_KEY,
          pinata_secret_api_key: API_Secret,
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log(error);
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const Contract = new ethers.Contract(
      "0x850b6847086159d5d9031cD9ee41e4872557ef47",
      abi,
      signer
    );
    let tx;
    try {
      tx = await Contract.registerHospital(
        formData.name,
        formData.city,
        formData.email,
        formData.department,
        formData.doctors,
        add
      );
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  console.log(formData);

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
            <label id="reg_label" htmlFor="">
              Hospital Name
            </label>
            <input
              name="name"
              id="input_special"
              type="text"
              onChange={handleChange}
            />
          </span>
          <span className="reg_input_lower_box">
            <label id="reg_label" htmlFor="">
              Hospital wallet Address
            </label>
            <input
              id="input_special"
              type="text"
              defaultValue={add}
              readOnly
            ></input>
          </span>
        </span>
        <span id="reg_input_box">
          <span className="reg_input_upper_box">
            <label id="reg_label" htmlFor="">
              Country
            </label>
            <input
              id="input_special"
              type="text"
              name="country"
              onChange={handleChange}
            />
          </span>
          <span className="reg_input_lower_box">
            <label id="reg_label" htmlFor="">
              Phone Number
            </label>
            <input
              id="input_special"
              type="phone"
              name="phone"
              onChange={handleChange}
            />
          </span>
        </span>
        <span id="reg_input_box">
          <span className="reg_input_upper_box">
            <label id="reg_label" htmlFor="">
              Email
            </label>
            <input
              id="input_special"
              type="email"
              name="email"
              onChange={handleChange}
            />
          </span>
          {/* <span className="reg_input_lower_box">
            <label id="reg_label" htmlFor="">
              Doctors
            </label>
            <input
              id="input_special"
              type="number"
              name="doctors"
              onChange={handleChange}
            />
          </span> */}
        </span>
        <span id="reg_input_email">
          <label id="reg_label" htmlFor="">
            City
          </label>
          <input
            id="input_special"
            type="text"
            name="city"
            onChange={handleChange}
          />
        </span>
        <Link to="/thanks">
          <button
            id="btn_special"
            className="rounded-full bg-limgreen text-sm font-poppins drop-shadow-2xl tracking-widest w-1/7 btn_special"
            onClick={registerHospital}
          >
            NEXT
          </button>
        </Link>
      </form>
    </div>
  );
};

export default RegisterComponent;
