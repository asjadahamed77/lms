import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from 'react-router-dom';
import { IoChevronBackSharp } from "react-icons/io5";
import Loading from "../../../components/common/Loading";

const ViewBatch = () => {
  const { batches, loading } = useContext(AppContext);
  const navigate = useNavigate()

  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

 
  const faculties = () => [...new Set(batches.map(batch => batch.facultyName))];

  
  const departments = () => [...new Set(batches.map(batch => batch.departmentName))];

  // filter batches based on selected faculty & department
  const filteredBatch = () => {
    return batches.filter(batch => {
      return (
        (selectedFaculty === "" || batch.facultyName === selectedFaculty) &&
        (selectedDepartment === "" || batch.departmentName === selectedDepartment)
      );
    });
  };

  if (loading) {
    return <Loading />
  }

  return (
    <div className="py-8 md:py-12">
<button onClick={()=>navigate('/admin/batch-management')} className='flex items-center gap-1 text-sm  cursor-pointer  text-primaryColor/80 border border-transparent hover:border-primaryColor/80 px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-primaryColor/10'>
<p>
        <IoChevronBackSharp className='' />
</p>
<p>Back</p>
      </button>


      {/* Header */}
      <div className="flex flex-col md:flex-row justify-start md:items-center md:justify-between md:gap-6 gap-4">
        <h1 className="text-2xl font-semibold">View Batches</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-start md:items-center gap-2 md:gap-8">
          <div className="w-full md:w-auto">
            <p className="text-primaryColor/80 mb-1">Filter by Faculty</p>
            <select
              className="w-full border p-2 border-primaryColor/80 rounded"
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
            >
              <option value="">-- Select --</option>
              {faculties().map((faculty, index) => (
                <option key={index} value={faculty}>
                  {faculty}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-auto">
            <p className="text-primaryColor/80 mb-1">Filter by Department</p>
            <select
              className="w-full border border-primaryColor/80  p-2 rounded"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">-- Select --</option>
              {departments().map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Display Batches */}
     <div className="overflow-x-auto mt-8   border border-primaryColor/30">
     <table className="w-full ">
        <thead className="bg-blue-100">
          <tr>
            <th className="text-start p-2">Batch ID</th>
            <th className="text-start p-2">Batch</th>
            <th className="text-start p-2">Faculty</th>
            <th className="text-start p-2">Department</th>
            <th className="text-start p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredBatch().map((batch, index) => (
            <tr key={index} className="hover:bg-blue-50">
              <td className="text-start p-2">#{batch.batchId.substring(0, 10)}</td>
              <td className="text-start p-2">{batch.batchName}</td>
              <td className="text-start p-2">{batch.facultyName}</td>
              <td className="text-start p-2">{batch.departmentName}</td>
              <td className="text-start p-2">
                <button className="px-3 py-1  bg-red-500 text-white rounded-md text-sm hover:bg-red-400 cursor-pointer">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     </div>
    </div>
  );
};

export default ViewBatch;
