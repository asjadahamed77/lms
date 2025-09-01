import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { AppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";
import { createSubject } from "../../../service/adminSubject";
import Loading from "../../../components/common/Loading";

const AddSubject = () => {
  const navigate = useNavigate();
  const { batches, loading, getAdminSubjects } = useContext(AppContext);

  const [formData, setFormData] = useState({
    batchName: "",
    facultyName: "",
    departmentName: "",
    subjectName: "",
    subjectCode: "",
    subjectSemester: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  // Get unique batch names for selected department
  const batchesOfDepartment = [
    ...new Set(
      batches
        .filter(
          (batch) =>
            batch.facultyName === formData.facultyName &&
            batch.departmentName === formData.departmentName
        )
        .map((batch) => batch.batchName)
    ),
  ];

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await createSubject(formData);
      if (response.success) {
        toast.success(response.message);
        setFormData({
          batchName: "",
          facultyName: "",
          departmentName: "",
          subjectName: "",
          subjectCode: "",
          subjectSemester: "",
        });
        await getAdminSubjects();
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="py-8 md:py-12">
      <button
        onClick={() => navigate("/admin/subject-management")}
        className="flex items-center gap-1 text-sm mb-6 cursor-pointer text-primaryColor/80 border border-transparent hover:border-primaryColor/80 px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-primaryColor/10"
      >
        <IoChevronBackSharp />
        <p>Back</p>
      </button>

      <div className="w-full sm:w-3/4 md:w-1/2 mx-auto border rounded-xl border-primaryColor/30 px-2 sm:px-4 md:px-6 py-8">
        <h1 className="text-2xl font-semibold">Add Subject</h1>

        <form onSubmit={submitHandler} className="flex flex-col gap-4 mt-6">
          {/* Subject Name & Code */}
          <div className="flex md:flex-row flex-col gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="font-semibold">Subject Name</label>
              <input
                type="text"
                name="subjectName"
                value={formData.subjectName}
                onChange={onChangeHandler}
                placeholder="Software Architectures"
                className="p-2 w-full rounded border border-primaryColor/30"
                required
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="font-semibold">Subject Code</label>
              <input
                type="text"
                name="subjectCode"
                value={formData.subjectCode}
                onChange={onChangeHandler}
                placeholder="SE2105"
                className="p-2 w-full rounded border border-primaryColor/30"
                required
              />
            </div>
          </div>

          {/* Faculty & Department */}
          <div className="flex md:flex-row flex-col gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="font-semibold">Select Faculty</label>
              <select
                name="facultyName"
                value={formData.facultyName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    facultyName: e.target.value,
                    departmentName: "",
                    batchName: "",
                  })
                }
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

            {formData.facultyName && (
              <div className="flex flex-col gap-2 flex-1">
                <label className="font-semibold">Select Department</label>
                <select
                  name="departmentName"
                  value={formData.departmentName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      departmentName: e.target.value,
                      batchName: "",
                    })
                  }
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

          {/* Semester & Batch */}
          <div className="flex md:flex-row flex-col gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="font-semibold">Select Semester</label>
              <select
                name="subjectSemester"
                value={formData.subjectSemester}
                onChange={onChangeHandler}
                className="p-2 w-full rounded border border-primaryColor/30"
                required
              >
                <option value="">-- SELECT --</option>
                {[...Array(8)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    SEMESTER {i + 1}
                  </option>
                ))}
              </select>
            </div>

            {formData.departmentName && (
              <div className="flex flex-col gap-2 flex-1">
                <label className="font-semibold">Select Batch</label>
                <select
                  name="batchName"
                  value={formData.batchName}
                  onChange={onChangeHandler}
                  className="p-2 w-full rounded border border-primaryColor/30"
                  required
                >
                  <option value="">-- SELECT --</option>
                  {batchesOfDepartment.map((batch, index) => (
                    <option key={index} value={batch}>
                      {batch}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-primaryColor py-3 text-white w-full rounded-lg mt-4 cursor-pointer hover:bg-primaryColor/80 duration-300 transition-all ease-in-out"
          >
            Add Subject
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSubject;
