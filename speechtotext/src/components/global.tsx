// Create a file named ArrayContext.js
import React, { createContext, useState } from "react";

export const ArrayContext = createContext();

export const ArrayProvider = ({ children }) => {
  const [splits, setSplits] = useState([]);

  return (
    <ArrayContext.Provider value={{ splits, setSplits }}>
      {children}
    </ArrayContext.Provider>
  );
};
