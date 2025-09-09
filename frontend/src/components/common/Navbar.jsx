import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SiStudyverse } from "react-icons/si";
import { FaUserCircle } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import { AppContext } from "../../context/AppContext";
import { logout } from "../../service/authService";
import toast from "react-hot-toast";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { organizationName, user } = useContext(AppContext);
  const [mobileProfile, setMobileProfile] = useState(false);

  const handleMobileProfile = () => {
    if (window.screen.width < 640) {
      setMobileProfile(!mobileProfile);
    }
  };

  const handleNavigation = () => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "student") {
        navigate("/student");
      } else if (user.role === "lecturer") {
        navigate("/lecturer");
      }
    } else {
      navigate("/");
    }
  };

  const logoutHandler = async () => {
    try {
      const response = await logout();
      if (response.success) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate("/login");
        toast.success(response.message);
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-primaryColor text-white flex items-center justify-between px-4 sm:px-6 md:px-20">
      {/* Logo Icon */}
      <div
        onClick={handleNavigation}
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
      {location.pathname !== "/" && location.pathname !== "/forgot-password" && user && (
        <div
          onClick={handleMobileProfile}
          className=" py-3  cursor-pointer relative group"
        >
          <div className="flex items-center gap-3">
            <p className="text-sm sm:text-base">{user?.nameWithInitials}</p>
            <div className="flex items-center gap-1">
              <p>
                <FaUserCircle />
              </p>
              <p>
                <MdArrowDropDown />
              </p>
            </div>
          </div>
          {/* Group hover contents */}
          <div
            className={`absolute right-0 top-full p-1.5 w-40 ${
              mobileProfile ? "opacity-100" : ""
            }  opacity-0 sm:group-hover:opacity-100 transition-opacity z-25`}
          >
            <ul className="flex flex-col bg-white  border border-primaryColor/30 py-2 px-2 rounded-lg ">
              <li className="p-1 border-b border-primaryColor/20 text-primaryColor/70 hover:text-primaryColor/90 duration-300 transition-all ease-linear cursor-pointer">
                <Link to={"/manage-profile"}>Manage Profile</Link>
              </li>
              <li
                onClick={logoutHandler}
                className="p-1 text-primaryColor/70 hover:text-primaryColor/90 duration-300 transition-all ease-linear cursor-pointer"
              >
                Logout Profile
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
