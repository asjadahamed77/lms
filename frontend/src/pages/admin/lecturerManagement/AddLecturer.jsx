import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { AppContext } from "../../../context/AppContext";
import Loading from "../../../components/common/Loading";
import { createLecturer } from "../../../service/adminLecturer";
import toast from "react-hot-toast";
const AddLecturer = () => {
  const navigate = useNavigate();
  const { batches, loading, getAdminLecturers } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    nameWithInitials: "",
    registrationNumber: "",
    email: "",
    password: "",
    facultyName: "",
    departmentName: "",
    
  });

  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value})
  }


// Get unique faculties
const faculties = [...new Set(batches.map((batch) => batch.facultyName))];

// Get unique departments for selected faculty
const departmentsOfFaculty = [
  ...new Set(
    batches
      .filter((batch) => batch.facultyName === formData.facultyName)
      .map((batch) => batch.departmentName)
  ),
];





    const submitHandler = async (e) => {
      e.preventDefault();
      try {
        const response = await createLecturer(formData);
        if (response.success) {
          toast.success(response.message);
          setFormData({
            name: "",
            nameWithInitials: "",
            registrationNumber: "",
            email: "",
            password: "",
            facultyName: "",
            departmentName: "",
           
          });
          await getAdminLecturers();
        }
      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      }
    };

  if(loading){
    return <Loading />
  }

  
  

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
              name="name"
              onChange={onChangeHandler}
              value={formData.name}
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
                name="nameWithInitials"
                onChange={onChangeHandler}
                value={formData.nameWithInitials}
                className="p-2 w-full rounded border border-primaryColor/30"
                required
              />
            </div>
            <div className="flex flex-col  gap-2 flex-1 ">
              <label className="font-semibold">Registration Number</label>
              <input
                type="text"
                placeholder="20APSE4839"
                name="registrationNumber"
                onChange={onChangeHandler}
                value={formData.registrationNumber}
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
                name="email"
                onChange={onChangeHandler}
                value={formData.email}
                placeholder="mjaahamed@com.ac.lk"
                className="p-2 w-full rounded border border-primaryColor/30"
                required
              />
            </div>
            <div className="flex flex-col  gap-2 flex-1 ">
              <label className="font-semibold">Password</label>
              <input
                type="text"
                name="password"
                onChange={onChangeHandler}
                value={formData.password}
                placeholder="********"
                className="p-2 w-full rounded border border-primaryColor/30"
                required
              />
            </div>
          </div>

   <div className="flex flex-col gap-4">
            {/* Faculty */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Select Faculty</label>
              <select
                name="facultyName"
                value={formData.facultyName}
                onChange={onChangeHandler}
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

            {/* Department */}
            {formData.facultyName && (
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Select Department</label>
                <select
                  name="departmentName"
                  value={formData.departmentName}
                  onChange={onChangeHandler}
                  className="p-2 w-full rounded border border-primaryColor/30"
                  required
                >
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
