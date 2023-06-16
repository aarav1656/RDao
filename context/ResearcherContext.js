import React, { createContext, useState } from 'react';

export const ResearcherContext = createContext();

export const ResearcherProvider = ({ children }) => {
  const [researchers, setResearchers] = useState([]);

  const addResearcher = (researcher) => {
    setResearchers([...researchers, researcher]);
  };

  return (
    <ResearcherContext.Provider value={{ researchers, addResearcher }}>
      {children}
    </ResearcherContext.Provider>
  );
};