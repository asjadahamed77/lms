import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoChevronBackSharp } from "react-icons/io5";
import toast from 'react-hot-toast';
import { createBatch } from '../../../service/adminBatch';
import { AppContext } from '../../../context/AppContext';
import Loading from '../../../components/common/Loading';

const AddBatch = () => {
  const navigate = useNavigate()
  const {loading, getAdminBatches, setLoading} = useContext(AppContext)
  const [formData, setFormData] = useState({
    batchName: '',
    facultyName: '',
    departmentName: '',
  })

  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value})
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true)
    
    try {
      const response = await createBatch(formData)
      if(response.success){
        toast.success(response.message)
        setFormData({
          batchName: '',
          facultyName: '',
          departmentName: '',
        })
        
        await getAdminBatches()
        setLoading(false)
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message)
      
    }
    
  }

  if(loading){
    return <Loading />
  }

  return (
    <div className='py-8 md:py-12'>
      <button onClick={()=>navigate('/admin/batch-management')} className='flex items-center gap-1 text-sm mb-6 cursor-pointer  text-primaryColor/80 border border-transparent hover:border-primaryColor/80 px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-primaryColor/10'>
<p>
        <IoChevronBackSharp className='' />
</p>
<p>Back</p>
      </button>
      <div className='w-full sm:w-3/4 md:w-1/2  mx-auto border rounded-xl border-primaryColor/30 px-2 sm:px-4 md:px-6 py-8 '>
          <h1 className='text-2xl font-semibold'>Add Batch</h1>
         <form onSubmit={submitHandler} className='flex flex-col gap-4 mt-6'>
         <div className='flex flex-col  gap-2 '>
          <label className="font-semibold">Batch Name</label>
          <input
              type="text"
              placeholder="If batch is 2020/2021 then type 2020/2021"
              className="p-2 w-full rounded border border-primaryColor/30"
              name='batchName'
              onChange={onChangeHandler}
              value={formData.batchName}
              required
            />
          </div>
          <div className='flex flex-col  gap-2 '>
          <label className="font-semibold">Faculty Name</label>
          <input
              type="text"
              placeholder="Faculty of Computing"
              className="p-2 w-full rounded border border-primaryColor/30"
              name='facultyName'
              onChange={onChangeHandler}
              value={formData.facultyName}
              required
            />
          </div>
          <div className='flex flex-col  gap-2 '>
          <label className="font-semibold">Department Name</label>
          <input
              type="text"
              placeholder="Department of Computer Science"
              className="p-2 w-full rounded border border-primaryColor/30"
              name='departmentName'
              onChange={onChangeHandler}
              value={formData.departmentName}
              required
            />
          </div>
          <button type='submit' className="bg-primaryColor py-3 text-white w-full rounded-lg  mt-4 cursor-pointer hover:bg-primaryColor/80 duration-300 transition-all ease-in-out">Add Batch</button>
         </form>

      </div>
    </div>
  )
}

export default AddBatch
