import { useContext } from 'react';
import { DorderContext } from '../context/DorderContext';


export const  useDorderContext = () => {
    const context = useContext(DorderContext)

    if(!context) {
        throw Error('useDorderContext must be used inside an DorderContextProvider')
    }


   return context;
};
