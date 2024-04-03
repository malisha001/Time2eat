import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid,Box,Paper } from '@mui/material';
import PreStyles from '../Component/NewStyle.css'
import exampleImage from '../Assests/example.jpg'; // Adjust the path as per your directory structure
import grouptableimage from '../Assests/grouptable.jpg'; // Adjust the path as per your directory structure
import coupletableimage from '../Assests/coupletable.jpg'; // Adjust the path as per your directory structure
import { Button } from '@mui/base'

function NewStyle() {
  return (
    <div>
        <div>
          <Paper sx={{mt: '100px', ml: '40px', mr: '40px', bgcolor:'#ffffff'}}>
          <Grid container spacing={2}>
            <Grid sx={{pr: '16px'}} item md={8}>
              {/* nav bar */}
              <nav className='prebooking-bar'>
                  <ul>
                      <li className='PreDate'>Date</li>
                      <li className='PreDateInput'><input type='date'/></li>
                      <li className='PreDate'>Time</li>
                      <li className='PreDateInput'><input type='time'/></li>
                      <Button> Check Now</Button>
                
                  </ul>
              </nav>

              <Card className='imgprebooking'  sx={{ maxWidth: 800 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="345"
                        image= {exampleImage}
                        alt="green iguana"
                      />
                    </CardActionArea>
              </Card>


            </Grid>
            
          <Grid item md={4}>
            <Box className='current-availability-side'>
            Current Availability
            </Box>
          
           <Grid container spacing={2}>
              <Grid item md={4}>            
              <Card className='availability-status-table-image' variant="elevation=0" sx={{ maxWidth: 100 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="100"
                        image= {grouptableimage}
                        alt="green iguana"
                      />
                </CardActionArea>
              </Card>
              </Grid>
              <Grid item md={4}>            
              <Box className='availability-status'>
                 <Box className='available-booked-text'>
            Current Availability
            </Box>item 2</Box>
              </Grid>
              <Grid item md={4}>            
              <Box className='availability-status'>item 3</Box>
              </Grid>
              <Grid item md={4}>            
              <Card className='availability-status-table-image' variant="elevation=0" sx={{ maxWidth: 100 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="100"
                        image= {coupletableimage}
                        alt="green iguana"
                      />
                    </CardActionArea>
              </Card>
              </Grid>
              <Grid item md={4}>            
              <Box className='availability-status'>item 2</Box>
              </Grid>
              <Grid item md={4}>            
              <Box className='availability-status'>item 3</Box>
              </Grid>

            </Grid>
          

          </Grid>

        </Grid>
        </Paper>
        </div>
      {/* image  */}
      {/* vertical line */}
      
       <div className="vertical-line"></div>
    </div>
  )
}

export default NewStyle