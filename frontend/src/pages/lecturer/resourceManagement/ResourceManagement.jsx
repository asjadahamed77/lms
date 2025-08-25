import React from 'react'
import { useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { TiDocumentAdd } from "react-icons/ti";
import { SiGoogledocs } from "react-icons/si";


const ResourceManagement = () => {
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
            navigate("/lecturer/resource-management/add-resource")
          }
          className="text-white flex items-center gap-6 bg-[#3D74B6] p-8 cursor-pointer rounded-2xl hover:-translate-y-2 duration-300 transition-all ease-in-out "
        >
          <p className="text-4xl">
            <TiDocumentAdd />
          </p>
          <p className="text-3xl">Add Resource</p>
        </div>
        {/* View Batches */}
        <div
          onClick={() =>
            navigate("/lecturer/resource-management/view-resources")
          }
          className="text-white flex items-center gap-6 bg-[#090040] p-8 cursor-pointer rounded-2xl hover:-translate-y-2 duration-300 transition-all ease-in-out "
        >
          <p className="text-4xl">
            <SiGoogledocs />
          </p>
          <p className="text-3xl">View Resources</p>
        </div>
      </div>
    </div>
  )
}

export default ResourceManagement
