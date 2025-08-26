import React from 'react'

const Sidebar = ({sidebar}) => {
  return (
    <div className={`${sidebar? "fixed inset-0 w-screen h-screen overflow-y-scroll duration-300 transition-all ease-in-out":""}  bg-white rounded border border-primaryColor/30 min-w-[250px] p-4 sm:p-6`}>
      Side bar contents
      <p>edyve</p>
      <p>eydjh</p>
      <p>efuej egiu</p>
    </div>
  )
}

export default Sidebar
