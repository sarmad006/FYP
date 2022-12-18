import React, { Component } from "react";
import Nav from "./Nav";
import "./register.css"

class RegisterComponent extends Component
{
    render()
    {
        return(
            <div>
                <Nav />
                <div id="reg_desc">
                    <span class="reg_desc_span">Thankyou for choosing us , You're just one step away from becoming part of a</span>
                    <span class="reg_desc_span">Global Network , Where all the magic happens ,</span>
                    <span class="reg_desc_span">LETS GO !</span>
                </div>
                <form action="" id="reg_input">
                    <span id="reg_input_first_span">
                        Kindly Enter your Hospital Details
                    </span>
                    <span id="reg_input_box">
                        <span className="reg_input_upper_box">
                            <label htmlFor="">Name</label>
                            <input type="text" />
                        </span>
                        <span className="reg_input_lower_box">
                            <label htmlFor="">MetaMask Address</label>
                            <input type="text" />
                        </span>
                    </span>
                    <span id="reg_input_box">
                        <span className="reg_input_upper_box">
                            <label htmlFor="">Country</label>
                            <input type="text" />
                        </span>
                        <span className="reg_input_lower_box">
                            <label htmlFor="">Department</label>
                            <input type="text" />
                        </span>
                    </span>
                    <span id="reg_input_box">
                        <span className="reg_input_upper_box">
                            <label htmlFor="">City</label>
                            <input type="text" />
                        </span>
                        <span className="reg_input_lower_box">
                            <label htmlFor="">Doctors</label>
                            <input type="text" />
                        </span>
                    </span>
                    <span id="reg_input_email">
                            <label htmlFor="">City</label>
                            <input type="text" />
                    </span>
                    <button>
                        NEXT
                    </button>
                </form>
            </div>
        )
    }
}
export default RegisterComponent;
