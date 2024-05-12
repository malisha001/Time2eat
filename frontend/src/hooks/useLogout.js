import { useAuthContext } from "./useAuthContext"
import { useState } from "react"

export const useLogout = () => {

    const { dispatch } =  useAuthContext()
    const [logoutrole, setlogoutrole] = useState(false) // New state
    //const { dispatch: workoutsDispatch } =  useWorkoutsContext()

    const logout = () =>{
        //remove user from storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type: 'LOGOUT'})
        // workoutsDispatch({type: 'SET_WORKOUTS', payload: null})
        setlogoutrole(true)
    }

    return {logoutrole,logout}
}