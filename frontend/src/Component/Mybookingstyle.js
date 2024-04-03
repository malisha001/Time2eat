import MybookingStyle from '../Component/Mybookingstyle.css'
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import exampleImage from '../Assests/example.jpg';

function Mybookingstyle() {
    const theme = useTheme();
  return (
    <Card sx={{ ml:'100px', mt: '40px',  width:'800px', height: '200px',display: 'flex' }}>
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ width:'400px', flex: '1 0 auto' }}>
        <Typography component="div" variant="h7">
          <lable className='input-mybooking-label'>Date
            <input className='input-mybooking'></input>
          </lable>
        </Typography>
        <Typography component="div" variant="h7">
          <lable className="input-mybooking-label">Time
            <input className='input-mybooking'></input>
          </lable>
        </Typography>
        <Typography component="div" variant="h7">
          <lable className="input-mybooking-label">Group Tables
            <input className='input-mybooking'></input>
          </lable>
        </Typography>
        <Typography component="div" variant="h7">
          <lable className="input-mybooking-label">Couple Tables
            <input className='input-mybooking'></input>
          </lable>
        </Typography>
      </CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        {/* <IconButton aria-label="previous">
          {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
        </IconButton>
        <IconButton aria-label="play/pause">
          <PlayArrowIcon sx={{ height: 38, width: 38 }} />
        </IconButton>
        <IconButton aria-label="next">
          {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
        </IconButton> */}
      </Box>
    </Box>
    <CardMedia
      component="img"
      sx={{ ml: '150px', padding:'10px', width: 300 }}
      image={exampleImage}
      alt="Live from space album cover"
    />
  </Card>
  )
}

export default Mybookingstyle