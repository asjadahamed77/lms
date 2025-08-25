import React from 'react'
import { useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { FaFileCirclePlus } from "react-icons/fa6";
import { FaFileSignature } from "react-icons/fa";


const AssignmentManagement = () => {
  const navigate = useNavigate();
  return (
    <div className="py-8 md:py-12">
      <button
        onClick={() => navigate("/lecturer")}
        className="flex items-center gap-1 text-sm mb-6 cursor-pointer  text-primaryColor/80 border border-transparent hover:border-primaryColor/80 px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-primaryColor/10"
      >
        <p>
          <IoChevronBackSharp className="" />
        </p>
        <p>Back</p>
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3  gap-8 md:gap-12">
        {/* Add Assignment */}
        <div
          onClick={() =>
            navigate("/lecturer/assignment-management/add-assignment")
          }
          className="text-white flex items-center gap-6 bg-[#3D74B6] p-8 cursor-pointer rounded-2xl hover:-translate-y-2 duration-300 transition-all ease-in-out "
        >
          <p className="text-4xl">
            <FaFileCirclePlus />
          </p>
          <p className="text-3xl">Add Assignment</p>
        </div>
        {/* View Batches */}
        <div
          onClick={() =>
            navigate("/lecturer/assignment-management/view-assignments")
          }
          className="text-white flex items-center gap-6 bg-[#090040] p-8 cursor-pointer rounded-2xl hover:-translate-y-2 duration-300 transition-all ease-in-out "
        >
          <p className="text-4xl">
            <FaFileSignature />
          </p>
          <p className="text-3xl">View Assignments</p>
        </div>
      </div>
    </div>
  )
}

export default AssignmentManagement
