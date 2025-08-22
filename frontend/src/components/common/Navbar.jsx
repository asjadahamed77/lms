import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SiStudyverse } from "react-icons/si";
import { FaUserCircle } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {organizationName} = useContext(AppContext)

  return (
    <div className="fixed top-0 left-0 right-0 bg-primaryColor text-white flex items-center justify-between px-4 sm:px-6 md:px-20">
      {/* Logo Icon */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-3 py-3 cursor-pointer"
      >
        <p>
          <SiStudyverse />
        </p>
        <h1 className="text-3xl tracking-wider font-bold">
            {organizationName}
        </h1>
      </div>
      {/* User Profile */}
      {location.pathname !== "/" && (
        <div className="flex items-center py-3 gap-3 cursor-pointer">
          <p className="text-sm sm:text-base">Asjad Ahamed</p>
          <div className="flex items-center gap-1">
            <p>
              <FaUserCircle />
            </p>
            <p>
              <MdArrowDropDown />
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
