import React from "react";
import { FaLayerGroup } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { IoBook } from "react-icons/io5";
import { PiMicrophoneStageFill } from "react-icons/pi";
import { GrCreditCard } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="py-8 md:py-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3  gap-8 md:gap-12 ">
      {/* Batch Management */}
      <div onClick={()=> navigate('/admin/batch-management')} className="text-white flex items-center gap-6 bg-[#CF0F47] p-8 cursor-pointer rounded-2xl hover:-translate-y-2 duration-300 transition-all ease-in-out ">
        <p className="text-4xl">
          <FaLayerGroup />
        </p>
        <p className="text-3xl">Batch Management</p>
      </div>
      {/* Student Management */}
      <div onClick={()=> navigate('/admin/student-management')} className="text-white flex items-center gap-6 bg-[#253900] p-8 cursor-pointer rounded-2xl hover:-translate-y-2 duration-300 transition-all ease-in-out ">
        <p className="text-4xl">
          <PiStudentBold />
        </p>
        <p className="text-3xl">Student Management</p>
      </div>
      {/* Lecturer Management */}
      <div onClick={()=> navigate('/admin/lecturer-management')} className="text-white flex items-center gap-6 bg-[#1A2A80] p-8 cursor-pointer rounded-2xl hover:-translate-y-2 duration-300 transition-all ease-in-out ">
        <p className="text-4xl">
          <GiTeacher />
        </p>
        <p className="text-3xl">Lecturer Management</p>
      </div>
      {/* Subject Management */}
      <div onClick={()=> navigate('/admin/subject-management')} className="text-white flex items-center gap-6 bg-[#FF7A30] p-8 cursor-pointer rounded-2xl hover:-translate-y-2 duration-300 transition-all ease-in-out ">
        <p className="text-4xl">
          <IoBook />
        </p>
        <p className="text-3xl">Subject Management</p>
      </div>
      {/* Announcement Management */}
      <div onClick={()=> navigate('/admin/announcement-management')} className="text-white flex items-center gap-6 bg-[#000000] p-8 cursor-pointer rounded-2xl hover:-translate-y-2 duration-300 transition-all ease-in-out ">
        <p className="text-4xl">
          <PiMicrophoneStageFill />
        </p>
        <p className="text-3xl">Announcement Management</p>
      </div>
      {/* Payment Management */}
      <div onClick={()=> navigate('/admin/payment-management')} className="text-white flex items-center gap-6 bg-[#8A0000] p-8 cursor-pointer rounded-2xl hover:-translate-y-2 duration-300 transition-all ease-in-out ">
        <p className="text-4xl">
          <GrCreditCard />
        </p>
        <p className="text-3xl">Payment Management</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
