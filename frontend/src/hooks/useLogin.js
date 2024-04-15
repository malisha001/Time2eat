import { useState } from "react"
import { useAuthContext } from './useAuthContext'
import { Navigate } from "react-router-dom"

export const useLogin = () =>{
    const [error, setError] = useState(null)
    const[isLoading, setIsLoading] = useState(null)
    const [loginrole, setloginrole] = useState(false) // New state
    const { dispatch } = useAuthContext()



    const login = async (email,password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
          })
        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            //save the user to local storage
            localStorage.setItem('user',JSON.stringify(json))
       
            //update the auth context
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
            if(json.role === 'customer'){
                setloginrole("customer")
            }

        }
    }

    return {loginrole,login, isLoading, error }
}
