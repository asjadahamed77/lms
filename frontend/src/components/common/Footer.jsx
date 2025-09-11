import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { SiStudyverse } from "react-icons/si";

const Footer = () => {
  const { organizationName } = useContext(AppContext);
  return (
    <div className="bg-primaryColor mt-24 py-12 px-8 sm:px-12 md:px-16 lg:px-20 text-white " >
     <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
     <div>
         {/* Logo Icon */}
      <div className="flex items-center gap-3 mb-4 cursor-pointer">
        <p>
          <SiStudyverse />
        </p>
        <h1 className="text-3xl tracking-wider font-bold">
          {organizationName}
        </h1>
      </div>
      <p className="w-[80%] text-justify text-sm">
      Our Learning Management System (LMS) helps students and lecturers connect easily, manage courses, share materials, submit assignments, and track progress in one place.
      </p>
     </div>
     <div>
        <h1 className="font-semibold text-xl mb-4">Contact Us</h1>
        <p className="text-sm">{organizationName}, Galle Road,</p>
        <p className="text-sm">Colombo - 04</p>
        <p className="text-sm">Sri Lanka</p>
       <a  href="mailto:lms@gmail.com" target="_blank">lms@gmail.com</a>
        <p className="text-sm">+11 922 2872</p>
     </div>
     </div>
     <div className="border-t mt-12 text-center pt-8 text-sm">
        <p>© 2025 Arya Labs LMS. All Rights Reserved.</p>
     </div>
    </div>
  );
};

export default Footer;
