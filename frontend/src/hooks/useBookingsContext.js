import { BookingContext } from "../context/BookingContext";
import { useContext } from "react";

export const useBookingsContext = () => {
    const context = useContext(BookingContext)

    if (!context) {
        throw Error('useBookingsContext must be used inside an BookingsContextProvider')
    }

    return context
}
