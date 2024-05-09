// InventoryContext.js
import React, { createContext, useState, useContext } from "react";

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [totalItems, setTotalItems] = useState(0);

  return (
    <InventoryContext.Provider value={{ totalItems, setTotalItems }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);
