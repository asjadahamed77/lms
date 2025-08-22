import React from 'react'
import { MdLibraryAdd } from "react-icons/md";
import { LuGroup } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { IoChevronBackSharp } from "react-icons/io5";


const BatchManagement = () => {
  const navigate = useNavigate();
  return (
    <div className="py-8 md:py-12"  >
      <button onClick={()=>navigate('/admin')} className='flex items-center gap-1 text-sm mb-6 cursor-pointer  text-primaryColor/80 border border-transparent hover:border-primaryColor/80 px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-primaryColor/10'>
<p>
        <IoChevronBackSharp className='' />
</p>
<p>Back</p>
      </button>
     <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3  gap-8 md:gap-12'>
       {/* Add Batch */}
       <div onClick={()=> navigate('/admin/batch-management/add-batch')} className="text-white flex items-center gap-6 bg-[#213448] p-8 cursor-pointer rounded-2xl hover:-translate-y-2 duration-300 transition-all ease-in-out ">
        <p className="text-4xl">
          <MdLibraryAdd />
        </p>
        <p className="text-3xl">Add Batch</p>
      </div>
       {/* View Batches */}
       <div onClick={()=> navigate('/admin/batch-management/view-batches')} className="text-white flex items-center gap-6 bg-[#CB0404] p-8 cursor-pointer rounded-2xl hover:-translate-y-2 duration-300 transition-all ease-in-out ">
        <p className="text-4xl">
          <LuGroup />
        </p>
        <p className="text-3xl">View Batches</p>
      </div>
     </div>
    </div>
  )
}

export default BatchManagement
