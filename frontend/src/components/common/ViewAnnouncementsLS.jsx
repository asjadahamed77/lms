import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from './Loading'
import { useNavigate } from 'react-router-dom'

const ViewAnnouncementsLS = () => {
    const {announcements, user, loading} = useContext(AppContext)

    const navigate = useNavigate()
  
    
    if(loading){
        return <Loading />
    }

  return user && (
    <div className='mt-[-20px] w-full'>
      <h1 className="text-2xl font-semibold mb-6">Announcements</h1>
      {/* Display announcements */}
        {announcements.length === 0 ? (
            <p>No announcements available.</p>
        ) : (
            <div className="mb-6 flex md:grid md:grid-cols-2 overflow-x-auto w-full  gap-8">
            {announcements.slice(0,2).map((announcement,index) => (
                <div key={index} className=" border border-primaryColor/30 p-4 md:p-6 rounded-lg  w-full md:w-auto flex-shrink-0 ">
                <h2 className="font-medium text-lg">{announcement.title}</h2>
                <p className='text-sm text-primaryColor/80 my-4'>{announcement.description}</p>
                <p className="text-primaryColor/70">
                    Posted on: {new Date(announcement.createdAt).toLocaleString()}
                </p>
               
                </div>
            ))}
            
            </div>
        )}
        <div className='flex justify-center items-center gap-4  w-full mb-4'>
          <p className='w-20 h-0.5 bg-primaryColor/20 rounded-full'></p>
              <button onClick={()=> navigate('/student/announcements')} className=' border py-2.5 px-8 rounded-full text-primaryColor/70 border-primaryColor/20 text-sm cursor-pointer hover:scale-105 transform duration-300 ease-in-out transition-all'>
                View all announcements
              </button>
              <p className='w-20 h-0.5 bg-primaryColor/20 rounded-full'></p>
            </div>

    </div>
  )
}

export default ViewAnnouncementsLS

