import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()
  return (
    <div className='flex justify-center mx-auto pt-20'>
      <div className='flex flex-col items-center justify-center  mx-4 bg-red-100 p-8 rounded-xl border border-red-300'>
        <h1 className='text-6xl text-wrap text-red-500 text-center'>Not Found</h1>
        <p className='text-wrap text-center text-sm mt-4 text-red-400'>This page is not found. Click back to login button to login again.</p>
        <button onClick={()=>navigate('/')} className='mt-8 text-sm bg-red-500 cursor-pointer text-white px-12 py-2 rounded-md hover:bg-red-400 duration-300 transition-all ease-in-out'>
            Back to Login
        </button>
      </div>
    </div>
  )
}

export default NotFound
