// TotalItemsContext.js
import React, { createContext, useContext, useState } from 'react';

const TotalItemsContext = createContext();

export const TotalItemsProvider = ({ children }) => {
  const [totalItems, setTotalItems] = useState(0);

  return (
    <TotalItemsContext.Provider value={{ totalItems, setTotalItems }}>
      {children}
    </TotalItemsContext.Provider>
  );
};

export const useTotalItems = () => useContext(TotalItemsContext);
