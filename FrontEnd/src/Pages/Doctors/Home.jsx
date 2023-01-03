import React, { useEffect } from "react";
import Model from "../../Components/Doctor/Models/Model";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-12 mb-10">
        <Sidebar />

        <div className="col-span-10">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-gradx1 to-gradx2 text-white text-2xl mt-8 font-light mr-2 px-12 py-1 rounded-lg tracking-wider font-poppins">
              Available Models
            </div>
          </div>
          <div className="grid md:grid-cols-1 tb:grid-cols-2 xs:grid-cols-1 sm:grid-cols-1  lg:grid-cols-3 gap-x-28 gap-y-8 mt-12 px-40">
            <Model />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
