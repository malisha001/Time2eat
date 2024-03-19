import { createContext, useReducer } from "react";

export const BookingContext = createContext()

export const bookingsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BOOKINGS':
            return {
                bookings: action.payload
            }
        // case 'CREATE_BOOKING':
        //     return {
        //         bookings: [action.payload, ...state.bookings]
        //     }
        case 'DELETE_BOOKING':
                return {
                    bookings: state.bookings.filter((b) => b._id !== action.payload._id)
            }
        case 'UPDATE_BOOKING':
                return {
                    bookings: state.bookings.filter((b) => b._id !== action.payload._id)
            }
        // case 'UPDATE_BOOKING':
        //         return {
        //             bookings: state.bookings.
        //         }
            

        default: 
            return state
    }
}

export const BookingContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(bookingsReducer, {
        bookings: null
    })

    
    return (
        <BookingContext.Provider value={{...state, dispatch}}>
            { children }
        </BookingContext.Provider>
    )
}

