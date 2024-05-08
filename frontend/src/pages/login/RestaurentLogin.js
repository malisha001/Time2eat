import { useState } from "react"
import style from './Login.module.css';
import { useLogin } from "../../hooks/useLogin"
import { useNavigate ,NavLink } from "react-router-dom"
import { Link,Button,TextField } from '@mui/material';
import Navbar from '../../component/Navbar'
// import bgimg from './foodbgimage.png'

const RestaurentLogin = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { loginrole, login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await fetch('api/restaurants/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
        })
        const data = await res.json()
        if(res.ok){
            localStorage.setItem('user',JSON.stringify(data))
            navigate('/restaurentDashbord');
        }
    }

    // if (loginrole === 'customer') {
    //     return <Navigate to="/" />
    // }

    return (
        <div>
        <Navbar />
        <div className={style.bgcontainer}>
        <form className={style.login} onSubmit={handleSubmit}>

            <h2>Welcome Back! your restaurent</h2>
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
                >
                Log in
            </Button>

            <p>Don't have an Account? <Link component={NavLink} to="/signup">Sign Up</Link> </p>
            {error && <div className={style.error}>{error}</div>}
        </form>
        </div>
        </div>
    )
    
}
export default RestaurentLogin