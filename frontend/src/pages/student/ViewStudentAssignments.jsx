import React, { useContext, useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { FaFileAlt, FaFileImage, FaFilePdf, FaFileWord } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import {
  getStudentAssignmentSubmissions,
  submitAssignment,
} from "../../service/submissionService";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/common/Loading";

const RemainingTime = ({ deadline }) => {
  const getRemainingTime = (deadline) => {
    const diff = new Date(deadline) - new Date();

    if (diff <= 0) return "Expired";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const [remaining, setRemaining] = useState(getRemainingTime(deadline));

  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining(getRemainingTime(deadline));
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  return <p className="text-primaryColor/80">{remaining}</p>;
};

const ViewStudentAssignments = ({ currentSubject, user }) => {
  const { loading, setLoading } = useContext(AppContext);

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
        return <FaFileAlt className="text-gray-600 text-2xl" />;
    }
  };

  const [popup, setPopup] = useState(false);
  const [submissionPopup, setSubmissionPopup] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissions, setSubmissions] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    files: [],
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      files: e.target.files,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const form = new FormData();
      form.append("title", formData.title);
      form.append("assignmentId", selectedAssignment.assignmentId);
      form.append("studentId", user.userId);
      form.append("batchName", user.batchName);
      form.append("departmentName", user.departmentName);
      form.append("studentName", user.name);
      form.append("subjectName", currentSubject.subjectName);
      form.append("deadline", selectedAssignment.deadline);
      if (formData.files && formData.files.length > 0) {
        for (let i = 0; i < formData.files.length; i++) {
          form.append("files", formData.files[i]);
        }
      }

      const response = await submitAssignment({
        userId: user.userId,
        formData: form,
      });

      if (response.success) {
        toast.success(response.message);
        setPopup(false);
        setSelectedAssignment(null);
        setFormData({
          title: "",
          files: [],
        });

        // Refresh the submission for this assignment
        if (selectedAssignment?.assignmentId) {
          getSubmission(selectedAssignment.assignmentId);
        }
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Submission failed. Please try again.");
      console.error("Submission Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSubmission = useCallback(
    async (assignmentId) => {
      try {
        const response = await getStudentAssignmentSubmissions({
          userId: user.userId,
          assignmentId,
        });

        if (response.success) {
          setSubmissions((prev) => ({
            ...prev,
            [assignmentId]: response.submission,
          }));
        } else {
          setSubmissions((prev) => ({
            ...prev,
            [assignmentId]: null,
          }));
          toast.error(response.message || "No submission found");
        }
      } catch (error) {
        console.error("Error fetching submission:", error);
        setSubmissions((prev) => ({
          ...prev,
          [assignmentId]: null,
        }));
      }
    },
    [user.userId]
  );

  useEffect(() => {
    if (selectedAssignment?.assignmentId && submissionPopup) {
      getSubmission(selectedAssignment.assignmentId);
    }
  }, [selectedAssignment?.assignmentId, submissionPopup, getSubmission]);

  const closeSubmissionPopup = () => {
    setSubmissionPopup(false);
    setSelectedAssignment(null);
  };

  const closePopup = () => {
    setPopup(false);
    setSelectedAssignment(null);
    setFormData({
      title: "",
      files: [],
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6 border-b pb-2">Assignments</h1>

      <div className="grid md:grid-cols-2 gap-6 md:gap-10">
        {currentSubject.Assignments.length === 0 ? (
          <div>
            <p>No assignments yet.</p>
          </div>
        ) : (
          currentSubject.Assignments.map((ass, index) => (
            <div
              key={index}
              className="p-4 sm:p-6 md:p-8 border border-primaryColor/30 rounded-lg hover:-translate-y-2 duration-300 transition-transform ease-linear"
            >
              <p className="font-medium text-xl">{ass.title}</p>
              <p className="mt-4 text-primaryColor/80 text-sm">
                {ass.description}
              </p>

              <div className="mt-4">
                <p className="font-medium">Attached Files:</p>
                <div className="flex items-center gap-2">
                  {ass.fileUrl.map((url, idx) => (
                    <a
                      key={idx}
                      href={url.public_id}
                      download={url.public_id}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:underline mt-1"
                    >
                      {getFileIcon(url.original_name)}
                      <span>{url.original_name}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-red-600">Deadline</p>
                <p className="text-red-600">
                  {new Date(ass.deadline).toLocaleString()}
                </p>
                <p className="font-medium mt-2">Time Remaining</p>
                <RemainingTime deadline={ass.deadline} />
              </div>


             <div className="flex items-center gap-4">
             <button
                  onClick={() => {
                    setPopup(true);
                    setSelectedAssignment(ass);
                  }}
                  className="mt-6 bg-primaryColor text-white py-2 text-sm px-8 rounded-md hover:bg-primaryColor/80 duration-300 transition-all ease-in-out cursor-pointer"
                >
                  Submit your assignment
                </button>
            
                  <button
                  onClick={() => {
                    setSubmissionPopup(true);
                    setSelectedAssignment(ass);
                  }}
                  className="mt-6 bg-primaryColor text-white py-2 text-sm px-8 rounded-md hover:bg-primaryColor/80 duration-300 transition-all ease-in-out cursor-pointer"
                >
                  View your submission
                </button>
             </div>
              
                 
               

              
            </div>
          ))
        )}
      </div>

      {popup && selectedAssignment && (
        <div className=" fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
          <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 w-full mx-4 sm:m-0 sm:w-[450px]">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-medium">Submit now</h1>
              <p onClick={closePopup} className="text-2xl cursor-pointer">
                <IoCloseSharp />
              </p>
            </div>
            <form onSubmit={submitHandler} className="mt-6 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Title</label>
                <input
                  type="text"
                  placeholder="Title ..."
                  name="title"
                  onChange={changeHandler}
                  value={formData.title}
                  className="p-2 w-full rounded border border-primaryColor/30"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Add Files</label>
                <input
                  type="file"
                  accept="application/pdf, image/*, .doc, .docx"
                  multiple
                  onChange={handleFileChange}
                  className="p-2 w-full rounded border border-primaryColor/30"
                />
              </div>
              <button
                type="submit"
                className="bg-primaryColor text-white py-2 text-sm px-8 rounded-md hover:bg-primaryColor/80 duration-300 transition-all ease-in-out cursor-pointer mt-4"
              >
                Submit now
              </button>
            </form>
          </div>
        </div>
      )}
      {submissionPopup && selectedAssignment && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
          <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 w-full mx-4 sm:m-0 sm:w-[450px]">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-medium">Your Submission</h1>
              <p
                onClick={closeSubmissionPopup}
                className="text-2xl cursor-pointer"
              >
                <IoCloseSharp />
              </p>
            </div>

            {submissions[selectedAssignment.assignmentId] ? (
              <div className="mt-6 space-y-4">
                <p>
                  <span className="font-semibold">Title:</span>{" "}
                  {submissions[selectedAssignment.assignmentId].title}
                </p>
                <div className="grid grid-cols-2">
                  <p>
                    <span className="font-semibold">Submitted on:</span>{" "}
                    {new Date(
                      submissions[selectedAssignment.assignmentId].submittedAt
                    ).toLocaleString()}
                  </p>{" "}
                  <p>
                    <span className="font-semibold">Dealine on:</span>{" "}
                    {new Date(
                      submissions[selectedAssignment.assignmentId].deadline
                    ).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="font-semibold">Files:</p>
                  <div className="flex flex-col gap-2 mt-2">
                    {submissions[selectedAssignment.assignmentId].fileUrl.map(
                      (file, idx) => (
                        <a
                          key={idx}
                          href={file.public_id}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 hover:underline"
                        >
                          {getFileIcon(file.original_name)}
                          <span>{file.original_name}</span>
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="mt-6 text-gray-500">No submission yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewStudentAssignments;
