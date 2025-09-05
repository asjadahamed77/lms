import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaFileAlt, FaFileImage, FaFilePdf, FaFileWord } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import {  submitQuiz } from "../../service/submissionService";
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

const ViewStudentQuiz = ({ currentSubject, user }) => {

    const {loading, setLoading} = useContext(AppContext)

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

  const [selectedQuiz, setSelectedQuiz] = useState(null);

  

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
        setLoading(true)
        const form = new FormData();
        form.append("title", formData.title);
        form.append("quizId", selectedQuiz.quizId);
        form.append("studentId", user.userId);
        form.append("batchName", user.batchName);
        form.append("departmentName", user.departmentName);
        form.append("studentName", user.name);
        form.append("subjectName", currentSubject.subjectName);
        form.append("deadline", selectedQuiz.deadline);
        if (formData.files && formData.files.length > 0) {
            for (let i = 0; i < formData.files.length; i++) {
              form.append("files", formData.files[i]);
            }
          }

          const response = await submitQuiz({userId: user.userId, formData: form});

          if(response.success){
            toast.success(response.message);
            setPopup(false);
            setSelectedQuiz(null);
            setFormData({
                title: "",
                files: [],
            });
            setLoading(false)
          }else{
            toast.error(response.message)
          }

    } catch (error) {
        toast.error("Quiz Submission failed. Please try again.");
        console.error("Quiz Submission Error:", error);
    }finally{
        setLoading(false)
    }
  };

  if(loading){
    return <Loading />
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6 border-b pb-2">Quizzes</h1>

      <div className="grid md:grid-cols-2 gap-6 md:gap-10">
        {currentSubject.Quizzes.length === 0 ? (
          <div>
            <p>No quizzes yet.</p>
          </div>
        ) : (
          currentSubject.Quizzes.map((ass, index) => (
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

              <button
                onClick={() => {setPopup(true); setSelectedQuiz(ass)}}
                className="mt-6 bg-primaryColor text-white py-2 text-sm px-8 rounded-md hover:bg-primaryColor/80 duration-300 transition-all ease-in-out cursor-pointer"
              >
                Submit your quiz
              </button>
            </div>
          ))
        )}
      </div>

      {popup && selectedQuiz && (
        <div className=" fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
          <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 w-full mx-4 sm:m-0 sm:w-[450px]">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-medium">Submit now</h1>
              <p
                onClick={() => {setPopup(false); setSelectedQuiz(null)}}
                className="text-2xl cursor-pointer"
              >
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
    </div>
  );
};

export default ViewStudentQuiz;
