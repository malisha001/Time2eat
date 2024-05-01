import { useReducer,createContext } from "react";

export const RiderContext = createContext();

export const riderReducer = (state,action) =>{
    switch(action.type){
        case 'setRider':
            return{
                rider: action.payload
            }
        case 'CREATE_ORDER':
            return {
                ...state,
                rider: [...state.rider, action.payload] // Append new order to existing orders
            };
        default:
            return state
    }
}

export const RiderContextProvider = ({children}) => { 

    const [state, dispatch] = useReducer(riderReducer,{
        rider: []
    })

    return(
        <RiderContext.Provider value={{...state,dispatch}}>
            {children}
        </RiderContext.Provider>
    )
}