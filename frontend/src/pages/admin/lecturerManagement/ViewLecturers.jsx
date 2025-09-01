import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { deleteLecturer } from "../../../service/adminLecturer";
import toast from "react-hot-toast";
import Loading from "../../../components/common/Loading";

const ViewLecturers = () => {
  const { lecturers, loading, getAdminLecturers } = useContext(AppContext);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState(null);
  const lecturerHandler = (lecturer) => {
    setShowPopup(!showPopup);
    setSelectedLecturer(lecturer);
  };
  const handleDeleteLecturer = async (userId) => {
    try {
      const response = await deleteLecturer(userId);
      if (response.success) {
        setShowPopup(false);
        toast.success(response.message);
        await getAdminLecturers();
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      console.log(error.message);
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="py-8 md:py-12">
      <button
        onClick={() => navigate("/admin/lecturer-management")}
        className="flex items-center gap-1 text-sm  cursor-pointer  text-primaryColor/80 border border-transparent hover:border-primaryColor/80 px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-primaryColor/10"
      >
        <p>
          <IoChevronBackSharp className="" />
        </p>
        <p>Back</p>
      </button>
      <h1 className="text-2xl font-semibold mt-4">All Lecturers</h1>
      <div className="overflow-x-auto mt-8  border border-primaryColor/30">
        <table className="min-w-full ">
          <thead className="bg-blue-100 text-start">
            <tr>
              <th className="text-start p-2">Lecturer ID</th>
              <th className="text-start p-2">Registration No</th>
              <th className="text-start p-2">Name with Initials</th>
              <th className="text-start p-2">Faculty</th>
              <th className="text-start p-2">Department</th>
              <th className="text-start p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lecturers.map((lecturer, index) => (
              <tr key={index} className="hover:bg-blue-50">
                <td className="text-start p-2">
                  #{lecturer.userId.substring(0, 8)}
                </td>
                <td className="text-start p-2">
                  {lecturer.registrationNumber}
                </td>
                <td className="text-start p-2">{lecturer.nameWithInitials}</td>
                <td className="text-start p-2">{lecturer.facultyName}</td>
                <td className="text-start p-2">{lecturer.departmentName}</td>
                <td className="text-start p-2">
                  <button
                    onClick={() => lecturerHandler(lecturer)}
                    className="px-3 py-1  bg-primaryColor text-white rounded-md text-sm hover:bg-primaryColor/80 duration-300 transition-all ease-linear cursor-pointer"
                  >
                    View Lecturer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Popup View Lecturer */}
      {showPopup && selectedLecturer && (
        <div
          className={` w-screen h-screen fixed inset-0 bg-black/50 flex items-center justify-center`}
        >
          <div className="w-full mx-4 sm:mx-0 sm:w-[500px] bg-white z-20 p-4 sm:p-8 max-h-[calc(100vh-80px)] overflow-y-scroll rounded-lg ">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-xl">Lecturer Details</h1>
              <p
                onClick={lecturerHandler}
                className="text-2xl font-bold cursor-pointer "
              >
                <IoCloseSharp />
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <div>
                <p className="font-medium sm:text-lg ">Lecturer ID</p>
                <p className="text-sm">#{selectedLecturer.userId}</p>
              </div>
              <div className="grid  sm:grid-cols-2 gap-2 sm:gap-8">
                <div>
                  <p className="font-medium sm:text-lg ">Full Name</p>
                  <p className="text-sm">{selectedLecturer.name}</p>
                </div>
                <div>
                  <p className="font-medium sm:text-lg ">Name with initials</p>
                  <p className="text-sm">{selectedLecturer.nameWithInitials}</p>
                </div>
              </div>
              <div className="grid  sm:grid-cols-2 gap-2 sm:gap-8">
                <div>
                  <p className="font-medium sm:text-lg ">Registration No</p>
                  <p className="text-sm">
                    {selectedLecturer.registrationNumber}
                  </p>
                </div>
                <div>
                  <p className="font-medium sm:text-lg ">
                    No of Subjects Assigned
                  </p>
                  <p>{selectedLecturer.subjects?.length}</p>
                </div>
              </div>
              <div className="grid  sm:grid-cols-2  gap-2 sm:gap-8">
                <div>
                  <p className="font-medium sm:text-lg ">Faculty</p>
                  <p className="text-sm">{selectedLecturer.facultyName}</p>
                </div>
                <div>
                  <p className="font-medium sm:text-lg ">Department</p>
                  <p className="text-sm">{selectedLecturer.departmentName}</p>
                </div>
              </div>
              <div className="grid  sm:grid-cols-2  gap-2 sm:gap-8">
                <div>
                  <p className="font-medium sm:text-lg ">Lecturer Email</p>
                  <p className="text-sm">{selectedLecturer.email}</p>
                </div>
                <div>
                  <p className="font-medium sm:text-lg ">Created</p>
                  <p className="text-sm">
                    {" "}
                    {new Date(selectedLecturer.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div>
                <p className="font-medium sm:text-lg ">Assigned Subjects</p>
                <div className=" flex flex-col gap-2  ">
                  {selectedLecturer.subjects?.map((subject, index) => (
                    <div key={index} className="grid  sm:grid-cols-2  ">
                      <div>
                        <p className="text-sm font-medium">Subject Code</p>
                        <p className="text-sm">{subject.subjectCode}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Subject Name</p>
                        <p className="text-sm">{subject.subjectName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Subject Semester</p>
                        <p className="text-sm">{subject.subjectSemester}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Batch</p>
                        <p className="text-sm">{subject.batchName}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Buttons */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <button
                  onClick={lecturerHandler}
                  className="bg-primaryColor text-white text-sm rounded-lg py-2.5 cursor-pointer hover:bg-primaryColor/80 duration-300 transition-all ease-in-out"
                >
                  Close
                </button>
                <button
                      onClick={() => setShowConfirm(true)}
                  className="bg-red-500 text-white text-sm rounded-lg py-2.5   cursor-pointer hover:bg-red-400 duration-300 transition-all ease-in-out"
                >
                  Delete Lecturer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
       {/* Confirmation Modal */}
       {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-[350px] shadow-md">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="text-sm mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium">
                {selectedLecturer?.nameWithInitials}
              </span>
              ?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDeleteLecturer(selectedLecturer.userId);
                  setShowConfirm(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewLecturers;
