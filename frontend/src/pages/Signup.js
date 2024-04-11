import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
    const[fullName, setFullName] = useState('')
    const[email, setEmail] = useState('')
    const[address, setAddress] = useState('')
    const[contactNo, setContactNo] = useState('')
    const[password, setPassword] = useState('')
    const[confirmPassword, setConfirmPassword] = useState('')
    const{signup, error , isLoading} = useSignup()

    const handleSubmit =async (e) => {
        e.preventDefault()

        await signup(fullName,email,address,contactNo, password, confirmPassword)
    }

    return (
        <form className= "signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>Full Name</label>
            <input
                type="text"
                onChange={(e)  => setFullName(e.target.value)}
                value ={fullName}
            />

            <label>Email</label>
            <input
                type="email"
                onChange={(e)  => setEmail(e.target.value)}
                value ={email}
            />

            <label>Address</label>
            <input
                type="text"
                onChange={(e)  => setAddress(e.target.value)}
                value ={address}
            />

            <label>Contact No</label>
            <input
                type="text"
                onChange={(e)  => setContactNo(e.target.value)}
                value ={contactNo}
            />

            <label>Password</label>
            <input
                type="password"
                onChange={(e)  => setPassword(e.target.value)}
                value ={password}
            />

            <label>Confirm Password</label>
            <input
                type="password"
                onChange={(e)  => setConfirmPassword(e.target.value)}
                value ={confirmPassword}
            />

             <button disabled= { isLoading }>Sign-up</button>
             {error && <div className = "error">{error}</div>}
        
        </form>
    )
    
}
export default Signup