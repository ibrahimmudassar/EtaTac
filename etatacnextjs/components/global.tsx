// Create a file named ArrayContext.js
"use client";
import React, { createContext, useContext, useState } from "react";

export const ArrayContext = createContext([]);

export const ArrayProvider = ({ children }) => {
  const [splits, setSplits] = useState([]);

  return (
    <ArrayContext.Provider value={{ splits, setSplits }}>
      {children}
    </ArrayContext.Provider>
  );
};

export function useAppContext() {
  return useContext(ArrayContext);
}
