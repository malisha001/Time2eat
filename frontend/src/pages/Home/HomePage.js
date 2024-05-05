import React, { useState,useEffect } from 'react';
import { Link } from "react-router-dom"
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Grid, Box,Paper, Card, CardActionArea, CardContent, CardMedia, CardActions } from '@mui/material';
import { Menu as MenuIcon ,Person2 as Person2Icon, ShoppingCart, FormatListBulleted, TableBar, Favorite, RateReview } from '@mui/icons-material';
import {createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

// import classes from './HomePage.module.css'
import exampleImage from '../../Assests/1.png';
import exampleImage2 from '../../Assests/2.png';
import exampleImage3 from '../../Assests/3.png';
import exampleImage4 from '../../Assests/4.png';
//food
import exampleImage5 from '../../Assests/image1.jpg';
import exampleImage6 from '../../Assests/image2.jpg';
import exampleImage7 from '../../Assests/image3.jpg';
import exampleImage8 from '../../Assests/image4.jpg';
import exampleImage9 from '../../Assests/image5.jpg';
import exampleImage10 from '../../Assests/image6.jpg';
//restaurants
import res1 from '../../Assests/res1.png';
import res2 from '../../Assests/res2.png';
import res3 from '../../Assests/res3.png';
import res4 from '../../Assests/res4.png';
import res5 from '../../Assests/res5.png';
import res6 from '../../Assests/res6.png';

import { useAuthContext } from '../../hooks/useAuthContext';
import {useLogout} from '../../hooks/useLogout'
import { getAllRestaurents } from '../../services/restaurentsApi';
import AvailabilityStatus from '../../component/AvailabilityStatus';
import Footer from '../../component/footer/Footer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#C02942', // primary color
    },
    secondary: {
      main: '#F8983C', // secondary color
    },
    accent: {
      main: '#FCE94F', // accent color
    },
    background: {
      main: '#FFFFFF', // background color
    },
    text: {
      main: '#000000', // text color
    },
    element: {
      main: '#EDEDED', // element color
    }
  }
});


