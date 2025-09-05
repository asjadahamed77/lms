import React, { useContext } from 'react'
import { AppContext } from '../../../context/AppContext'
import Loading from '../../../components/common/Loading'
import { useNavigate, useParams } from 'react-router-dom'
import { IoChevronBackSharp } from 'react-icons/io5'

const ViewAssignmentSubmissions = () => {
  const { assignmentId } = useParams()
  const { assignmentSubmissions, loading } = useContext(AppContext)
  const navigate = useNavigate()

  // Filter submissions that belong to the current assignment
  const submissionsForAssignment = assignmentSubmissions.filter(
    (sub) => sub.assignmentId === assignmentId
  )

  console.log(submissionsForAssignment);
  

  if (loading) {
    return <Loading />
  }

  if (!submissionsForAssignment.length) {
    return (
      <div className="py-8 md:py-12">
        <button
          onClick={() =>
            navigate('/lecturer/assignment-management/view-assignments')
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
          navigate('/lecturer/assignment-management/view-assignments')
        }
        className="flex items-center gap-1 text-sm mb-6 cursor-pointer text-primaryColor/80 border border-transparent hover:border-primaryColor/80 px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-primaryColor/10"
      >
        <IoChevronBackSharp />
        <p>Back</p>
      </button>

      {/* Display all submissions for the assignment */}
      <div className="flex flex-col gap-4 sm:gap-6 mt-6">
        {submissionsForAssignment.map((submission, index) => (
          <div
            key={index}
               className="border border-primaryColor/30 rounded-lg sm:rounded-2xl p-4 sm:p-6 lg:p-8"
          >
          
          </div>
        ))}
      </div>
    </div>
  )
}

export default ViewAssignmentSubmissions
