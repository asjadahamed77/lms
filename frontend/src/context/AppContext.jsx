import React, { createContext, useEffect, useState } from "react";
import { lecturer } from "../assets/lecturers";
import { getAllBatches } from "../service/adminBatch";
import { getAllStudents } from "../service/adminStudent";
import { getAllLecturers } from "../service/adminLecturer";
import { getAllSubjects } from "../service/adminSubject";
import { getLecturerAssignments } from "../service/assignmentService";
import { getLecturerQuizzes } from "../service/quizService";
import { getLecturerResources } from "../service/resourceService";
import { getAssignmentSubmissions, getQuizSubmissions } from "../service/submissionService";
import { getAllAnnouncements } from "../service/announcementService";
// import { getStudent } from "../service/studentService";

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
  const [assignments, setAssignments] = useState([])
  const [quizzes, setQuizzes] = useState([])
  const [resources, setResources] = useState([])
  const [assignmentSubmissions, setAssignmentSubmissions] = useState([])
  const [quizSubmissions, setQuizSubmissions] = useState([])
  const [announcements, setAnnouncements] = useState([])
  // const [student, setStudent] = useState(null)

  

  


  console.log(user);
  


  

  const getAdminBatches = async ()=> {
    if(user && user.role === "admin") {
      setLoading(true)
      const response = await getAllBatches();
      if(response.success) {
        setBatches(response.batches)
        setLoading(false)
      }
    }
  }

  const getAdminStudents = async ()=> {
    if (user && user.role === "admin") {
      setLoading(true)
      const response = await getAllStudents();
      if(response.success) {
        setStudents(response.students)
        setLoading(false)
      }
    }
  }

  const getAdminLecturers = async ()=> {
    if(user && user.role === "admin") {
      setLoading(true)
      const response = await getAllLecturers();
      if(response.success) {
        setLecturers(response.lecturers)
        setLoading(false)
      }
    }
  }

  const getAdminSubjects = async () => {
    if(user && user.role === "admin") {
      setLoading(true)
      const response = await getAllSubjects();
      if(response.success) {
        setSubjects(response.subjects)
        setLoading(false)
      }
    }
  }

  const getLecturerAssignmentsDetails = async ()=> {
    if(user && user.role === "lecturer") {
      setLoading(true)
      const response = await getLecturerAssignments(user.userId);
    
      
      if(response.success) {
        setAssignments(response.assignments)
        setLoading(false)
      }
    }     
  }

  const getLecturerQuizzesDetails = async ()=> {
    if(user && user.role === "lecturer") {
      setLoading(true)
      const response = await getLecturerQuizzes(user.userId);
      if(response.success) {
        setQuizzes(response.quizzes)
        setLoading(false)
      }
    }     
  }

  const getLecturerResourcesDetails = async ()=> {
    if(user && user.role === "lecturer") {
      setLoading(true)
      const response = await getLecturerResources(user.userId);
      if(response.success) {
        setResources(response.resources)
        setLoading(false)
      }
    }     
  }

  const getLecturerAssignmentSubmissions = async ()=>{
    setLoading(true)
    try {
      if(user && user.role === "lecturer") {
     
        const response = await getAssignmentSubmissions(user.userId);
        if(response.success) {
          setAssignmentSubmissions(response.submissions)
          setLoading(false)
        }
      }
    } catch (error) {
      console.log(error.message);
      
    }finally{
      setLoading(false)
    }
  }

  const getLecturerQuizSubmissions = async ()=>{
    setLoading(true)
    try {
      if(user && user.role === "lecturer") {
     
        const response = await getQuizSubmissions(user.userId);
        if(response.success) {
          setQuizSubmissions(response.submissions)
          setLoading(false)
        }
      }
    } catch (error) {
      console.log(error.message);
      
    }finally{
      setLoading(false)
    }
  }

  const getAnnouncements = async ()=> {
    setLoading(true)
    try {
     if(user && (user.role === "lecturer" || user.role === "student" || user.role === "admin")) {
      const response = await getAllAnnouncements();
      if(response.success) {
        setAnnouncements(response.announcements)
        setLoading(false)
      }
     }
    } catch (error) {
      console.log(error.message);
      
    }finally{
      setLoading(false)
    }
  }

  

  // const getStudentData = async () => {
  //   if(user && user.role === "student") {
  //     const response = await getStudent(user.userId);
  //     if(response.success) {
  //       setStudent(response.student)
  //     }
  //   }
  // }

  

  useEffect(()=>{
    getAdminBatches()
    getAdminStudents()
    getAdminLecturers()
    getAdminSubjects()
    getLecturerAssignmentsDetails()
    getLecturerQuizzesDetails()
    getLecturerResourcesDetails()
    getLecturerAssignmentSubmissions()
    getLecturerQuizSubmissions()
    getAnnouncements()
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
   
    loading,
    setLoading,
    user,
    setUser,
    getAdminSubjects,
    getAdminBatches,
    getAdminStudents,
    getAdminLecturers,
    getLecturerAssignmentsDetails,
    getLecturerQuizzesDetails,
    getLecturerResourcesDetails,
    assignmentSubmissions,
    setAssignmentSubmissions,
    getLecturerAssignmentSubmissions,
    quizSubmissions,
    setQuizSubmissions,
    getLecturerQuizSubmissions,
    getAnnouncements
    
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
