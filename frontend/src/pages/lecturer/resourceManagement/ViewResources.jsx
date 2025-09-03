import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { AppContext } from "../../../context/AppContext";
import { FaFilePdf, FaFileWord, FaFileImage, FaFileAlt } from "react-icons/fa";

const ViewResources = () => {
  const navigate = useNavigate();
  const { resources } = useContext(AppContext);

  const getFileNameFromUrl = (url) => {
    try {
      return decodeURIComponent(url.split("/").pop().split("?")[0]);
    } catch {
      return "file";
    }
  };

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
        onClick={() => navigate("/lecturer/resource-management")}
        className="flex items-center gap-1 text-sm mb-6 cursor-pointer  text-primaryColor/80 border border-transparent hover:border-primaryColor/80 px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-primaryColor/10"
      >
        <p>
          <IoChevronBackSharp className="" />
        </p>
        <p>Back</p>
      </button>
      {/* Display All Assignments */}
      <div className="">
        <h1 className="text-2xl font-semibold">All Resources</h1>
        <div className="flex flex-col gap-4 sm:gap-6 mt-6">
          {resources.map((ass, index) => (
            <div
              key={index}
              className="border border-primaryColor/30 rounded-lg sm:rounded-2xl p-4 sm:p-6 lg:p-8"
            >
              <h1 className="font-medium text-xl">
                {ass.title} - {ass.Subject?.subjectCode}
              </h1>
              <p className="text-sm mt-2">Batch - {ass.batchName}</p>
             
              <div className="mt-4">
                <p className="text-primaryColor/85">Attached Files</p>
                <div className="flex flex-wrap gap-6">
                  {ass.fileUrl.length > 0 &&
                    ass.fileUrl.map((url, idx) => {
                      const fileName = getFileNameFromUrl(url);
                      return (
                        <a
                          key={idx}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 hover:underline mt-1"
                        >
                          {getFileIcon(fileName)}
                          <span>{fileName}</span>
                        </a>
                      );
                    })}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 sm:gap-4">
                
                <div className="flex flex-col  mt-2">
                  <p className="">Created At</p>
                  <p className="">{new Date(ass.createdAt).toLocaleString()}</p>
                </div>
              </div>
              {/* Button */}
            
            
                    <button className="bg-red-500 text-white text-sm rounded  hover:bg-red-400 duration-300 transition-all ease-linear py-2.5 cursor-pointer mt-6 px-12">Delete Resources</button>
                   
            
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewResources;
