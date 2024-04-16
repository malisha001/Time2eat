import { AdvertisementsContext } from "../context/AdvertisementsContext";
//useContext hook
import  {   useContext } from "react";

//hook function
export const useAdvertisementsContext = () => {
  const context = useContext(AdvertisementsContext);

  if(!context) {
    throw Error('useAdvertisementsContext must be used inside an AdvertisementsContextProvider');
  }

  return context;
}

