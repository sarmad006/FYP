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
      </ul>
    </div>
  );
};

export default Sidebar;
