import { createContext, useReducer } from 'react'

//create brand new context
export const AdvertisementsContext = createContext()

export const advertisementsReducer = (state, action) => {
  
  switch (action.type) {
    case 'SET_ADS':
      return { 
        advertisements: action.payload 
      }
    case 'CREATE_AD':
      return { 
        advertisements: [action.payload, ...state.advertisements] 
      }
    case 'DELETE_AD':
      return {
        advertisements: state.advertisements.filter((w) =>  w._id !== action.payload._id)
      }
    case 'UPDATE_AD':
      return {
        advertisements: state.advertisements.map(advertisement => 
        advertisement._id === action.payload._id ? action.payload : advertisement)
      }
    default:
      return state
  }
}

//context provider component
export const AdvertisementsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(advertisementsReducer, { 
    advertisements:[] })
  
  return (
    <AdvertisementsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AdvertisementsContext.Provider>
  )
}
