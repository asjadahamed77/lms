import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { IoChevronBackSharp } from "react-icons/io5";
import { FaFileAlt, FaFileImage, FaFilePdf, FaFileWord } from "react-icons/fa";

const StudentSubject = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const { student } = useContext(AppContext);
  const currentSubject = student.subjects.find(
    (sub) => sub.subjectId === subjectId
  );

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

  // Helper function to format time
  const getRemainingTime = (deadline) => {
    const diff = new Date(deadline) - new Date();

    if (diff <= 0) return "Expired";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="py-8 md:py-12">
      <button
        onClick={() => navigate("/student")}
        className="flex items-center gap-1 text-sm mb-6 cursor-pointer text-primaryColor/80 border border-transparent hover:border-primaryColor/80 px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-primaryColor/10"
      >
        <IoChevronBackSharp />
        <p>Back</p>
      </button>

      {/* Assignments */}
      <h1 className="text-2xl font-semibold mb-6 border-b pb-2">Assignments</h1>
      <div className="grid md:grid-cols-2 gap-6 md:gap-10">
        {currentSubject.assignments.length > 0 ? (
          currentSubject.assignments.map((ass, index) => {
            const [remaining, setRemaining] = useState(
              getRemainingTime(ass.deadline)
            );

            // Update countdown every second
            useEffect(() => {
              const timer = setInterval(() => {
                setRemaining(getRemainingTime(ass.deadline));
              }, 1000);

              return () => clearInterval(timer);
            }, [ass.deadline]);

            return (
              <div
                key={index}
                className="p-4 sm:p-6 md:p-8 border border-primaryColor/30 rounded-lg hover:-translate-y-2 duration-300 transition-transform ease-linear"
              >
                <p className="font-medium text-xl">{ass.assignmentTitle}</p>
                <p className="mt-4 text-primaryColor/80 text-sm">
                  {ass.assignmentDescription}
                </p>

                <div className="mt-4">
                  <p className="font-medium">Attached Files:</p>
                  <div className="flex items-center gap-2">
                    {ass.assignmentFiles.map((item, idx) => (
                      <a
                        key={idx}
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

                <div className="mt-4">
                  <p className="text-red-600">Deadline</p>
                  <p className="text-red-600">
                    {new Date(ass.deadline).toLocaleString()}
                  </p>
                  <p className="font-medium mt-2">Time Remaining</p>
                  <p className="text-primaryColor/80">{remaining}</p>
                </div>
                <button className="mt-6 bg-primaryColor text-white py-2 text-sm px-8 rounded-md hover:bg-primaryColor/80 duration-300 transition-all ease-in-out">
                  Submit your assignment
                </button>
              </div>
            );
          })
        ) : (
          <div className="text-center">
            <p className="text-primaryColor/80">No assignments yet.</p>
          </div>
        )}
      </div>
      {/* Quizzes */}
      <h1 className="text-2xl font-semibold mb-6 mt-8 border-b pb-2">
        Quizzes
      </h1>

      <div className="grid md:grid-cols-2 gap-6 md:gap-10">
        {currentSubject.quizzes.length > 0 ? (
          currentSubject.quizzes.map((qs, index) => {
            const [remaining, setRemaining] = useState(
              getRemainingTime(qs.deadline)
            );

            // Update countdown every second
            useEffect(() => {
              const timer = setInterval(() => {
                setRemaining(getRemainingTime(qs.deadline));
              }, 1000);

              return () => clearInterval(timer);
            }, [qs.deadline]);

            return (
              <div
                key={index}
                className="p-4 sm:p-6 md:p-8 border border-primaryColor/30 rounded-lg hover:-translate-y-2 duration-300 transition-transform ease-linear"
              >
                <p className="font-medium text-xl">{qs.quizTitle}</p>
                <p className="mt-4 text-primaryColor/80 text-sm">
                  {qs.quizDescription}
                </p>

                <div className="mt-4">
                  <p className="font-medium">Attached Files:</p>
                  <div className="flex items-center gap-2">
                    {qs.quizFiles.map((item, idx) => (
                      <a
                        key={idx}
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

                <div className="mt-4">
                  <p className="text-red-600">Deadline</p>
                  <p className="text-red-600">
                    {new Date(qs.deadline).toLocaleString()}
                  </p>
                  <p className="font-medium mt-2">Time Remaining</p>
                  <p className="text-primaryColor/80">{remaining}</p>
                </div>
                <button className="mt-6 bg-primaryColor text-white py-2 text-sm px-8 rounded-md hover:bg-primaryColor/80 duration-300 transition-all ease-in-out">
                  Submit your quiz
                </button>
              </div>
            );
          })
        ) : (
          <div className="text-center">
            <p className="text-primaryColor/80">No quizzes yet.</p>
          </div>
        )}
      </div>
      {/* Resources */}
      <h1 className="text-2xl font-semibold mb-6 mt-8 border-b pb-2">
        Resources
      </h1>
      <div>
        {currentSubject.resources.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            {currentSubject.resources.map((res, index) => (
              <div
                key={index}
                className="p-4 sm:p-6 md:p-8 border border-primaryColor/30 rounded-lg hover:-translate-y-2 duration-300 transition-transform ease-linear"
              >
                <p className="text-xl font-medium mb-2">{res.resourceTitle}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {res.resourceFiles.map((item, idx) => (
                    <a
                      key={idx}
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
            ))}
          </div>
        ) : (
          <div>
            <p className="text-primaryColor/80 text-center">No resources.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentSubject;
