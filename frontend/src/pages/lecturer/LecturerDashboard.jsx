import React from 'react'
import { FaUserCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdAssignment } from "react-icons/md";
import { MdQuiz } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";


const LecturerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="py-8 md:py-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3  gap-8 md:gap-12 ">
        {/* Attendance Management */}
        <div onClick={()=> navigate('/lecturer/attendance-management')} className="text-white flex items-center gap-6 bg-[#CF0F47] p-8 cursor-pointer rounded-2xl hover:-translate-y-2 duration-300 transition-all ease-in-out ">
        <p className="text-4xl">
          <FaUserCheck />
        </p>
        <p className="text-3xl">Attendance Management</p>
      </div>

{/* Assignment Management */}
<div onClick={()=> navigate('/lecturer/assignment-management')} className="text-white flex items-center gap-6 bg-[#253900] p-8 cursor-pointer rounded-2xl hover:-translate-y-2 duration-300 transition-all ease-in-out ">
        <p className="text-4xl">
          <MdAssignment />
        </p>
        <p className="text-3xl">Assignment Management</p>
      </div>

      {/* Quiz Management */}
<div onClick={()=> navigate('/lecturer/quiz-management')} className="text-white flex items-center gap-6 bg-[#1A2A80] p-8 cursor-pointer rounded-2xl hover:-translate-y-2 duration-300 transition-all ease-in-out ">
        <p className="text-4xl">
          <MdQuiz />
        </p>
        <p className="text-3xl">Quiz Management</p>
      </div>

      {/* Resource Management */}
<div onClick={()=> navigate('/lecturer/resource-management')} className="text-white flex items-center gap-6 bg-[#FF7A30] p-8 cursor-pointer rounded-2xl hover:-translate-y-2 duration-300 transition-all ease-in-out ">
        <p className="text-4xl">
          <FaFileAlt />
        </p>
        <p className="text-3xl">Resource Management</p>
      </div>

    </div>
  )
}

export default LecturerDashboard
