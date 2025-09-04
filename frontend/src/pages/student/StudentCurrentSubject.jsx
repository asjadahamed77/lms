import React, { useContext } from "react";
import ViewStudentAssignments from "./ViewStudentAssignments";
import ViewStudentQuiz from "./ViewStudentQuiz";
import ViewStudentResources from "./ViewStudentResources";
import { useNavigate, useParams } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { AppContext } from "../../context/AppContext";

const StudentCurrentSubject = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const {user} = useContext(AppContext)

  const currentSubject = user.subjects.find(
    (sub) => sub.subjectId === subjectId
  );

  

  return (
    <div className="py-8 md:py-12">
      <button
        onClick={() => navigate("/student")}
        className="flex items-center gap-1 text-sm mb-6 cursor-pointer text-primaryColor/80 border border-transparent hover:border-primaryColor/80 px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-primaryColor/10"
      >
        <IoChevronBackSharp />
        <p>Back</p>
      </button>

      <div>
        <ViewStudentAssignments currentSubject={currentSubject} user={user} />
        <ViewStudentQuiz currentSubject={currentSubject} user={user} />
        <ViewStudentResources currentSubject={currentSubject} user={user} />
      </div>
    </div>
  );
};

export default StudentCurrentSubject;
