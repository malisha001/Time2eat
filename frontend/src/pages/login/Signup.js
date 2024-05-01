import { useState } from "react"
import { useSignup } from "../../hooks/useSignup"
import styles from './Login.module.css';
import { NavLink } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid, Link } from '@mui/material';
import Navbar from '../../component/Navbar'

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
        // Call signup function if all validations pass
        await signup(fullName,email,address,contactNo, password, confirmPassword)
    }

    return (
        <div>
        <Navbar />
        <div className={styles.regcontainer}>
        <Grid container>
        <Grid item sx={6}>
            <p>crate account</p>
        </Grid>
        <Grid item sx={6}>
        <form className= {styles.signup} onSubmit={handleSubmit}>
            <h3>Create an account</h3>
        
            <TextField
                type="text"
                label="Full Name"
                variant="outlined"
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                fullWidth
                margin="normal"
                size="small"
            />

            <TextField 
                type="email"
                label="Email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                fullWidth
                margin="normal"
                size="small"
            />

            <TextField
                type="text"
                label="Address"
                variant="outlined"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                fullWidth
                margin="normal"
                size="small"
            />

            <TextField
                type="text"
                label="Contact No"
                variant="outlined"
                onChange={(e) => setContactNo(e.target.value)}
                value={contactNo}
                fullWidth
                margin="normal"
                size="small"
            />

            <TextField
                type="password"
                label="Password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                fullWidth
                margin="normal"
                size="small"
            />

            <TextField
                type="password"
                label="Confirm Password"
                variant="outlined"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                fullWidth
                margin="normal"
                size="small"
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}
            >
                Sign up
            </Button>

            <p>Already have an account? <Link component={NavLink} to="/login">Log in</Link></p>

             {error && <div className = {styles.error}>{error}</div>}
        
        </form>
        </Grid>
        </Grid>
        </div>
        </div>
    )
    
}
export default Signup