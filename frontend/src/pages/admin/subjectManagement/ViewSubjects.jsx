import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { IoChevronBackSharp, IoCloseSharp } from "react-icons/io5";
import Loading from "../../../components/common/Loading";
import { assignLecturerToSubject, deleteSubject } from "../../../service/adminSubject";
import toast from "react-hot-toast";

const ViewSubjects = () => {
  const { subjects, loading, getAdminSubjects, lecturers } =
    useContext(AppContext);
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [popupAssignLecturer, setpopupAssignLecturer] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [lecturerId, setLecturerId] = useState(null);

  // faculty lecturers of selected subject
  const facultyLecturersOfSubject = lecturers.filter(
    (lecturer) => lecturer.facultyName === selectedSubject?.facultyName
  );

  const subjectHandler = (subject) => {
    setShowPopup(!showPopup);

    setSelectedSubject(subject);
  };
  const assignLecturerPopupHandler = async (subject) => {
    setpopupAssignLecturer(!popupAssignLecturer);
    setSelectedSubject(subject);
  };
  const handleDeleteSubject = async (subjectId) => {
    try {
      const response = await deleteSubject(subjectId);
      if (response.success) {
        setShowPopup(false);
        toast.success(response.message);
        await getAdminSubjects();
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      console.log(error.message);
    }
  };

  const assignLecturerHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await assignLecturerToSubject(selectedSubject.subjectId, lecturerId);
      if (response.success) {
        toast.success(response.message);
        setpopupAssignLecturer(false);
        await getAdminSubjects(); 
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
        onClick={() => navigate("/admin/subject-management")}
        className="flex items-center gap-1 text-sm cursor-pointer text-primaryColor/80 border border-transparent hover:border-primaryColor/80 px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-primaryColor/10"
      >
        <IoChevronBackSharp />
        <p>Back</p>
      </button>

      <h1 className="text-2xl font-semibold mt-4">All Subjects</h1>
      <div className="overflow-x-auto mt-8 border border-primaryColor/30">
        <table className="min-w-full ">
          <thead className="bg-blue-100 text-start">
            <tr>
              <th className="text-start p-2">Subject ID</th>
              <th className="text-start p-2">Subject Code</th>
              <th className="text-start p-2">Subject Name</th>
              <th className="text-start p-2">Faculty</th>
              <th className="text-start p-2">Department</th>
              <th className="text-start p-2">Actions</th>
              <th className="text-start p-2">Assign Lecturer</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={index} className="hover:bg-blue-50">
                <td className="text-start p-2">
                  #{subject.subjectId.substring(0, 8)}
                </td>
                <td className="text-start p-2">{subject.subjectCode}</td>
                <td className="text-start p-2">{subject.subjectName}</td>
                <td className="text-start p-2">{subject.facultyName}</td>
                <td className="text-start p-2">{subject.departmentName}</td>
                <td className="text-start p-2">
                  <button
                    onClick={() => subjectHandler(subject)}
                    className="px-3 py-1 bg-primaryColor text-white rounded-md text-sm hover:bg-primaryColor/80 duration-300 transition-all ease-linear cursor-pointer"
                  >
                    View Subject
                  </button>
                </td>
                <td className="text-start p-2">
                  <button
                    onClick={() => assignLecturerPopupHandler(subject)}
                    className="px-3 py-1 bg-transparent  rounded-md text-sm hover:bg-white border border-primaryColor duration-300 transition-all ease-linear cursor-pointer"
                  >
                    Assign now
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup: Subject Details */}
      {showPopup && selectedSubject && (
        <div className="w-screen h-screen fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="w-full mx-4 sm:mx-0 sm:w-[500px] bg-white z-20 p-4 sm:p-8 h-fit overflow-y-auto rounded-lg ">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-xl">Subject Details</h1>
              <IoCloseSharp
                onClick={subjectHandler}
                className="text-2xl font-bold cursor-pointer"
              />
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <div>
                <p className="font-medium sm:text-lg ">Subject ID</p>
                <p className="text-sm">#{selectedSubject.subjectId}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-2 sm:gap-8">
                <div>
                  <p className="font-medium sm:text-lg ">Subject Code</p>
                  <p className="text-sm">{selectedSubject.subjectCode}</p>
                </div>
                <div>
                  <p className="font-medium sm:text-lg ">Subject Name</p>
                  <p className="text-sm">{selectedSubject.subjectName}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-2 sm:gap-8">
                <div>
                  <p className="font-medium sm:text-lg ">Lecturer</p>
                  <p className="text-sm">
                    {selectedSubject.name
                      ? selectedSubject.name
                      : "Not Assigned"}
                  </p>
                </div>
                <div>
                  <p className="font-medium sm:text-lg ">Batch</p>
                  <p className="text-sm">{selectedSubject.batchName}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-2 sm:gap-8">
                <div>
                  <p className="font-medium sm:text-lg ">Faculty</p>
                  <p className="text-sm">{selectedSubject.facultyName}</p>
                </div>
                <div>
                  <p className="font-medium sm:text-lg ">Department</p>
                  <p className="text-sm">{selectedSubject.departmentName}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-2 sm:gap-8">
                <div>
                  <p className="font-medium sm:text-lg ">Semester</p>
                  <p className="text-sm">{selectedSubject.subjectSemester}</p>
                </div>
                <div>
                  <p className="font-medium sm:text-lg ">Created</p>
                  <p className="text-sm">
                    {new Date(selectedSubject.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <button
                  onClick={subjectHandler}
                  className="bg-primaryColor text-white text-sm rounded-lg py-2.5 cursor-pointer hover:bg-primaryColor/80 duration-300 transition-all ease-in-out"
                >
                  Close
                </button>
                <button
                  onClick={() => setShowConfirm(true)}
                  className="bg-red-500 text-white text-sm rounded-lg py-2.5 cursor-pointer hover:bg-red-400 duration-300 transition-all ease-in-out"
                >
                  Delete Subject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popup: Assign Lecturer */}
      {popupAssignLecturer && selectedSubject && (
        <div className="w-screen h-screen fixed inset-0 bg-black/50 flex items-center justify-center">
          <form onSubmit={assignLecturerHandler} className="w-full mx-4 sm:mx-0 sm:w-[500px] bg-white z-20 p-4 sm:p-8 h-fit overflow-y-auto rounded-lg ">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-xl">Assign Lecturer</h1>
              <IoCloseSharp
                onClick={assignLecturerPopupHandler}
                className="text-2xl font-bold cursor-pointer"
              />
            </div>
            <div className="mt-6 flex flex-col ">
              <p className="font-medium sm:text-lg ">Subject</p>
              <p className="">
                {selectedSubject.subjectName} | {selectedSubject.subjectCode}
              </p>
            </div>
            <div className="mt-2 flex flex-col ">
              <p className="font-medium sm:text-lg ">Select Lecturer</p>
              <select
                value={lecturerId}
                onChange={(e) => setLecturerId(e.target.value)}
                className="w-full p-2 rounded-md border border-primaryColor/30 focus:border-primaryColor outline-none mt-1 "
              >
                <option value="">-- Select Lecturer --</option>
                {facultyLecturersOfSubject.map((lecturer, index) => (
                  <option key={index} value={lecturer.userId}>
                    {lecturer.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="bg-primaryColor w-full mt-6 text-white text-sm rounded-lg py-2.5 cursor-pointer hover:bg-primaryColor/80 duration-300 transition-all ease-in-out">
              Confirm Assigning
            </button>
          </form>
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
                {selectedSubject?.subjectName}
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
                  handleDeleteSubject(selectedSubject.subjectId);
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

export default ViewSubjects;
