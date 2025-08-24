import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { AppContext } from "../../../context/AppContext";
const AddLecturer = () => {
  const navigate = useNavigate();
  const { batches } = useContext(AppContext);
  const [selectedFaculty, setSelectedFaculty] = useState("");

  // Get unique faculties
  const faculties = [...new Set(batches.map((batch) => batch.facultyName))];

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
        onClick={() => navigate("/admin/lecturer-management")}
        className="flex items-center gap-1 text-sm mb-6 cursor-pointer  text-primaryColor/80 border border-transparent hover:border-primaryColor/80 px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-primaryColor/10"
      >
        <p>
          <IoChevronBackSharp className="" />
        </p>
        <p>Back</p>
      </button>
      <div className="w-full sm:w-3/4 md:w-1/2  mx-auto border rounded-xl border-primaryColor/30 px-2 sm:px-4 md:px-6 py-8 ">
        <h1 className="text-2xl font-semibold">Add Lecturer</h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-4 mt-6">
          <div className="flex flex-col  gap-2 ">
            <label className="font-semibold">Full Name</label>
            <input
              type="text"
              placeholder="Mohamed Jiffry Asjad Ahamed"
              className="p-2 w-full rounded border border-primaryColor/30"
              required
            />
          </div>
          <div className="flex md:flex-row flex-col gap-4">
            <div className="flex flex-col  gap-2 flex-1 ">
              <label className="font-semibold">Name with initials</label>
              <input
                type="text"
                placeholder="MJA Ahamed"
                className="p-2 w-full rounded border border-primaryColor/30"
                required
              />
            </div>
            <div className="flex flex-col  gap-2 flex-1 ">
              <label className="font-semibold">Registration Number</label>
              <input
                type="text"
                placeholder="20APSE4839"
                className="p-2 w-full rounded border border-primaryColor/30"
                required
              />
            </div>
          </div>
          <div className="flex md:flex-row flex-col gap-4">
            <div className="flex flex-col  gap-2 flex-1 ">
              <label className="font-semibold">Email</label>
              <input
                type="email"
                placeholder="mjaahamed@com.ac.lk"
                className="p-2 w-full rounded border border-primaryColor/30"
                required
              />
            </div>
            <div className="flex flex-col  gap-2 flex-1 ">
              <label className="font-semibold">Password</label>
              <input
                type="text"
                placeholder="********"
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
                <select className="p-2 w-full rounded border border-primaryColor/30">
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

          <button
            type="submit"
            className="bg-primaryColor py-3 text-white w-full rounded-lg  mt-4 cursor-pointer hover:bg-primaryColor/80 duration-300 transition-all ease-in-out"
          >
            Add Lecturer
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLecturer;
