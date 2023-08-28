'use client'
import { createContext, useContext, useState } from 'react';

// Create the context
const MyContext = createContext();

// Create a custom hook to access the context
export const useMyContext = () => useContext(MyContext);

// Create a provider component
export const MyContextProvider = ({ children }) => {
  const [data, setData] = useState(null);

  const updateData = (newData) => {
    setData(newData);
  };

  return (
    <MyContext.Provider value={{ data, updateData }}>
      {children}
    </MyContext.Provider>
  );
};