import { createContext, useReducer } from 'react';

export const DorderContext = createContext();

export const DorderReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ORDERS':
       return {
        
       orders: action.payload
            
      }
    case 'CREATE_ORDER':
        return {
          orders: [action.payload, ...state.orders]
        } 
    case 'DELETE_ORDER':  
        return {
           orders: state.orders.filter((o) => o._id !== action.payload._id)
        } 
    
    default:
        return state     
  }

}

export const DorderContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(DorderReducer, {
        orders : [ ]
    })

   

    return (
        <DorderContext.Provider value={{...state,dispatch}}>
        { children }
        </DorderContext.Provider>
    )
}