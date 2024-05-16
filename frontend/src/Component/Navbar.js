import React from 'react';
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Grid, Box,Paper, Card, CardActionArea, CardContent, CardMedia, CardActions } from '@mui/material';
import { Menu as MenuIcon, Inbox as InboxIcon, Mail as MailIcon, Margin } from '@mui/icons-material';
import { useAuthContext } from '../hooks/useAuthContext';
import {useLogout} from '../hooks/useLogout'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate()
    const {logout} = useLogout()
    const {user} = useAuthContext()
    const [open, setOpen] = React.useState(false);
    
    const handleClick = () =>{
        logout()
        navigate('/')
    }

    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      );
    return ( 

        <div>
            <AppBar position="static" sx={{ backgroundColor: '#8B0000' }}>
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
                <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>


     );
}
 
export default Navbar;