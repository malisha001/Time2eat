import { useState } from "react"
import { useLogin } from "../../hooks/useLogin"
import { NavLink } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';
import './Login.css';



const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (

        <form className="login" onSubmit={handleSubmit}>
            
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

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                >
                    Log in
                </Button>

                <p>Don't have an Account? <Link component={NavLink} to="/signup">Sign Up</Link> </p>

                <p>Forgot Password <Link component={NavLink} to="/password-reset">Click Here</Link></p>

                {error && <div className="error">{error}</div>}
           
        </form>

    )
}
export default Login