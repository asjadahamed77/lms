import React, {createContext, useEffect, useState} from 'react';
import { batches } from '../assets/batches';
import { students } from '../assets/students';
import { lecturer, lecturers } from '../assets/lecturers';
import { subjects } from '../assets/subjects';
import { announcements } from '../assets/announcements';
import { assignments } from '../assets/assignments';
import { quizzes } from '../assets/quizzes';
import { resources } from '../assets/resources';
import { student } from '../assets/student';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  console.log(user);
  

  const setUserData = ()=> {
    const userData = localStorage.getItem('user')
    if(userData){
      setUser(JSON.parse(userData))
    }
  }

  useEffect(()=>{
    setUserData()
  },[])

  const organizationName = "LMS"
  
  const value = { organizationName, batches, students, lecturers, subjects, announcements, lecturer, assignments, quizzes, resources, student, loading, setLoading, user, setUser };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