export default function TemporaryDrawer() {
  const {logout} = useLogout()
  const {user} = useAuthContext()

    const [open, setOpen] = React.useState(false);
    const [restuarents, setRestuarents] = useState([]);

    const handleClick = () =>{
      logout()
    }
  
    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };

    useEffect(() => {
      const fetchrestuarents = async () => {
        try {
          const resData = await getAllRestaurents(); // Call your API function to fetch restaurant data
          console.log("restauent data",resData)
          setRestuarents(resData); // Update state with the fetched employee IDs
          
        } catch (error) {
          console.error('Error fetching employee IDs:', error);
        }
      }
      fetchrestuarents()
    }, []);
  
  
    const icons = [Person2Icon, ShoppingCart, FormatListBulleted, TableBar, Favorite, RateReview]; // Array of imported Material icons

    const DrawerList = (
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
          {['Profile', 'Cart', 'My Orders', 'My Bookings', 'Wishlist', 'Feedback'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                {React.createElement(icons[index])}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <p> </p>

        <Divider />
        <Link to = "/addrestaurants">
          <Typography gutterBottom variant='subtitle2'>Register your restaurant</Typography>
        </Link>
        <Link to = "/reslogin">
          <Typography gutterBottom variant='subtitle2'>Login your restaurant</Typography>
        </Link>
        <Link to = "/signup">
          <Typography gutterBottom variant='subtitle2'>Join as a delivery rider</Typography>
        </Link>
        
      </Box>
    );

    return (
      <ThemeProvider theme={theme}>
        <div className="home">
            <Box sx={{ width: '100%' }}>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            TIME2eat
                        </Typography>
                        {user && <Button color="inherit" onClick={handleClick}>Logout</Button>}
                        {!user && <Button color="inherit" component={Link} to='/login'>Login</Button>}
                        {!user && <Button color="inherit" component={Link} to='/signup'>sign in</Button>}
                    </Toolbar>
                </AppBar>
                <img src={exampleImage} alt="Example" style={{ width: '100%'}} sx={{margin: '50px'}} />
                

                <Paper sx={{margin: '50px', marginLeft:'40px', marginRight:'40px'}}>
                  <h2 style={{ margin: '20px', padding: '10px', color: theme.palette.primary.main }}>offers for you</h2>
                                   
                  <Box sx={{marginLeft: '100px', marginRight: '100px'}}>

                  <Grid container  spacing={2}>

                    <Grid item md={4} >
                      <Box  sx={{ margin:'10px', marginLeft:'0px'}}>
                      <Card sx={{ maxWidth: 'auto', marginBottom:'10px' }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="200"
                            image={exampleImage2}
                            alt="green iguana"
                          />
                        </CardActionArea>
                      </Card>
                      </Box>
                    </Grid>

                    <Grid item md={4} >
                      <Box sx={{ margin:'10px'}}>
                      <Card sx={{ maxWidth: 'auto', marginBottom:'10px' }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="200"
                            image={exampleImage3}
                            alt="green iguana"
                          />
                          
                        </CardActionArea>
                      </Card>
                      </Box>
                    </Grid>

                    <Grid item md={4} >
                      <Box sx={{ margin:'10px', padding: '10' }}>
                      <Card sx={{ maxWidth: 'auto', marginBottom:'10px' }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="200"
                            image={exampleImage4}
                            alt="green iguana"
                          />
                        </CardActionArea>
                      </Card>
                      </Box>
                    </Grid>
                  </Grid>

                  </Box>

                 
                 

                  <h2 style={{ margin: '20px', padding: '10px', color: theme.palette.primary.main }}>Search by Category</h2>
                <Box sx={{marginLeft: '100px', marginRight: '100px'}}>
                  <Grid container sx={{ mb: '10', marginBottom: '10px'}} spacing={2}>
                    <Grid className='home-grid-catergory'item md={2} sx={{paddingLeft:'33px'}}>
                      <Box sx={{bgcolor:'#FFF', borderRadius: '50%', width:'100px', height:'100px'}}>
                      <Card sx={{borderRadius: '50%' }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="100"
                            width="100"
                            image={exampleImage5}
                            alt="green iguana"
                          />
                        </CardActionArea>
                      </Card>
                      <Typography variant="body2" align='center'>Fast Food</Typography>
                      </Box>
                    </Grid>
                    <Grid item md={2} >
                      <Box sx={{bgcolor:'#FFF', borderRadius: '50%', width:'100px', height:'100px'}}>
                      <Card sx={{marginBottom:'10px', borderRadius: '50%' }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="100"
                            width="100"
                            image={exampleImage6}
                            alt="green iguana"
                          />
                        </CardActionArea>
                      </Card>
                      <Typography variant="body2" align='center'>Street Food</Typography>
                      </Box>
                    </Grid>
                    <Grid item md={2} >
                      <Box sx={{bgcolor:'#FFF', borderRadius: '50%', width:'100px', height:'100px'}}>
                      <Card sx={{marginBottom:'10px', borderRadius: '50%' }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="100"
                            width="100"
                            image={exampleImage7}
                            alt="green iguana"
                          />
                        </CardActionArea>
                      </Card>
                      <Typography variant="body2" align='center'>Japanese</Typography>
                      </Box>
                    </Grid>
                    <Grid item md={2} >
                      <Box sx={{bgcolor:'#FFF', borderRadius: '50%', width:'100px', height:'100px'}}>
                      <Card sx={{marginBottom:'10px', borderRadius: '50%' }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="100"
                            width="100"
                            image={exampleImage8}
                            alt="green iguana"
                          />
                        </CardActionArea>
                      </Card>
                      <Typography variant="body2" align='center'>Italian</Typography>
                      </Box>
                    </Grid>
                    <Grid item md={2} >
                      <Box sx={{bgcolor:'#FFF', borderRadius: '50%', width:'100px', height:'100px'}}>
                      <Card sx={{marginBottom:'10px', borderRadius: '50%' }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="100"
                            width="100"
                            image={exampleImage9}
                            alt="green iguana"
                          />
                        </CardActionArea>
                      </Card>
                      <Typography variant="body2" align='center'>Chinese</Typography>
                      </Box>
                    </Grid>
                    <Grid item md={2} >
                      <Box sx={{bgcolor:'#FFF', borderRadius: '50%', width:'100px', height:'100px'}}>
                      <Card sx={{marginBottom:'10px', borderRadius: '50%' }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="100"
                            width="100"
                            image={exampleImage10}
                            alt="green iguana"
                          />
                        </CardActionArea>
                      </Card>
                      <Typography variant="body2" align='center'>Soup</Typography>
                      </Box>
                    </Grid>
                    
                </Grid>
              </Box>


              {/* show restuarents */}
              <h2 style={{ margin: '20px', padding: '10px', color: theme.palette.primary.main }}>Top rated restuarents</h2> 
              
                <Box sx={{marginLeft: '100px', marginRight: '100px'}}>

                  <Grid container spacing={2}>

                    {restuarents.map((restuarent) => (

                      <Grid item md={4} key={restuarent._id}>

                          <Card sx={{ maxWidth: 250 }}>

                          <CardActionArea component={Link} to ={`/respage/${restuarent.Restaurant_Id}`}>
                              <CardMedia
                                component="img"
                                alt="green iguana"
                                height="250"
                                image={res1}
                              />
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                  <Box>{restuarent.Restaurant_name}</Box>
                                  <Box sx={{marginLeft:"182px", marginTop:"-32px"}}>hi
                                  {/* Pass restaurant ID to AvailabilityStatus */}
                                    <AvailabilityStatus restaurantId={restuarent.Restaurant_Id} />
                                  </Box>
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                      </Grid>
                    ))} 
                  </Grid>
                </Box>
              </Paper>
              
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
             
            </Box>
            {/* <Footer/> */}
        </div>
        </ThemeProvider>
    );
   
}

