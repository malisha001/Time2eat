import React from 'react';
import { Grid,Box } from '@mui/material';
import { Link } from 'react-router-dom';

const EmployeeNav = () => {
    return (
        <div style={{ margin: '0 500px 0 0' }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Box sx={{ backgroundColor: 'lightblue', padding: '10px',textAlign: 'center'}}>
                        <Link to="/addemployee" style={{textDecoration: 'none', color: 'black'}}>staff member</Link>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{ backgroundColor: 'lightblue', padding: '10px',textAlign: 'center' }}>
                        <Link to="/empleaves" style={{textDecoration: 'none', color: 'black'}}>leaving</Link>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{ backgroundColor: 'lightblue', padding: '10px' ,textAlign: 'center'}}>
                        <Link to="/employeepaysalaries" style={{textDecoration: 'none', color: 'black'}}>monthly salary</Link>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default EmployeeNav;