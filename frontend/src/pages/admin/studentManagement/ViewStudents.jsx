import React, { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";

const ViewStudents = () => {
  const { students } = useContext(AppContext);
  const navigate = useNavigate();
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
      <table className="w-full mt-8  overflow-x-scroll border border-primaryColor/30">
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
                <button className="px-3 py-1  bg-primaryColor text-white rounded-md text-sm hover:bg-primaryColor/80 duration-300 transition-all ease-linear cursor-pointer">
                  View Student
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewStudents;
