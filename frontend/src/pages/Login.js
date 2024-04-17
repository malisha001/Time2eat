import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { NavLink } from 'react-router-dom';

  
const Login = () => {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const {login , error ,isLoading}  = useLogin()

    const handleSubmit =async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <form className= "login" onSubmit={handleSubmit}>
            <h2>Welcome Back ! Log in</h2>
            <h4>Hi we are glad you are back, Please login.</h4>

            <label>Email</label>
            <input
                type="email"
                onChange={(e)  => setEmail(e.target.value)}
                value ={email}
                placeholder="Enter Email here"
            />

            <label>Password</label>
            <input
                type="password"
                onChange={(e)  => setPassword(e.target.value)}
                value ={password}
                placeholder="Enter Password"
            />
              
                <button disabled={isLoading}>Log in</button>

            <p>Don't have an Account? <NavLink to="/signup">Sign Up</NavLink> </p>
                  
            <p>Forgot Password <NavLink to="/password-reset">Click Here</NavLink></p> 
                  
                {error && <div className="error">{error}</div>}
        </form>
    )
    
}
export default Login