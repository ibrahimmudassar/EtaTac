// Create a file named ArrayContext.js
import React, { createContext, useState } from "react";

export const ArrayContext = createContext();

export const ArrayProvider = ({ children }) => {
  const [splits, setSplits] = useState([]);
  const [settings, setSettings] = useState({
    isAdditionUsed: true,
    isSubtractionUsed: true,
    isMultiplicationUsed: true,
    isDivisionUsed: true,
    additionx1: 2,
    additiony1: 100,
    additionx2: 2,
    additiony2: 100,
    multiplicationx1: 2,
    multiplicationy1: 12,
    multiplicationx2: 2,
    multiplicationy2: 100,
  });

  return (
    <ArrayContext.Provider value={{ splits, setSplits, settings, setSettings }}>
      {children}
    </ArrayContext.Provider>
  );
};
