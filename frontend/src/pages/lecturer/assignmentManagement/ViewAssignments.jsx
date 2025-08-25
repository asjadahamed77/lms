import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { AppContext } from "../../../context/AppContext";
import { FaFilePdf, FaFileWord, FaFileImage, FaFileAlt } from "react-icons/fa";

const ViewAssignments = () => {
  const navigate = useNavigate();
  const { assignments } = useContext(AppContext);

  const getFileIcon = (fileName) => {
    const ext = fileName.split(".").pop().toLowerCase();

    switch (ext) {
      case "pdf":
        return <FaFilePdf className="text-red-600 text-2xl" />;
      case "doc":
      case "docx":
        return <FaFileWord className="text-blue-600 text-2xl" />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <FaFileImage className="text-green-600 text-2xl" />;
      default:
        return <FaFileAlt className="text-gray-600 text-2xl" />; // generic file icon
    }
  };

  return (
    <div className="py-8 md:py-12">
      <button
        onClick={() => navigate("/lecturer/assignment-management")}
        className="flex items-center gap-1 text-sm mb-6 cursor-pointer  text-primaryColor/80 border border-transparent hover:border-primaryColor/80 px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-primaryColor/10"
      >
        <p>
          <IoChevronBackSharp className="" />
        </p>
        <p>Back</p>
      </button>
      {/* Display All Assignments */}
      <div className="">
        <h1 className="text-2xl font-semibold">All Assignments</h1>
        <div className="flex flex-col gap-4 sm:gap-6 mt-6">
          {assignments.map((ass, index) => (
            <div
              key={index}
              className="border border-primaryColor/30 rounded-lg sm:rounded-2xl p-4 sm:p-6 lg:p-8"
            >
              <h1 className="font-medium text-xl">
                {ass.assignmentTitle} - {ass.subjectCode}
              </h1>
              <p className="text-sm mt-2">Batch - {ass.batchName}</p>
              <p className="text-sm sm:text-base text-primaryColor/65 mt-4">
                {ass.assignmentDescription}
              </p>
              <div className="mt-4">
                <p className="text-primaryColor/85">Attached Files</p>
                <div className="flex flex-wrap gap-6">
                  {ass.assignmentFiles.length > 0 &&
                    ass.assignmentFiles.map((item, index) => (
                      <a
                        key={index}
                        href={item.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:underline mt-1"
                      >
                        {getFileIcon(item.fileName)}
                        <span>{item.fileName}</span>
                      </a>
                    ))}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 sm:gap-4">
                <div className="flex flex-col  mt-2">
                  <p className="text-lg text-red-500">Deadline</p>
                  <p className="text-lg text-red-500">
                    {new Date(ass.deadline).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col  mt-2">
                  <p className="">Created At</p>
                  <p className="">{new Date(ass.createdAt).toLocaleString()}</p>
                </div>
              </div>
              {/* Button */}
              <div className="grid grid-cols-2 gap-4 sm:gap-8 mt-6">
              <button className="bg-primaryColor text-white text-sm rounded  hover:bg-primaryColor/80 duration-300 transition-all ease-linear py-2.5 cursor-pointer">View More</button>
                    <button className="bg-red-500 text-white text-sm rounded  hover:bg-red-400 duration-300 transition-all ease-linear py-2.5 cursor-pointer">Delete Assignment</button>
                   
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewAssignments;
