import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import "./home.css";

const Receptionist = () => {
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-12 mb-10">
        <Sidebar />
        <div className="col-span-10">
          <div className="flex justify-center mt-20">
            <h1 className="bg-gradient-to-r from-gradx1 to-gradx2 text-white text-3xl mt-8 font-poppins font-bold mr-2 py-1 px-10 rounded-2xl tracking-widest">
              Receptionist
            </h1>
          </div>
          <img id="homesvg" src="./image/line.svg" style={{ height: "120px", width: "550px" }} alt="MetaMask pic 2"/>
          <div className="flex justify-center gap-x-8">
            <div className="text-white font-poppins Box flex flex-col items-center">
              <h1 className="head">
                Record <br /> Patient
              </h1>
              <button className="bg-limgreen btn w-20 text-black font-semibold">Click</button>
            </div>
            <div className="text-white font-poppins Box flex flex-col items-center">
              <h1 className="head">
                Request <br /> Super-User
              </h1>
              <button className="bg-limgreen btn w-20 text-black font-semibold">Click</button>
            </div>
            <div className="text-white font-poppins Box flex flex-col items-center">
              <h1 className="head">
                View <br /> Models
              </h1>
              <button className="bg-limgreen btn w-20 text-black font-semibold">Click</button>
            </div>
          </div>
        </div>
      </div>
     </div>
  );
};

export default Receptionist;



