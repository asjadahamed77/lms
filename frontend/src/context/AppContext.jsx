import React, {createContext} from 'react';
import { batches } from '../assets/batches';
import { students } from '../assets/students';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

  const organizationName = "LMS"
  
  const value = { organizationName, batches, students };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
