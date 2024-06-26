import { useState } from "react"
import { useLogin } from "../../hooks/useLogin"
import style from './Login.module.css';
import { Navigate,NavLink } from "react-router-dom"
import { Link,Button,TextField } from '@mui/material';
import Navbar from '../../component/Navbar'
// import bgimg from './foodbgimage.png'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { loginrole, login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        //calling login custom hook
        await login(email, password)
    }
    console.log("login role", loginrole)
    if (loginrole === 'customer') {
        return <Navigate to="/" />
    }
    else if (loginrole === 'rider') {
        return <Navigate to="/riderdashborad" />
    }
    else if(loginrole === 'admin'){
        return <Navigate to ="/restaurants"/>
    }
    else if(loginrole === 'restaurant'){
        return <Navigate to ="/restaurentDashbord"/>
    }

    return (
        <div>
        <Navbar />
        <div className={style.bgcontainer}>
        <form className={style.login} onSubmit={handleSubmit}>

            <h2>Welcome Back! Log in</h2>
            <h4>Hi, we're glad you're back. Please log in.</h4>

            <TextField
                type="email"
                label="Email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter Email here"
                fullWidth
                margin="normal"
            />

            <TextField
                type="password"
                label="Password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Enter Password"
                fullWidth
                margin="normal"
            />
            <p>Forgot Password <Link component={NavLink} to="/password-reset">Click Here</Link></p>

            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}>
                Log in
            </Button>

            <p>Don't have an Account? <Link component={NavLink} to="/signup">Sign Up</Link> </p>
            {error && <div className={style.error}>{error}</div>}
        </form>
        </div>
        </div>
    )
    
}
export default Login