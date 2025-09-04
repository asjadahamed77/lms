import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { AppContext } from "../../../context/AppContext";
import {
  FaFilePdf,
  FaFileWord,
  FaFileImage,
  FaFileAlt,
  FaDownload,
} from "react-icons/fa";
import Loading from "../../../components/common/Loading";
import { deleteAssignment } from "../../../service/assignmentService";
import toast from "react-hot-toast";

const ViewAssignments = () => {
  const navigate = useNavigate();
  const { assignments, loading, setLoading, getLecturerAssignmentsDetails } =
    useContext(AppContext);

  const [assignmentToDelete, setAssignmentToDelete] = useState(null);

  // extract filename from Cloudinary URL
  const getFileNameFromUrl = (url) => {
    try {
      return decodeURIComponent(url.split("/").pop().split("?")[0]);
    } catch {
      return "file";
    }
  };

  // return icon based on extension
  const getFileIcon = (fileName) => {
    const ext = fileName.split(".").pop().toLowerCase();
    switch (ext) {
      case "pdf":
        return <FaFilePdf className="text-red-600 text-xl" />;
      case "doc":
      case "docx":
        return <FaFileWord className="text-blue-600 text-xl" />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <FaFileImage className="text-green-600 text-xl" />;
      default:
        return <FaFileAlt className="text-gray-600 text-xl" />;
    }
  };

  const deleteAssignmentHandler = async (assignmentId) => {
    setLoading(true);
    const response = await deleteAssignment(assignmentId);
    if (response.success) {
      toast.success(response.message);
      getLecturerAssignmentsDetails();
      setLoading(false);
      setAssignmentToDelete(null);
    } else {
      toast.error(response.message || "Failed to delete assignment");
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="py-8 md:py-12">
      <button
        onClick={() => navigate("/lecturer/assignment-management")}
        className="flex items-center gap-1 text-sm mb-6 cursor-pointer text-primaryColor/80 border border-transparent hover:border-primaryColor/80 px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-primaryColor/10"
      >
        <IoChevronBackSharp />
        <p>Back</p>
      </button>

      {/* Display All Assignments */}
      <div>
        <h1 className="text-2xl font-semibold">All Assignments</h1>
        {assignments.length === 0 ? (
          <p className="text-center mt-8 text-gray-500">
            No assignments found.
          </p>
        ) : (
          <div className="flex flex-col gap-4 sm:gap-6 mt-6">
            {assignments.map((ass, index) => (
              <div
                key={index}
                className="border border-primaryColor/30 rounded-lg sm:rounded-2xl p-4 sm:p-6 lg:p-8"
              >
                <h1 className="font-medium text-xl">
                  {ass.title} - {ass.Subject?.subjectCode}
                </h1>
                <p className="text-sm mt-2">Batch - {ass.batchName}</p>
                <p className="text-sm sm:text-base text-primaryColor/65 mt-4">
                  {ass.description}
                </p>

                {/* Attached Files */}
                <div className="mt-4">
                  <p className="text-primaryColor/85 font-medium">
                    Attached Files
                  </p>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {ass.fileUrl.length > 0 ? (
                      ass.fileUrl.map((file, idx) => {
                       
                        const fileName =
                          typeof file === "string"
                            ? getFileNameFromUrl(file)
                            : file.original_name ||
                              getFileNameFromUrl(file.url);

                        return (
                          <div
                            key={idx}
                            className="flex items-center gap-2 bg-gray-100 p-2 rounded"
                          >
                            {getFileIcon(fileName)}

                            <a
                              href={file.public_id}
                              download={file.public_id}
                              target="_blank"
                              className="text-primaryColor hover:text-blue-700 inline-flex gap-2"
                              title="Download file"
                            >
                              <span className="text-sm max-w-[150px] truncate">
                                {fileName}
                              </span>
                              <FaDownload />
                            </a>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-gray-500 text-sm">No files attached</p>
                    )}
                  </div>
                </div>

                {/* Dates */}
                <div className="grid sm:grid-cols-2 sm:gap-4 mt-4">
                  <div className="flex flex-col">
                    <p className="text-sm text-gray-600">Deadline</p>
                    <p className="text-red-500 font-medium">
                      {new Date(ass.deadline).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-col mt-2 sm:mt-0">
                    <p className="text-sm text-gray-600">Created At</p>
                    <p>{new Date(ass.createdAt).toLocaleString()}</p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-4 sm:gap-8 mt-6">
                  <button className="bg-primaryColor text-white text-sm rounded hover:bg-primaryColor/80 duration-300 transition-all ease-linear py-2.5 cursor-pointer">
                    View Submissions
                  </button>
                  <button
                    onClick={() => setAssignmentToDelete(ass)}
                    className="bg-red-500 text-white text-sm rounded hover:bg-red-400 duration-300 transition-all ease-linear py-2.5 cursor-pointer"
                  >
                    Delete Assignment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {assignmentToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[350px]">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="text-sm mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium">{assignmentToDelete.title}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setAssignmentToDelete(null)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  deleteAssignmentHandler(assignmentToDelete.assignmentId)
                }
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

export default ViewAssignments;
