import Navbar from "../../Components/Navbar";
import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";
import "./PatientEntry.css";
const PatientEntry = () => {
  const [Input, setInput] = useState([
    {
      label: "First Name",
    },
    {
      label: "Last Name",
    },
    {
      label: "Age",
    },
    {
      label: "Gender",
    },
    {
      label: "Weight",
    },
    {
      label: "Heart Rate",
    },
    {
      label: "Blood Pressure",
    },
    {
      label: "Oxygen Level",
    },
    {
      label: "Temperature",
    },
  ]);

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-12 mb-10 ">
        <Sidebar />
        <div className="col-span-10">
          <div className="flex justify-center ">
            <h1 className="bg-purple text-white text-2xl font-bold rounded-full font-poppins mr-2 py-1 px-12 rounded-2xl tracking-widest">
              Patient Entry
            </h1>
          </div>
          <div className="Main ">
            <form action="" id="" className="grid grid-cols-3 gap-y-4 ">
              {Input.map((item) => (
                <span id="reg_input_box">
                  <span className="reg_input_upper_box">
                    <label id="pat_label" htmlFor="">
                      {item.label}
                    </label>
                    <input id="input_special" type="text" />
                  </span>
                </span>
              ))}
            </form>
            <div className="flex justify-between pl-16 pr-8 mt-20 ">
              <select className="h-10 mt-4 py-2.5  text-xs text-gray-500 bg-transparent doctor rounded-xl px-4  appearance-none  focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                <option selected>Choose a Doctor</option>
                <option value="">Dr. James Anderson</option>
                <option value="">Dr. Harry Brook</option>
                <option value="">Dr. Mary Jeans</option>
                <option value="">Dr. Shami</option>
              </select>
              <div className="radio-Button flex flex-col gap-y-4">
                <label className="mb-4" id="label1">
                  {" "}
                  Do you want to take part in training
                </label>
                <div className="flex training  justify-between">
                  <label className="label2">Yes</label>
                  <input type="radio" value="Yes" />
                </div>
                <div className="flex training justify-between">
                  <label className="label2">No</label>
                  <input type="radio" value="No" />
                </div>
              </div>
            </div>
            <button
              id="btn_special_2"
              class="text-white font-poppins font-semibold tracking-widest ring-2 ring-purple drop-shadow-2xl"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientEntry;
