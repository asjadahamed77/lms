import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { AppContext } from "../../../context/AppContext";
import { MdLibraryBooks } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";

const AddResources = () => {
  const navigate = useNavigate();
  const { lecturer } = useContext(AppContext);
  const [subjectSelected, setSubjectSelected] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleClose = () => {
    setShowPopup(false);
    setSubjectSelected(null);
  };

  const handleSubjectSelect = (subject) => {
    setSubjectSelected(subject);
    setShowPopup(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
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
      {/* Display the subjects of particular lecturer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3  gap-8 md:gap-12">
        {lecturer.subjects?.map((subject, index) => (
          <div
            key={index}
            onClick={() => handleSubjectSelect(subject)}
            className="text-white flex items-center gap-6 bg-[#0D1164] p-8 cursor-pointer rounded-2xl hover:-translate-y-2 duration-300 transition-all ease-in-out"
          >
            <p className="text-4xl">
              <MdLibraryBooks />
            </p>
            <p className="font-medium text-2xl">
              {subject.subjectName} - {subject.subjectCode}
            </p>
          </div>
        )) || (
          <p className="text-center text-xl font-medium">No subjects found</p>
        )}
      </div>
      {/* Display Add Assignment popup */}
      {showPopup && subjectSelected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center ">
          <div className="p-4 sm:p-8 bg-white rounded-lg w-full mx-4 sm:mx-0 sm:w-[500px] overflow-y-scroll max-h-[calc(100vh-80px)]">
            <div className="flex items-center justify-between ">
              <h1 className="sm:text-xl font-medium">
                {subjectSelected.subjectName}
              </h1>

              <p
                onClick={handleClose}
                className="text-2xl font-bold cursor-pointer "
              >
                <IoCloseSharp />
              </p>
            </div>
            <form onSubmit={submitHandler} className="mt-6 flex flex-col gap-4">
              <div className="flex flex-col  gap-2  flex-1">
                <label className="font-semibold">Title</label>
                <input
                  type="text"
                  placeholder="Enter here ..."
                  className="p-2 w-full rounded border border-primaryColor/30"
                  required
                />
              </div>

             
              <div className="flex flex-col  gap-2  flex-1">
                <label className="font-semibold">Add File</label>

                <input
                  type="file"
                  accept="application/pdf, image/*, .doc, .docx"
                  multiple
                  className="p-2 rounded border border-primaryColor/30"
                />
              </div>
             
              <button
            type="submit"
            className="bg-primaryColor py-3 text-white w-full rounded-lg  mt-4 cursor-pointer hover:bg-primaryColor/80 duration-300 transition-all ease-in-out"
          >
            Add Resource
          </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddResources;
