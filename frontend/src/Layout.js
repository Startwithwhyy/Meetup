import React, { useState, useEffect } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HistoryIcon from '@mui/icons-material/History';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Profile icon
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const uname = localStorage.getItem('username');
    const uemail = localStorage.getItem('uemail');
    if (uname) setUsername(uname);
    if (uemail) setUserEmail(uemail);
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleProfileClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('fullName');
    localStorage.removeItem('username');
    localStorage.removeItem('uemail');
    navigate('/login');
  }

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#222',
      }}
    >
      <Drawer
        variant="permanent"
        style={{
          width: isDrawerOpen ? 240 : 60,
          transition: 'width 0.3s',
          whiteSpace: 'nowrap',
        }}
        classes={{
          paper: isDrawerOpen ? 'drawer open' : 'drawer closed',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isDrawerOpen ? 'flex-start' : 'center',
            padding: '16px',
            backgroundColor: '#333',
            color: '#fff',
          }}
        >
          <IconButton onClick={toggleDrawer} style={{ marginRight: '8px' }}>
            <MenuIcon style={{ color: '#fff' }} />
          </IconButton>
          {isDrawerOpen && (
            <Typography variant="h6" style={{ marginLeft: '0px' }}> {/* Removed marginLeft */}
              MeetUp
            </Typography>
          )}
        </div>
        <List>
          <ListItem button onClick={() => handleNavigation('/home')}>
            <ListItemIcon>
              <HomeIcon style={{ color: '#fff' }} />
            </ListItemIcon>
            {isDrawerOpen && <ListItemText primary="Home" />}
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/upcoming')}>
            <ListItemIcon>
              <CalendarTodayIcon style={{ color: '#fff' }} />
            </ListItemIcon>
            {isDrawerOpen && <ListItemText primary="Upcoming" />}
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/previous')}>
            <ListItemIcon>
              <HistoryIcon style={{ color: '#fff' }} />
            </ListItemIcon>
            {isDrawerOpen && <ListItemText primary="Previous" />}
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/recordings')}>
            <ListItemIcon>
              <VideoLibraryIcon style={{ color: '#fff' }} />
            </ListItemIcon>
            {isDrawerOpen && <ListItemText primary="Recordings" />}
          </ListItem>

          <ListItem button onClick={() => handleNavigation('/personal-room')}>
            <ListItemIcon>
              <MeetingRoomIcon style={{ color: '#fff' }} />
            </ListItemIcon>
            {isDrawerOpen && <ListItemText primary="Personal Room" />}
          </ListItem>
        </List>
      </Drawer>
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '8px 16px', // Reduced padding for smaller size
            backgroundColor: '#000', // Changed to black
          }}
        >
          <IconButton
            style={{
              marginLeft: 'auto',
              backgroundColor: '#333',
              borderRadius: '50%',
              width: '40px', // Reduced size
              height: '40px', // Reduced size
              color: '#fff',
            }}
            onClick={handleProfileClick}
          >
            <AccountCircleIcon style={{ fontSize: '1.5rem' }} /> {/* Reduced icon size */}
          </IconButton>
          <Menu
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={handleProfileClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              style: {
                backgroundColor: '#333',
                color: '#fff',
                borderRadius: '8px',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '16px',
              }}
            >
              <Avatar
                src="https://via.placeholder.com/150" // Replace with a real user image URL if available
                alt="Profile Picture"
                style={{
                  width: '60px',
                  height: '60px',
                  marginBottom: '10px',
                  borderRadius: '50%',
                  boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
                }}
              />
              <Typography variant="h6">{username}</Typography> {/* User's Name */}
              <Typography variant="body2">{userEmail}</Typography>{' '}
              {/* User's Email */}
            </div>
            <Divider style={{ backgroundColor: '#555' }} />
            {/* <MenuItem onClick={handleProfileClose}>My Profile</MenuItem>
            <MenuItem onClick={handleProfileClose}>Settings</MenuItem> */}
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </header>
        <main style={{ flex: 1, padding: '16px', overflow: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
