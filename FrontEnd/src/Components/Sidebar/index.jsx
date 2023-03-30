import React from "react";
import "./index.css";
import { AiOutlineHome, AiOutlineForm } from "react-icons/ai";
import { RiFileCloudLine } from "react-icons/ri";
import { MdOutlineFileUpload } from "react-icons/md";
import { BsHospital } from "react-icons/bs";
import { useLocation } from "react-router-dom";

//918dec bg color
const Sidebar = () => {
  const location = useLocation();
  const superUser = [
    {
      name: "Home",
      icon: <AiOutlineHome />,
      path: "/superuser",
    },
    {
      name: "Registered Hospitals",
      icon: <BsHospital />,
      path: "/superuser/hospitals",
    },
    {
      name: "Register Hospitals",
      icon: <AiOutlineForm />,
      path: "/superuser/reg",
    },
  ];
  return (
    <div className="sidebarDiv">
      <ul className="sidebarDivul">
        {location.pathname.includes("superuser") &&
          superUser.map((item) => (
            <li className="sidebarDivLi">
              {item.icon}
              <a href={item.path}>{item.name}</a>
            </li>
          ))}

        {/* <li className="sidebarDivLi">
          <RiFileCloudLine fontSize={20} />
          <a href="/recep/retrieveModel">Retrive Model </a>
        </li>
        <li className="sidebarDivLi">
          <MdOutlineFileUpload fontSize={20} />
          <a href="/recep/uploadModel">Upload Model </a>
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;

// eslint-disable-next-line no-lone-blocks
{
  /* <aside class="w-28 " aria-label="Sidebar">
    <div class="overflow-y-auto pb-60 pt-20 bg-purple rounded-3xl mx-4">
       <ul class="space-y-8 text-white">
          <li className='sideabar_li flex justify-center'>
            <span>Home</span>
          </li>
          <li className='sideabar_li flex justify-center'>
            <span>Retrive Model</span>
          </li>
          <li className='sideabar_li flex justify-center'>
            <span>Upload Model</span>
          </li>
          <li className='sideabar_li flex justify-center'>
            <span>FUck</span>
          </li>
          <li className='sideabar_li flex justify-center'>
            <span>Home</span>
          </li>
         
       </ul>
    </div>
 </aside> */
}
