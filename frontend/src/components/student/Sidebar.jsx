import React from 'react'
import UpcomingAssignments from './UpcomingAssignments'
import { IoClose } from "react-icons/io5";


const Sidebar = ({sidebar, setSidebar}) => {
  return (
    <div className={`${sidebar? "fixed inset-0 w-screen h-screen overflow-y-scroll duration-300 transition-all ease-in-out":""}  bg-white rounded border border-primaryColor/30 min-w-[250px] p-4 sm:p-6`}>
      <div className='flex items-center justify-end'>
<p onClick={()=> setSidebar(false)} className='sm:hidden'>
  <IoClose className='text-2xl cursor-pointer' />
</p>
      </div>
     <UpcomingAssignments />
    </div>
  )
}

export default Sidebar
