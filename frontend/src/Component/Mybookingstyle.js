import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';

function ResponsiveAppBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dine In Form
        </Typography>
        <Button color="inherit" component={Link} to="/dine-in-bookings">Dine In</Button>
        <Button color="inherit" component={Link} to="/pre-booking-dine-in-form">Pre Bookings</Button>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          component={Link}
          to="/menu"
        >
         
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default ResponsiveAppBar;
