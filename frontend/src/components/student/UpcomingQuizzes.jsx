import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom';

const UpcomingQuizzes = () => {
  const {upComingQuizzes, loading} = useContext(AppContext) 
  
  const navigate = useNavigate()


  
  
  

  if(loading){
    return <div className='text-center mt-24'>Loading...</div>
  }
  
  return (
    <div className='mt-8'>
      <h1 className='font-medium text-lg'>Upcoming Quizzes</h1>
      <div className='mt-4 flex flex-col gap-2'>
    {
      upComingQuizzes.length > 0 &&  upComingQuizzes.map((ass,index)=>(
        <div key={index} onClick={()=> navigate(`/student/enrolled-subjects/${ass.subjectId}`)} className='border border-primaryColor/30 p-2 rounded-md cursor-pointer hover:-translate-y-1 duration-300 ease-in-out'>
          <p>{ass.title}</p>
          <p className='text-sm'>{ass.Subject.subjectName} - <span>{ass.Subject.subjectCode}</span></p>
        
          
        </div>
      ))
    }
      </div>
    </div>
  )
}

export default UpcomingQuizzes




