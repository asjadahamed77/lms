import React, {createContext} from 'react';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

  const organizationName = "LMS"
  
  const value = { organizationName, };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
