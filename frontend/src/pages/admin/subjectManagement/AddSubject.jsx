import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { AppContext } from "../../../context/AppContext";
const AddSubject = () => {
  const navigate = useNavigate();
  const { batches } = useContext(AppContext);
  const [selectedFaculty, setSelectedFaculty] = useState("");

  // Get unique faculties
  const faculties = [...new Set(batches.map((batch) => batch.facultyName))];
  const uniqueBatches = [...new Set(batches.map((batch)=> batch.batchName))]

  // Get Department of seleceted faculty
  const departmentsOfFaculty = batches
    .filter((batch) => batch.facultyName === selectedFaculty)
    .map((batch) => batch.departmentName);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  
  

  return (
    <div className="py-8 md:py-12">
      <button
        onClick={() => navigate("/admin/subject-management")}
        className="flex items-center gap-1 text-sm mb-6 cursor-pointer  text-primaryColor/80 border border-transparent hover:border-primaryColor/80 px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-primaryColor/10"
      >
        <p>
          <IoChevronBackSharp className="" />
        </p>
        <p>Back</p>
      </button>
      <div className="w-full sm:w-3/4 md:w-1/2  mx-auto border rounded-xl border-primaryColor/30 px-2 sm:px-4 md:px-6 py-8 ">
        <h1 className="text-2xl font-semibold">Add Subject</h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-4 mt-6">
         
          <div className="flex md:flex-row flex-col gap-4">
          <div className="flex flex-col  gap-2  flex-1">
            <label className="font-semibold">Subject Name</label>
            <input
              type="text"
              placeholder="Software Architectures"
              className="p-2 w-full rounded border border-primaryColor/30"
              required
            />
          </div>
            <div className="flex flex-col  gap-2 flex-1 ">
              <label className="font-semibold">Subject Code</label>
              <input
                type="text"
                placeholder="SE2105"
                className="p-2 w-full rounded border border-primaryColor/30"
                required
              />
            </div>
            
          </div>
          

          <div className="flex md:flex-row flex-col gap-4">
            <div className="flex flex-col  gap-2 flex-1 ">
              <label className="font-semibold">Select Faculty</label>
              <select
                value={selectedFaculty}
                onChange={(e) => setSelectedFaculty(e.target.value)}
                className="p-2 w-full rounded border border-primaryColor/30"
                required
              >
                <option value="">-- SELECT --</option>
                {faculties.map((faculty, index) => (
                  <option key={index} value={faculty}>
                    {faculty}
                  </option>
                ))}
              </select>
            </div>
            {selectedFaculty && (
              <div className="flex flex-col  gap-2 flex-1 ">
                <label className="font-semibold">Select Department</label>
                <select className="p-2 w-full rounded border border-primaryColor/30" required>
                  <option value="">-- SELECT --</option>
                  {departmentsOfFaculty.map((dept, index) => (
                    <option key={index} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
         <div className="flex md:flex-row flex-col gap-4">
         <div className="flex flex-col  gap-2 flex-1">
          <label className="font-semibold">Select Semester</label>
            <select className="p-2 w-full rounded border border-primaryColor/30" required>
            <option value="">-- SELECT --</option>
            <option value="1">SEMESTER 01</option>
            <option value="2">SEMESTER 02</option>
            <option value="3">SEMESTER 03</option>
            <option value="4">SEMESTER 04</option>
            <option value="5">SEMESTER 05</option>
            <option value="6">SEMESTER 06</option>
            <option value="7">SEMESTER 07</option>
            <option value="8">SEMESTER 08</option>
            </select>
          </div>
          <div className="flex flex-col  gap-2 flex-1">
          <label className="font-semibold">Select Batch</label>
            <select className="p-2 w-full rounded border border-primaryColor/30" required>
            <option value="">-- SELECT --</option>
            {
              uniqueBatches.map((batch,index)=>(
                <option key={index} value={batch}>{batch}</option>
              ))
            }
            </select>
          </div>
         </div>

          <button
            type="submit"
            className="bg-primaryColor py-3 text-white w-full rounded-lg  mt-4 cursor-pointer hover:bg-primaryColor/80 duration-300 transition-all ease-in-out"
          >
            Add Subject
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSubject;
