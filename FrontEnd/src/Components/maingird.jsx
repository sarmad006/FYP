import React, { Component } from "react";
import "./maingird.css";
class counter extends Component {
  render() {
    return (
      <div>
        <nav id="Maingird-nav">
          <a href="blank" className="top_Nav_Span_Left">
            Home
          </a>
          <a
            href="blank"
            className="top_Nav_Span_Left"
            style={{ color: "#e2b04d" }}
          >
            Login with Metamask
          </a>
          <span className="top_Nav_Span_Middle">D E D O C</span>
          <a href="blank" className="top_Nav_Span_Right">
            Register
          </a>
          <a href="blank" className="top_Nav_Span_Right">
            Contact Us
          </a>
          <a href="blank" className="top_Nav_Span_Right">
            About
          </a>
          <span className="top_Nav_Span_Right">
            <img src="" alt="Image1" />
          </span>
        </nav>
        <div id="dedocSpansDiv">DEDOC</div>
        <span id="decentralizedDoctors">Decentralized Doctors</span>
        <div id="lowerBody">
          <span id="lowerleftSpanOfLowerBody">
            <span className="lowerParagraphUpper">
              DEDOC uses AI to find the right treatment for every patient
            </span>
            <p className="lowerParagraphLower">
              The future of collaboration starts here
            </p>
          </span>
          <span id="lowerMiddleSpanOfLowerBody">
            <img src="" alt="image2" />
          </span>
          <span id="lowerRightSpanOfLowerBody">
            <p className="lowerParagraphUpper">
              We use Federated Learning to train Machine Learning Models.
            </p>
            <p className="lowerParagraphLower">
              Patients Data remains secure
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              and safe always.
            </p>
          </span>
        </div>
        <button>Register</button>
      </div>
    );
  }
}

export default counter;
