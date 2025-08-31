import React, { createContext, useEffect, useState } from "react";
import { lecturer } from "../assets/lecturers";
import { announcements } from "../assets/announcements";
import { assignments } from "../assets/assignments";
import { quizzes } from "../assets/quizzes";
import { resources } from "../assets/resources";
import { student } from "../assets/student";
import { getAllBatches } from "../service/adminBatch";
import { getAllStudents } from "../service/adminStudent";
import { getAllLecturers } from "../service/adminLecturer";
import { getAllSubjects } from "../service/adminSubject";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

 
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [batches, setBatches] = useState([])
  const [students, setStudents] = useState([])
  const [lecturers, setLecturers] = useState([])
  const [subjects, setSubjects] = useState([])

  


  


  

  const getAdminBatches = async ()=> {
    if(user && user.role === "admin") {
      const response = await getAllBatches();
      if(response.success) {
        setBatches(response.batches)
      }
    }
  }

  const getAdminStudents = async ()=> {
    if (user && user.role === "admin") {
      const response = await getAllStudents();
      if(response.success) {
        setStudents(response.students)
      }
    }
  }

  const getAdminLecturers = async ()=> {
    if(user && user.role === "admin") {
      const response = await getAllLecturers();
      if(response.success) {
        setLecturers(response.lecturers)
      }
    }
  }

  const getAdminSubjects = async () => {
    if(user && user.role === "admin") {
      const response = await getAllSubjects();
      if(response.success) {
        setSubjects(response.subjects)
      }
    }
  }

  useEffect(()=>{
    getAdminBatches()
    getAdminStudents()
    getAdminLecturers()
    getAdminSubjects()
  },[])

 
  

  

  

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const organizationName = "LMS";

  const value = {
    organizationName,
    batches,
    setBatches,
    students,
    setStudents,
    lecturers,
    setLecturers,
    subjects,
    setSubjects,
    announcements,
    lecturer,
    assignments,
    quizzes,
    resources,
    student,
    loading,
    setLoading,
    user,
    setUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
