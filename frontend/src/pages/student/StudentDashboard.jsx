import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Sidebar from "../../components/student/Sidebar";
import { MdOutlineMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { GoFileSubmodule } from "react-icons/go";


const StudentDashboard = () => {
  const { student } = useContext(AppContext);
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate()

  // Get all unique semesters (sorted)
  const semesters = [
    ...new Set(student.subjects.map((s) => s.subjectSemester)),
  ].sort((a, b) => a - b);

  return (
    <div className="py-8 sm:py-12 flex md:flex-row flex-col gap-12 flex-wrap">
      {/* Sidebar */}
      <div>
        {!sidebar && (
          <div onClick={() => setSidebar(true)} className="text-2xl md:hidden">
            <MdOutlineMenu />
          </div>
        )}
        <div className={`${sidebar ? "block" : "hidden md:block"}`}>
          <Sidebar sidebar={sidebar} />
        </div>
      </div>

      {/* Main Section */}
      <div className="flex-1">
        <h1 className="text-2xl font-semibold mb-4">Enrolled Subjects</h1>

        {semesters.map((sem) => (
          <div
            key={sem}
            className="mb-6 "
          >
            <h2 className="text-xl font-medium mb-4">Semester 0{sem}</h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {student.subjects
                .filter((subj) => subj.subjectSemester === sem)
                .map((subj, idx) => (
                  <div 
                  key={idx} 
                  onClick={() => navigate(`/student/enrolled-subjects/${subj.subjectId}`)} 
                  className="border border-primaryColor/30 p-4 rounded-lg cursor-pointer transform hover:-translate-y-2 duration-300 ease-linear flex items-center gap-4"
                >
                   <p className="text-4xl">
                    <GoFileSubmodule />
                  </p>
                  <p className="font-medium">
                    {subj.subjectName} - {subj.subjectCode}
                  </p>
                 

                </div>
                
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
