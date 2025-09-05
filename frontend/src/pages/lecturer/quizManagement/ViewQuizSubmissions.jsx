import React, { useContext } from 'react'
import { AppContext } from '../../../context/AppContext'
import Loading from '../../../components/common/Loading'
import { useNavigate, useParams } from 'react-router-dom'
import { IoChevronBackSharp } from 'react-icons/io5'
import {
    FaFilePdf,
    FaFileWord,
    FaFileImage,
    FaFileAlt,
    FaDownload,
  } from "react-icons/fa";

const ViewQuizSubmissions = () => {
  const { quizId } = useParams()
  const { quizSubmissions, loading } = useContext(AppContext)
  const navigate = useNavigate()

  // Filter submissions that belong to the current assignment
  const submissionsForQuiz = quizSubmissions.filter(
    (sub) => sub.quizId === quizId
  )

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


  

  if (loading) {
    return <Loading />
  }

  if (!submissionsForQuiz.length) {
    return (
      <div className="py-8 md:py-12">
        <button
          onClick={() =>
            navigate('/lecturer/quiz-management/view-quizzes')
          }
          className="flex items-center gap-1 text-sm mb-6 cursor-pointer text-primaryColor/80 border border-transparent hover:border-primaryColor/80 px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-primaryColor/10"
        >
          <IoChevronBackSharp />
          <p>Back</p>
        </button>
        <p className="text-center text-2xl mt-20 text-primaryColor/70">
          No Submissions Found
        </p>
      </div>
    )
  }

  return (
    <div className="py-8 md:py-12">
      <button
        onClick={() =>
          navigate('/lecturer/quiz-management/view-quizzes')
        }
        className="flex items-center gap-1 text-sm mb-6 cursor-pointer text-primaryColor/80 border border-transparent hover:border-primaryColor/80 px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-primaryColor/10"
      >
        <IoChevronBackSharp />
        <p>Back</p>
      </button>

      {/* Display all submissions for the assignment */}
      <div className="flex flex-col gap-4 sm:gap-6 mt-6">
        {submissionsForQuiz.map((submission, index) => (
          <div
            key={index}
               className="border border-primaryColor/30 rounded-lg sm:rounded-2xl p-4 sm:p-6 lg:p-8 flex sm:flex-row flex-col gap-4  sm:justify-between"
          >

            {/* Student Details */}
            <div>
            <h1 className='font-medium'>Student Details</h1>
            <p className="text-sm mt-2">Name: {submission.student.name}</p>
            <p className="text-sm mt-2">Reg No: {submission.student.registrationNumber}</p>
            <p className="text-sm mt-2">Department: {submission.student.departmentName}</p>
      
            </div>

            {/* Assignment Details */}
            <div>
            <h1 className='font-medium'>Quiz Details</h1>
            <p className="text-sm mt-2">Title: {submission.quiz.title}</p>
            <p className="text-sm mt-2">Batch: {submission.quiz.batchName}</p>
            <p className="text-sm mt-2">Deadline: {new Date(submission.quiz.deadline).toLocaleString()}</p>
            </div>

            {/* Submission details */}
            <div>
            <h1 className='font-medium'>Submission Details</h1>
            <p className="text-sm mt-2">Subject: {submission.subjectName}</p>
            <p className="text-sm mt-2">Title: {submission.title}</p>
            <p className="text-sm mt-2">Submitted At: {new Date(submission.submittedAt).toLocaleString()}</p>
            <div>
                <p className='text-sm mt-2'>Attached Files:</p>
                <div className="flex flex-wrap gap-4 mt-2">
                    {submission.fileUrl.length > 0 ? (
                      submission.fileUrl.map((file, idx) => {
                       
                     

                        return (
                          <div
                            key={idx}
                            className="flex items-center gap-2 bg-gray-100 p-2 rounded"
                          >
                            {getFileIcon(file.original_name )}

                            <a
                              href={file.public_id}
                              download={file.public_id}
                              target="_blank"
                              className="text-primaryColor hover:text-blue-700 inline-flex gap-2"
                              title="Download file"
                            >
                              <span className="text-sm max-w-[150px] truncate">
                                {file.original_name}
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
            </div>
          
          </div>
        ))}
      </div>
    </div>
  )
}

export default ViewQuizSubmissions
