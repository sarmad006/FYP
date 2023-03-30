import React from "react";
import { useRef } from "react";
import Navbar from "../../Components/Navbar/index";
import "./registerHospital.css";
import metaContext from "../../context/metaContext";
import { useContext, useEffect, useState } from "react";
import emailjs from "emailjs-com";
import Loader from "../../Components/utils/Loader";
import Sidebar from "../../Components/Sidebar/index";
import { useSnackbar } from "react-simple-snackbar";
import { useNavigate } from "react-router-dom";

const RegisterHospital = () => {
  const location = useNavigate();
  const [openSnackbar, closeSnackbar] = useSnackbar();
  const form = useRef();
  const [isActive, setLoader] = useState(false);
  const [add, setAdd] = useState("");
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
  async function registerHospital(e) {
    setLoader(true);
    e.preventDefault();
    await emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_USER_ID
      )
      .then((result) => {
        console.log(result);
        setTimeout(() => {
          setLoader(false);
          openSnackbar(
            "Email has been sent to our directive will be shortly in touch with you"
          );
          location("/thanks");
        }, 500);
      })

      .catch((error) => {
        setTimeout(() => {
          setLoader(false);
          openSnackbar("Error occured please try again");
        }, 500);
        console.log(error);
      });
    setLoader(false);
  }

  return (
    <>
      {isActive && <Loader isActive={isActive} />}
      <div>
        <Navbar />
        <div className="grid grid-cols-12 mb-10">
          <Sidebar />

          <div className="col-span-11">
            <div className="">
              <form action="" id="reg_input_reg_hospital" ref={form}>
                <span
                  id="reg_input_first_span"
                  class="bg-gradient-to-r from-gradx1 to-gradx2 font-bold text-white py-1 text-2xl drop-shadow-2xl"
                >
                  Kindly Enter your Hospital Details
                </span>
                <span id="reg_input_box">
                  <span className="reg_input_upper_box">
                    <label id="reg_label" htmlFor="">
                      {" "}
                      Hospital Name{" "}
                    </label>
                    <input name="name" id="input_special" type="text" />
                  </span>
                  <span className="reg_input_lower_box">
                    <label id="reg_label" htmlFor="">
                      Hospital wallet Address
                    </label>
                    <input
                      id="input_special"
                      type="text"
                      name="address"
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
                    <input id="input_special" type="text" name="country" />
                  </span>
                  <span className="reg_input_lower_box">
                    <label id="reg_label" htmlFor="">
                      Phone Number
                    </label>
                    <input id="input_special" type="phone" name="phone" />
                  </span>
                </span>
                <span id="reg_input_box">
                  <span id="reg_input_upper_box">
                    <label id="reg_label" htmlFor="">
                      City
                    </label>
                    <input id="input_special" type="text" name="city" />
                  </span>
                  <span className="reg_input_lower_box">
                    <label id="reg_label" htmlFor="">
                      {" "}
                      Email
                    </label>
                    <input id="input_special" type="email" name="email" />
                  </span>
                </span>
                <button
                  id="btn_special"
                  className="rounded-full bg-limgreen text-sm font-poppins drop-shadow-2xl tracking-widest w-1/7 btn_special"
                  onClick={(e) => registerHospital(e)}
                >
                  NEXT
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterHospital;
