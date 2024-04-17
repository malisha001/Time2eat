import { Box, CardActionArea, CardMedia, Card, Paper, Grid, CardContent, Typography, Button } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom';
import exampleImage from '../Assests/example.jpg';
import image1 from '../Assests/image1.jpg'
import image2 from '../Assests/image2.jpg'
import image3 from '../Assests/image3.jpg'
import image4 from '../Assests/image4.jpg'
import image5 from '../Assests/image5.jpg'
import image6 from '../Assests/image6.jpg'
import { useNavigate } from 'react-router-dom';

function Mybookingstyle() {
    const { id } = useParams();
    const navigate = useNavigate();

    const submitButton = () => { 
        // Navigate to the newBooking page with the restaurant ID in the URL
        navigate(`/newbooking/${id}`);
    }

  return (
    <div>
        <Paper>
       <Box>
       <Card sx={{maxWidth: 'auto' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image= {exampleImage}
          alt="green iguana"
        />
        </CardActionArea>
        </Card>
       </Box>

       <Button sx={{marginLeft: '1350px', marginTop: '20px'}} variant="contained" onClick={submitButton}>Contained</Button>


       <Paper  sx={{marginTop: '80px', marginLeft: '20px', marginRight: '20px'}}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={4}>
            <Card sx={{ maxWidth: 345, marginTop: '10px', marginLeft: '100px', marginBottom: '20px' }}>
                    <CardMedia
                    component="img"
                    height="140"
                    image={image1}
                    alt="green iguana"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Burger
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Rs.1000
                    </Typography>
                    </CardContent>
            </Card>
            </Grid>
            <Grid item xs={4}>
            <Card sx={{ maxWidth: 345, marginTop: '10px', marginLeft: '100px', marginBottom: '20px' }}>
                    <CardMedia
                    component="img"
                    height="140"
                    image={image2}
                    alt="green iguana"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Hot Dog
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Rs.2000
                    </Typography>
                    </CardContent>
            </Card>
            </Grid>
            <Grid item xs={4}>
            <Card sx={{ maxWidth: 345, marginTop: '10px', marginLeft: '100px', marginBottom: '20px' }}>
                    <CardMedia
                    component="img"
                    height="140"
                    image={image3}
                    alt="green iguana"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Rs.3000
                    </Typography>
                    </CardContent>
            </Card>
            </Grid>
            <Grid item xs={4}>
            <Card sx={{ maxWidth: 345, marginTop: '10px', marginLeft: '100px', marginBottom: '20px' }}>
                    <CardMedia
                    component="img"
                    height="140"
                    image={image4}
                    alt="green iguana"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Noodles
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Rs.1500
                    </Typography>
                    </CardContent>
            </Card>
            </Grid>
            <Grid item xs={4}>
            <Card sx={{ maxWidth: 345, marginTop: '10px', marginLeft: '100px', marginBottom: '20px' }}>
                    <CardMedia
                    component="img"
                    height="140"
                    image={image5}
                    alt="green iguana"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Prawn Rice
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Rs.2500
                    </Typography>
                    </CardContent>
            </Card>
            </Grid>
            <Grid item xs={4}>
            <Card sx={{ maxWidth: 345, marginTop: '10px', marginLeft: '100px', marginBottom: '20px' }}>
                    <CardMedia
                    component="img"
                    height="140"
                    image={image6}
                    alt="green iguana"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Chicken Soup
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Rs.1500
                    </Typography>
                    </CardContent>
            </Card>
            </Grid>
        </Grid>
       </Paper>
      
        </Paper>
    </div>
  )
}

export default Mybookingstyle