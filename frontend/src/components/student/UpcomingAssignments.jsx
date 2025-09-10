import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom';

const UpcomingAssignments = () => {
  const {upComingAss, loading} = useContext(AppContext) 
  console.log(upComingAss);
  const navigate = useNavigate()

  if(loading){
    return <div className='text-center mt-24'>Loading...</div>
  }
  
  return (
    <div>
      <h1 className='font-medium text-lg'>Upcoming Assignments</h1>
      <div className='mt-4 flex flex-col gap-2'>
    {
      upComingAss.length > 0 &&  upComingAss.map((ass,index)=>(
        <div key={index} onClick={()=> navigate(`/student/enrolled-subjects/${ass.subjectId}`)} className='border border-primaryColor/30 p-2 rounded-md cursor-pointer'>
          <p>{ass.title}</p>
          <p className='text-sm'>{ass.Subject.subjectName} - <span>{ass.Subject.subjectCode}</span></p>
        </div>
      ))
    }
      </div>
    </div>
  )
}

export default UpcomingAssignments
