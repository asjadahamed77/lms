import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { IoChevronBackSharp, IoCloseSharp } from "react-icons/io5";
import { deleteStudent } from "../../../service/adminStudent";
import toast from "react-hot-toast";
import Loading from "../../../components/common/Loading";

const ViewStudents = () => {
  const { students, getAdminStudents, loading } = useContext(AppContext);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const studentHandler = (student) => {
    setShowPopup(!showPopup);
    setSelectedStudent(student);
  };

  const handleDeleteStudent = async (userId) => {
    try {
      const response = await deleteStudent(userId);
      if (response.success) {
        setShowPopup(false);
        toast.success(response.message);
        await getAdminStudents();
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
        onClick={() => navigate("/admin/student-management")}
        className="flex items-center gap-1 text-sm cursor-pointer text-primaryColor/80 border border-transparent hover:border-primaryColor/80 px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-primaryColor/10"
      >
        <IoChevronBackSharp />
        <p>Back</p>
      </button>

      <h1 className="text-2xl font-semibold mt-4">All Students</h1>

      <div className="overflow-x-auto mt-8 border border-primaryColor/30">
        <table className="min-w-full">
          <thead className="bg-blue-100">
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
                <td className="p-2">#{student.userId.substring(0, 8)}</td>
                <td className="p-2">{student.registrationNumber}</td>
                <td className="p-2">{student.nameWithInitials}</td>
                <td className="p-2">{student.facultyName}</td>
                <td className="p-2">{student.departmentName}</td>
                <td className="p-2">
                  <button
                    onClick={() => studentHandler(student)}
                    className="px-3 py-1 bg-primaryColor text-white rounded-md text-sm hover:bg-primaryColor/80 transition-all"
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
        <div className="w-screen h-screen fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="w-full mx-4 sm:w-[500px] bg-white z-20 p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-xl">Student Details</h1>
              <IoCloseSharp
                onClick={studentHandler}
                className="text-2xl font-bold cursor-pointer"
              />
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <p className="text-sm">
                <span className="font-medium">Student ID:</span> #
                {selectedStudent.userId}
              </p>
              <p className="text-sm">
                <span className="font-medium">Full Name:</span>{" "}
                {selectedStudent.name}
              </p>
              <p className="text-sm">
                <span className="font-medium">Name with initials:</span>{" "}
                {selectedStudent.nameWithInitials}
              </p>
              <p className="text-sm">
                <span className="font-medium">Registration No:</span>{" "}
                {selectedStudent.registrationNumber}
              </p>
              <p className="text-sm">
                <span className="font-medium">Batch:</span>{" "}
                {selectedStudent.batchName}
              </p>
              <p className="text-sm">
                <span className="font-medium">Faculty:</span>{" "}
                {selectedStudent.facultyName}
              </p>
              <p className="text-sm">
                <span className="font-medium">Department:</span>{" "}
                {selectedStudent.departmentName}
              </p>
              <p className="text-sm">
                <span className="font-medium">Email:</span>{" "}
                {selectedStudent.email}
              </p>
              <p className="text-sm">
                <span className="font-medium">Created:</span>{" "}
                {new Date(selectedStudent.createdAt).toLocaleString()}
              </p>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <button
                  onClick={studentHandler}
                  className="bg-primaryColor text-white text-sm rounded-lg py-2.5 hover:bg-primaryColor/80 transition-all"
                >
                  Close
                </button>
                <button
                  onClick={() => setShowConfirm(true)}
                  className="bg-red-500 text-white text-sm rounded-lg py-2.5 hover:bg-red-400 transition-all"
                >
                  Delete Student
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
                {selectedStudent?.nameWithInitials}
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
                  handleDeleteStudent(selectedStudent.userId);
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

export default ViewStudents;
