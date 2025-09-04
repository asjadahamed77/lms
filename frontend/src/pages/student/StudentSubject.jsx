import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { IoChevronBackSharp } from "react-icons/io5";
import { FaFileAlt, FaFileImage, FaFilePdf, FaFileWord } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import Loading from "../../components/common/Loading";
import { submitAssignment } from "../../service/assignmentService";
import { submitQuiz } from "../../service/quizService";

const StudentSubject = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const { user, loading, setLoading } = useContext(AppContext);
  const currentSubject = user.subjects.find(
    (sub) => sub.subjectId === subjectId
  );


  const [assignmentFormData, setAssignmentFormData] = useState({
    assignmentTitle: "",
   
    assignmentFiles: [],
  });

  const [quizFormData, setQuizFormData] = useState({
    quizTitleTitle: "",
   
    quizFiles: [],
  });

  const [showSubmitAssignmentPopup, setShowSubmitAssignmentPopup] =
    useState(false);
  const [showSubmitQuizPopup, setShowSubmitQuizPopup] = useState(false);

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

   // handle text input
   const handleAssignmentChange = (e) => {
    const { name, value } = e.target;
    setAssignmentFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

   // handle text input
   const handleQuizChange = (e) => {
    const { name, value } = e.target;
    setQuizFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

    // handle file input
    const handleAssignmentFileChange = (e) => {
      setAssignmentFormData((prev) => ({
        ...prev,
        files: e.target.files,
      }));
    };
      // handle file input
  const handleQuizFileChange = (e) => {
    setQuizFormData((prev) => ({
      ...prev,
      files: e.target.files,
    }));
  };

  const assignmentSubmitHandler = async (e, ass) => {
    e.preventDefault();
    
    if(!assignmentFormData.assignmentTitle){
      toast.error("Please enter assignment title");
      setLoading(false)
      return;
    }
    setLoading(true)
    try {
    const form = new FormData();
    form.append("submitTitle", assignmentFormData.assignmentTitle);
   
    
    if (assignmentFormData.assignmentFiles && assignmentFormData.assignmentFiles.length > 0) {
      for (let i = 0; i < assignmentFormData.assignmentFiles.length; i++) {
        form.append("files", assignmentFormData.assignmentFiles[i]);
      }
    }
    const response = await submitAssignment({assignmentId:ass.assignmentId,form})
    if (response.success) {
      toast.success(response.message);
      setShowSubmitAssignmentPopup(false);
      setAssignmentFormData({
        assignmentTitle: "",
        assignmentFiles: [],
      })
      setLoading(false)
    }
    } catch (error) {
      toast.error("Failed to submit assignment. Please try again.");
      console.error("Assignment Submit Error:", error);
      setLoading(false)
    }
  };
  const quizSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const form = new FormData();
      form.append("submitTitle", quizFormData.quizTitle);
      if (quizFormData.quizFiles && quizFormData.quizFiles.length > 0) {
        for (let i = 0; i < quizFormData.quizFiles.length; i++) {
          form.append("files", quizFormData.quizFiles[i]);
        }
      }
      const response = await submitQuiz({quizId:currentSubject.Quizzes.quizId,form})
      if (response.success) {
        toast.success(response.message);
        setShowSubmitQuizPopup(false);
        setQuizFormData({
          quizTitle: "",
          quizFiles: [],
        })
        setLoading(false)
      }
    } catch (error) {
      toast.error("Failed to submit quiz. Please try again.");
      console.error("Quiz Submit Error:", error);
      setLoading(false)
    }
  };

  if(loading){
    return <Loading />
  }

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
      {currentSubject.Assignments.length > 0 ? (
  currentSubject.Assignments.map((ass, index) => {
    const [remaining, setRemaining] = useState(getRemainingTime(ass.deadline));

    useEffect(() => {
      const timer = setInterval(() => {
        setRemaining(getRemainingTime(ass.deadline));
      }, 1000);

      return () => clearInterval(timer);
    }, [ass.deadline]);

    return (
      <div key={index} className="p-4 sm:p-6 md:p-8 border border-primaryColor/30 rounded-lg hover:-translate-y-2 duration-300 transition-transform ease-linear">
        <p className="font-medium text-xl">{ass.title}</p>
        <p className="mt-4 text-primaryColor/80 text-sm">{ass.description}</p>

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
          <p className="text-red-600">{new Date(ass.deadline).toLocaleString()}</p>
          <p className="font-medium mt-2">Time Remaining</p>
          <p className="text-primaryColor/80">{remaining}</p>
        </div>

        <button
          onClick={() => setShowSubmitAssignmentPopup(true)}
          className="mt-6 bg-primaryColor text-white py-2 text-sm px-8 rounded-md hover:bg-primaryColor/80 duration-300 transition-all ease-in-out cursor-pointer"
        >
          Submit your assignment
        </button>

        {/* Assignment Submit Popup */}
        {showSubmitAssignmentPopup && (
          <div className="w-screen h-screen fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
            <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 w-full mx-4 sm:m-0 sm:w-[450px]">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-medium">Submit now</h1>
                <p
                  onClick={() => setShowSubmitAssignmentPopup(false)}
                  className="text-2xl cursor-pointer"
                >
                  <IoCloseSharp />
                </p>
              </div>
              <form
                onSubmit={(e) => assignmentSubmitHandler(e, ass)}
                className="mt-6 flex flex-col gap-4"
              >
                <div className="flex flex-col gap-2">
                  <label className="font-semibold">Title</label>
                  <input
                    type="text"
                    placeholder="Title ..."
                    name="assignmentTitle"
                    onChange={handleAssignmentChange}
                    value={assignmentFormData.assignmentTitle}
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
                    onChange={handleAssignmentFileChange}
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
      </div>
    );
  })
) : (
  <div className="text-center">
    <p className="text-primaryColor/80">No assignments yet.</p>
  </div>
)}

        {/* Assignment Submit Popup */}
        {showSubmitAssignmentPopup && (
          <div className="w-screen h-screen fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
            <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 w-full mx-4 sm:m-0 sm:w-[450px]">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-medium">Submit now</h1>
                <p
                  onClick={() => setShowSubmitAssignmentPopup(false)}
                  className="text-2xl cursor-pointer"
                >
                  <IoCloseSharp />
                </p>
              </div>
              <form
               onSubmit={(e) => assignmentSubmitHandler(e, ass)}

                className="mt-6 flex flex-col gap-4"
              >
                <div className="flex flex-col gap-2">
                  <label className="font-semibold">Title</label>
                  <input
                    type="text"
                    placeholder="Title ..."
                    name="assignmentTitle"
                    onChange={handleAssignmentChange}
                    value={assignmentFormData.assignmentTitle}
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
                 onChange={handleAssignmentFileChange}
                    className="p-2 w-full rounded border border-primaryColor/30"
                  />
                </div>
                <button type="submit" className="bg-primaryColor text-white py-2 text-sm px-8 rounded-md hover:bg-primaryColor/80 duration-300 transition-all ease-in-out cursor-pointer mt-4">
                  Submit now
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      {/* Quizzes */}
      <h1 className="text-2xl font-semibold mb-6 mt-8 border-b pb-2">
        Quizzes
      </h1>

      <div className="grid md:grid-cols-2 gap-6 md:gap-10">
        {currentSubject.Quizzes.length > 0 ? (
          currentSubject.Quizzes.map((qs, index) => {
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
                <p className="font-medium text-xl">{qs.title}</p>
                <p className="mt-4 text-primaryColor/80 text-sm">
                  {qs.description}
                </p>

                <div className="mt-4">
                  <p className="font-medium">Attached Files:</p>
                  <div className="flex items-center gap-2">
                    {qs.fileUrl.map((url, idx) => {
                      return (
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
                      );
                    })}
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
                <button
                  onClick={() => setShowSubmitQuizPopup(true)}
                  className="mt-6 bg-primaryColor text-white py-2 text-sm px-8 rounded-md hover:bg-primaryColor/80 duration-300 transition-all ease-in-out cursor-pointer"
                >
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
        {/* Quiz Submit Popup */}
        {showSubmitQuizPopup && (
          <div className="w-screen h-screen fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
            <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 w-full mx-4 sm:m-0 sm:w-[450px]">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-medium">Submit now</h1>
                <p
                  onClick={() => setShowSubmitQuizPopup(false)}
                  className="text-2xl cursor-pointer"
                >
                  <IoCloseSharp />
                </p>
              </div>
              <form
                onSubmit={quizSubmitHandler}
                className="mt-6 flex flex-col gap-4"
              >
                <div className="flex flex-col gap-2">
                  <label className="font-semibold">Title</label>
                  <input
                    type="text"
                    placeholder="Title ..."
                    name="quizTitle"
                    onChange={handleQuizChange}
                    value={quizFormData.quizTitle}
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
                    onChange={handleQuizFileChange}
                    className="p-2 w-full rounded border border-primaryColor/30"
                  />
                </div>
                <button type="submit" className="bg-primaryColor text-white py-2 text-sm px-8 rounded-md hover:bg-primaryColor/80 duration-300 transition-all ease-in-out cursor-pointer mt-4">
                  Submit now
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      {/* Resources */}
      <h1 className="text-2xl font-semibold mb-6 mt-8 border-b pb-2">
        Resources
      </h1>
      <div>
        {currentSubject.Resources.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            {currentSubject.Resources.map((res, index) => (
              <div
                key={index}
                className="p-4 sm:p-6 md:p-8 border border-primaryColor/30 rounded-lg hover:-translate-y-2 duration-300 transition-transform ease-linear"
              >
                <p className="text-xl font-medium mb-2">{res.title}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {res.fileUrl.map((url, idx) => {
                    return (
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
                    );
                  })}
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
