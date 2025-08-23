import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";

const ViewStudents = () => {
  const { students } = useContext(AppContext);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const studentHandler = (student) => {
    setShowPopup(!showPopup);
    setSelectedStudent(student);
  };
  return (
    <div className="py-8 md:py-12">
      <button
        onClick={() => navigate("/admin/student-management")}
        className="flex items-center gap-1 text-sm  cursor-pointer  text-primaryColor/80 border border-transparent hover:border-primaryColor/80 px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-primaryColor/10"
      >
        <p>
          <IoChevronBackSharp className="" />
        </p>
        <p>Back</p>
      </button>
      <h1 className="text-2xl font-semibold mt-4">All Students</h1>
      <div className="overflow-x-auto mt-8  border border-primaryColor/30">
        <table className="min-w-full ">
          <thead className="bg-blue-100 text-start">
            <tr>
              <th className="text-start p-2">Student ID</th>
              <th className="text-start p-2">Registration No</th>
              <th className="text-start p-2">Name with Initials</th>
              <th className="text-start p-2">Faculty</th>
              <th className="text-start p-2">Department</th>
              <th className="text-start p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="hover:bg-blue-50">
                <td className="text-start p-2">
                  #{student.userId.substring(0, 8)}
                </td>
                <td className="text-start p-2">{student.registrationNumber}</td>
                <td className="text-start p-2">{student.nameWithInitials}</td>
                <td className="text-start p-2">{student.facultyName}</td>
                <td className="text-start p-2">{student.departmentName}</td>
                <td className="text-start p-2">
                  <button
                    onClick={() => studentHandler(student)}
                    className="px-3 py-1  bg-primaryColor text-white rounded-md text-sm hover:bg-primaryColor/80 duration-300 transition-all ease-linear cursor-pointer"
                  >
                    View Student
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Popup View Student */}
      {showPopup && selectedStudent && (
        <div
          className={` w-screen h-screen fixed inset-0 bg-black/50 flex items-center justify-center`}
        >
          <div className="w-full mx-4 sm:mx-0 sm:w-[500px] bg-white z-20 p-4 sm:p-8 h-fit overflow-y-auto rounded-lg ">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-xl">Student Details</h1>
              <p
                onClick={studentHandler}
                className="text-2xl font-bold cursor-pointer "
              >
                <IoCloseSharp />
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <div>
                <p className="font-medium sm:text-lg ">Student ID</p>
                <p className="text-sm">#{selectedStudent.userId}</p>
              </div>
              <div className="grid  sm:grid-cols-2 gap-2 sm:gap-8">
                <div>
                  <p className="font-medium sm:text-lg ">Full Name</p>
                  <p className="text-sm">{selectedStudent.name}</p>
                </div>
                <div>
                  <p className="font-medium sm:text-lg ">Name with initials</p>
                  <p className="text-sm">{selectedStudent.nameWithInitials}</p>
                </div>
              </div>
              <div className="grid  sm:grid-cols-2 gap-2 sm:gap-8">
                <div>
                  <p className="font-medium sm:text-lg ">Registration No</p>
                  <p className="text-sm">
                    {selectedStudent.registrationNumber}
                  </p>
                </div>
                <div>
                  <p className="font-medium sm:text-lg ">Batch</p>
                  <p className="text-sm">{selectedStudent.batchName}</p>
                </div>
              </div>
              <div className="grid  sm:grid-cols-2  gap-2 sm:gap-8">
                <div>
                  <p className="font-medium sm:text-lg ">Faculty</p>
                  <p className="text-sm">{selectedStudent.facultyName}</p>
                </div>
                <div>
                  <p className="font-medium sm:text-lg ">Department</p>
                  <p className="text-sm">{selectedStudent.departmentName}</p>
                </div>
              </div>
              <div className="grid  sm:grid-cols-2  gap-2 sm:gap-8">
                <div>
                  <p className="font-medium sm:text-lg ">Student Email</p>
                  <p className="text-sm">{selectedStudent.email}</p>
                </div>
                <div>
                  <p className="font-medium sm:text-lg ">Created</p>
                  <p className="text-sm">
                    {" "}
                    {new Date(selectedStudent.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              {/* Buttons */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <button onClick={studentHandler} className="bg-primaryColor text-white text-sm rounded-lg py-2.5 cursor-pointer hover:bg-primaryColor/80 duration-300 transition-all ease-in-out">Close</button>
                <button onClick={studentHandler} className="bg-red-500 text-white text-sm rounded-lg py-2.5   cursor-pointer hover:bg-red-400 duration-300 transition-all ease-in-out">Delete Student</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewStudents;
