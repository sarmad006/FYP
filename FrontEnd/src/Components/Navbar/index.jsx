import React from "react";
import { Link, useLocation } from "react-router-dom";
import Tags from "../Tags";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user=useSelector((state)=>state.user.value)
  const location=useLocation()
  return (
    <nav class="p-3 border-gray-200 rounded-xl bg-purple py-4  my-4 mx-4 px-12">
      <div class="flex flex-wrap items-center justify-between my-1 w-full font-poppins items-center">
        <div className="flex justify-between gap-x-4">
          {location.pathname.includes("superuser")?(
            <Tags color="red" text="Superuser"/>
          ):
          (
          <>
          <Tags color="pink" text="Hospital" />
          <Tags color="yellow" text={user.name} />
          </>
          )}
        </div>
        <div className="text-center ">
          <h1 className="font-medium text-white text-1xl tracking-widest">
            DEDOC </h1>
        </div>
        <div className="flex flex-row gap-x-8 w-60 items-center">
          <div>
            <button className="text-gray-100 mr-4 bg-transparent border-0 focus:outline-none rounded-lg text-sm">
              Logout
            </button>
          </div>
          {/* <input type="image" src="./metamask.svg" height="30" width="30"/> */}
          <div>
            <Link to='/reg'><img src={require("../Images/MetaMask_Fox.png")} alt="MetaMask" /></Link>
  
          </div>
          <div className="bg-green-300 mt-3 w-2.5 h-2.5 rounded-full"></div>
  
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
