import React, { useEffect, useState } from "react";
import styles from "./maingrid.css";
import Nav from "./Nav";

const LandingComponent = () => {
  return (
    <>
      <div>
        <Nav />
        <div id="combine" class="xl:ml-60">
          <div id="dedocSpansDiv">DEDOC</div>
          <span id="decentralizedDoctors">Decentralized Doctors</span>
        </div>
        <div id="lowerBody">
          <span id="lowerleftSpanOfLowerBody">
            <span className="lowerParagraphUpper">
              DEDOC uses AI to find the right treatment for every<br></br>
              patient
            </span>
            <p className="lowerParagraphLower">
              The future of collaboration starts here
            </p>
          </span>
          <span id="lowerMiddleSpanOfLowerBody">
            <img
              src="./image/lock.svg"
              style={{ height: "250px", width: "250px" }}
              alt="MetaMask pic 2"
            />
          </span>
          <span id="lowerRightSpanOfLowerBody">
            <p className="lowerParagraphUpper">
              We use Federated Learning to train Machine Learning <br></br>
              Models.
            </p>
            <p className="lowerParagraphLower">
              Patients Data remains secure <br></br>and safe always.
              {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
            </p>
          </span>
        </div>
        <button id="btnMainGrid">REGISTER</button>
      </div>
    </>
  );
};

export default LandingComponent;
