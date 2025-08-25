import React, {createContext} from 'react';
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

  const organizationName = "LMS"
  
  const value = { organizationName, batches, students, lecturers, subjects, announcements, lecturer, assignments, quizzes, resources, student };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
