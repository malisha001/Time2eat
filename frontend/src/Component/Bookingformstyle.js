import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {Grid, Paper} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import exampleImage from '../Assests/example.jpg';
import grouptableimage from '../Assests/grouptable.jpg'; // Adjust the path as per your directory structure
import coupletableimage from '../Assests/coupletable.jpg'; // Adjust the path as per your directory structure
import '../Component/Bookingformstyle.css';

function Bookingformstyle() {
    const theme = useTheme();
    return (
        <div>
            <Paper sx={{width: '1000px', height: '400px', pt:'10px', mt: '100px', ml: '40px', mr: '40px', bgcolor:'#ffffff'}}>
                <Grid container spacing={2}>
                    <Grid sx={{pr: '16px', ml: '30px', mr: '15px', mt: '20px'}} item md={12}>
                        <h2 className='form-header-pre-booking'>Book Your Table</h2>
                    </Grid>

                    <Grid sx={{ml: '0px', mt: '10px', ml: '30px', mr: '15px'}} container spacing={2}>
                                <Grid item md={6}>
                                  <Grid container spacing={2}>
                                    <Grid item md={12}>
                                        <h3 className='form-card-subtitles'>Pick your table type</h3>
                                    </Grid>
                                  </Grid>
                                 
                                    <Grid container spacing={2}>
                                    <Grid item md={6}>
                                    <Grid container spacing={2}>
                                        <Grid item md={6}>
                                        <CardMedia
                                        component="img"
                                        sx={{ ml: '22px', pt:'0px', pb:'10px', height: 50, width: 50, }}
                                        image={grouptableimage}
                                        alt="Live from space album cover"
                                    />
                                    </Grid>
                                    <Grid item md={6}>
                                    <Box className='booking-form-img-descrption'>Table for 4</Box>
                                    </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item md={6}>
                                    <input className='pre-booking-form-table-input' type='Number'></input>
                                    </Grid>
                                  </Grid>

                                 
                                </Grid>
                                <Grid item md={6}>
                                <Grid container spacing={2}>
                                    <Grid item md={12}>
                                    <Box sx={{ width: '40px', height: '64px' }} className='form-card-subtitles-bottom-box'>  </Box> 
                                    </Grid>
                                  </Grid>
                                <Grid container spacing={2}>
                                    <Grid item md={6}>
                                    <Grid container spacing={2}>
                                        <Grid item md={6}>
                                        <CardMedia
                                        component="img"
                                        sx={{ ml: '22px', pt:'0px', pb:'10px', height: 50, width: 50, }}
                                        image={coupletableimage}
                                        alt="Live from space album cover"
                                    />
                                    </Grid>
                                    <Grid item md={6}>
                                    <Box className='booking-form-img-descrption'>Table for 2</Box>
                                    </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item md={6}>
                                    <input className='pre-booking-form-table-input' type='Number'></input>
                                    </Grid>
                                  </Grid>
                                </Grid>
                    </Grid>
                    <Grid sx={{ml: '30px', mt: '10px', mr: '15px'}} container spacing={2}>
                                <Grid item md={6}>
                                <Grid container spacing={2}>
                                    <Grid item md={12}>
                                    <h3 className='form-card-subtitles-bottom'>Enter Booking Details</h3>
                                    </Grid>
                                  </Grid>
                                <div className="input-container">
                                    <label className='input-mybooking-label'>Name</label>
                                    <input className='input-mybooking' type='text' ></input>
                                </div>

                                <div className="input-container">
                                    <label className='input-mybooking-label'>Telephone</label>
                                    <input className='input-mybooking' type='text' ></input>
                                </div>

                                </Grid>
                                <Grid item md={6}>
                                <Grid sx={{pt:'45'}} container spacing={2}>
                                    <Grid sx={{pt:'45'}}item md={12}>
                                    <Box sx={{ height: '80px' }} className='form-card-subtitles-bottom-box'> <div className="input-container">
                                    <label className='input-mybooking-label'>Date</label>
                                    <label className='input-mybooking-label'>Date</label>
                                </div>

                                <div className="input-container">
                                    <label className='input-mybooking-label'>Time</label>
                                    <label className='input-mybooking-label'>Date</label>
                                </div>
 </Box>
                                    </Grid>
                                  </Grid>
                                <button className='pre-booking-form-btn-bottom'>proceed</button>
                                </Grid>
                    </Grid>

                </Grid>
            </Paper>
        </div>
    )
}

export default Bookingformstyle;
