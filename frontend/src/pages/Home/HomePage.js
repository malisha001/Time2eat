import React, { useState,useEffect } from 'react';
import { Link } from "react-router-dom"
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Grid, Box,Paper, Card, CardActionArea, CardContent, CardMedia, CardActions } from '@mui/material';
import { Menu as MenuIcon ,Person2 as Person2Icon, ShoppingCart, FormatListBulleted, TableBar, Favorite, RateReview } from '@mui/icons-material';
import {createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

// import classes from './HomePage.module.css'
import exampleImage from '../../Assests/example.jpg';
import { useAuthContext } from '../../hooks/useAuthContext';
import {useLogout} from '../../hooks/useLogout'
import { getAllRestaurents } from '../../services/restaurentsApi';
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
        <Typography gutterBottom variant='subtitle2'>Register your restaurant</Typography>
        <Typography gutterBottom variant='subtitle2'>Join as a delivery rider</Typography>

        
      </Box>
    );

    return (
      <ThemeProvider theme={theme}>
        <div className="home">
            <Box sx={{ width: '100%' }}>
                <AppBar position="static">
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
                <img src={exampleImage} alt="Example" style={{ width: '100%'}} />

                <Paper sx={{margin: '0px', marginLeft:'40px', marginRight:'40px', bgcolor:'yellow'}}>
                  <h2>offers</h2>
                  <Box sx={{marginLeft: '100px', marginRight: '100px'}}>
                  <Grid container sx={{ bgcolor: 'red'}} spacing={2}>
                    <Grid item md={4} >
                      <Box  sx={{ margin:'10px', bgcolor:'#FFF', marginLeft:'0px'}}>
                      <Card sx={{ maxWidth: 'auto', marginBottom:'10px' }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="200"
                            image={exampleImage}
                            alt="green iguana"
                          />
                        </CardActionArea>
                      </Card>
                      </Box>
                    </Grid>
                    <Grid item md={4} >
                      <Box sx={{ margin:'10px', bgcolor:'#FFF' }}>
                      <Card sx={{ maxWidth: 'auto', marginBottom:'10px' }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="200"
                            image={exampleImage}
                            alt="green iguana"
                          />
                        </CardActionArea>
                      </Card>
                      </Box>
                    </Grid>
                    <Grid item md={4} >
                      <Box sx={{ margin:'10px', bgcolor:'#FFF', padding: '10' }}>
                      <Card sx={{ maxWidth: 'auto', marginBottom:'10px' }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="200"
                            image={exampleImage}
                            alt="green iguana"
                          />
                        </CardActionArea>
                      </Card>
                      </Box>
                    </Grid>
                  </Grid>
                  </Box>
                 

                  <h2>Search by Category</h2>
                <Box sx={{marginLeft: '100px', marginRight: '100px'}}>
                  <Grid container sx={{ bgcolor: 'red', mb: '10', marginBottom: '10px'}} spacing={2}>
                    <Grid className='home-grid-catergory'item md={2} sx={{bgcolor:'blue', paddingLeft:'33px'}}>
                      <Box sx={{bgcolor:'#FFF', borderRadius: '50%', width:'100px', height:'100px'}}>
                      <Card sx={{borderRadius: '50%' }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="100"
                            width="100"
                            image={exampleImage}
                            alt="green iguana"
                          />
                        </CardActionArea>
                      </Card>
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
                            image={exampleImage}
                            alt="green iguana"
                          />
                        </CardActionArea>
                      </Card>
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
                            image={exampleImage}
                            alt="green iguana"
                          />
                        </CardActionArea>
                      </Card>
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
                            image={exampleImage}
                            alt="green iguana"
                          />
                        </CardActionArea>
                      </Card>
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
                            image={exampleImage}
                            alt="green iguana"
                          />
                        </CardActionArea>
                      </Card>
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
                            image={exampleImage}
                            alt="green iguana"
                          />
                        </CardActionArea>
                      </Card>
                      </Box>
                    </Grid>
                </Grid>
              </Box>
              {/* show restuarents */}
              <h2>restuarents</h2> 
              
                <Box sx={{marginLeft: '100px', marginRight: '100px'}}>
                  <Grid container sx={{ bgcolor: 'red'}} spacing={2}>
                    {restuarents.map((restuarent) => (
                      <Grid item md={4} key={restuarent._id}>
                          <Card sx={{ maxWidth: 250 }}>
                            <CardActionArea component={Link} to ={`/restaurant/${restuarent.Restaurant_Id}`}>
                              <CardMedia
                                component="img"
                                alt="green iguana"
                                height="250"
                                image={exampleImage}
                              />
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                  <Box>{restuarent.Restaurant_name}</Box>
                                  <Box sx={{marginLeft:"182px", marginTop:"-32px"}}>hi</Box>
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

