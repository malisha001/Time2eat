import { useState } from "react"
import { useAuthContext } from './useAuthContext'
import { Navigate } from "react-router-dom"

export const useSignup = () =>{
    
    const navigate = Navigate();
    const [error, setError] = useState(null)
    const[isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (fullName, email, address, contactNo, password, confirmPassword) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type':  'application/json'},
            body: JSON.stringify({fullName, email, address, contactNo, password, confirmPassword})
        })
        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        else{
            navigate('/')
        }
        if(response.ok){
            //save the user to local storage
            localStorage.setItem('user',JSON.stringify(json))
            
            //update the auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
            
        }
    }

    return {signup, isLoading, error }
}
