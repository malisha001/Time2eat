import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import style from './Login.module.css';
import { Navigate } from "react-router-dom"

const Login = () => {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const {loginrole,login , error ,isLoading}  = useLogin()

    const handleSubmit =async (e) => {
        e.preventDefault()
        //calling login custom hook
        await login(email, password)
    }
    if(loginrole === 'customer'){
        return <Navigate to ="/"/>
    }
    // else if(loginrole === 'rider'){
    //     return <Navigate to ="/riderdashbord"/>
    // }
    // else if(loginrole === 'admin'){
    //     return <Navigate to ="/admin"/>
    // }

    return (
        <form className= {style.login} onSubmit={handleSubmit}>
            <h3>Log in</h3>

            <label>Email</label>
            <input
             type="email"
             onChange={(e)  => setEmail(e.target.value)}
             value ={email}
             />

            <label>Password</label>
            <input
             type="password"
             onChange={(e)  => setPassword(e.target.value)}
             value ={password}
             />

             <button disabled={isLoading}>Log in</button>
             {error && <div className={style.error}>{error}</div>}
        </form>
    )
    
}
export default Login