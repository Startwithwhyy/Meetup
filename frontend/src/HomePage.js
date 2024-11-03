import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Card, CardContent, Grid, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar, Alert } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import GroupIcon from '@mui/icons-material/Group';
import ScheduleIcon from '@mui/icons-material/Schedule';
import VideocamIcon from '@mui/icons-material/Videocam';
import './HomePage.css';
import homeImage from './home.png'; // Replace with your actual home image URL
import Layout from './Layout'; // Import Layout component
import { backendUrl } from './constants';

const HomePage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [openScheduleDialog, setOpenScheduleDialog] = useState(false);
  const [openJoinDialog, setOpenJoinDialog] = useState(false);
  const [openStartDialog, setOpenStartDialog] = useState(false); // New state for the Start Meeting dialog
  const [meetingDescription, setMeetingDescription] = useState('');
  const [meetingDateTime, setMeetingDateTime] = useState(new Date());
  const [meetingLink, setMeetingLink] = useState('');
  const [meetingTitle, setMeetingTitle] = useState('');
  const [successMessage, setSuccessMessage] = useState(false); // Snackbar state
  const [meetings, setMeetings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/meetings`);
        const data = await response.json();
        setMeetings(data.length > 2 ? data.slice(-2) : data);
      } catch(e) {
        console.error(e);
      }
    }
    fetchMeetings();
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleStart = () => {
    console.log('Starting new meeting...');

    if (meetingTitle.length == 0 || meetingDescription.length == 0) return;

    const newMeeting = {
      title: meetingTitle,
      description: meetingDescription,
      dateTime: Date.now()
    }
    setOpenStartDialog(false); 
    localStorage.setItem('onGoingMeeting', JSON.stringify(newMeeting));
    navigate('/video'); // Navigate to the video meeting page
  };

  const handleCloseStart = () => {
    setOpenStartDialog(false);
  };

  const joinMeeting = () => {
    setOpenJoinDialog(true);
  };

  const scheduleMeeting = () => {
    setOpenScheduleDialog(true);
  };

  const handleSchedule = () => {
    console.log('Scheduled Meeting:', meetingDescription, meetingDateTime);

    // Save the meeting details to local storage
    const meetings = JSON.parse(localStorage.getItem('meetings')) || [];

    if (meetingDescription.length == 0 || meetingTitle == 0) return;
    const newMeeting = {
      description: meetingDescription,
      dateTime: meetingDateTime,
    };
    meetings.push(newMeeting);
    localStorage.setItem('meetings', JSON.stringify(meetings));

    // Show success message
    setSuccessMessage(true);

    // Close the dialog
    setOpenScheduleDialog(false);
  };

  const handleJoin = () => {
    console.log('Joining Meeting with link:', meetingLink);
    setOpenJoinDialog(false);
    // Navigate or handle the join logic here
  };

  const handleCloseSchedule = () => {
    setOpenScheduleDialog(false);
  };

  const handleCloseJoin = () => {
    setOpenJoinDialog(false);
  };

  const viewRecordings = () => {
    navigate('/recordings');
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <Layout>
      <div className="home-container">
        <div className="image-container">
          <img src={homeImage} alt="Home" className="home-image" />
          <div className="datetime">
            <Typography variant="h4">{formatTime(currentTime)}</Typography>
            <Typography variant="subtitle1">{formatDate(currentTime)}</Typography>
          </div>
        </div>
        <Grid container spacing={2} className="action-buttons" justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              color="primary"
              className="action-button"
              onClick={() => setOpenStartDialog(true)} // Update the onClick event here
              fullWidth
            >
              <AddCircleIcon className="action-button-icon" />
              New Meeting
            </Button>
          </Grid>
          {/* <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              color="secondary"
              className="action-button"
              onClick={joinMeeting}
              fullWidth
            >
              <GroupIcon className="action-button-icon" />
              Join Meeting
            </Button>
          </Grid> */}
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              color="success"
              className="action-button"
              onClick={scheduleMeeting}
              fullWidth
            >
              <ScheduleIcon className="action-button-icon" />
              Schedule Meeting
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              color="error"
              className="action-button"
              onClick={viewRecordings}
              fullWidth
            >
              <VideocamIcon className="action-button-icon" />
              View Recordings
            </Button>
          </Grid>
        </Grid>
        <div className="meeting-history">
          <Typography variant="h6" gutterBottom>Meeting History</Typography>
          {meetings.length > 0 && (
            meetings.map(m => (
              <Card key={m._id} style={{ backgroundColor: '#777', padding: '16px', marginBottom: '20px', borderRadius: '8px', color: '#fff' }}>
                <CardContent>
                  <Typography variant="body2">{m.title}</Typography>
                </CardContent>
              </Card>
            ))
          )}
          
        </div>
      </div>

      {/* Dialog for scheduling a meeting */}
      <Dialog
        open={openScheduleDialog}
        onClose={handleCloseSchedule}
        maxWidth="sm"
        PaperProps={{
          style: {
            backgroundColor: 'rgba(90, 90, 90, 0.8)', 
            borderRadius: '8px',
            padding: '20px',
            width: '290px', // Adjusted width
            height: '330px'
          },
        }}
      >
        <DialogTitle
          sx={{
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          Schedule a Meeting
        </DialogTitle>
        <DialogContent
          sx={{
            marginBottom: '16px',
            color: 'white',
          }}
        >
          <TextField
            required
            autoFocus
            margin="dense"
            label="Meeting Title"
            fullWidth
            value={meetingTitle}
            onChange={(e) => setMeetingTitle(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            label="Meeting Description"
            fullWidth
            value={meetingDescription}
            onChange={(e) => setMeetingDescription(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            label="Date and Time"
            type="datetime-local"
            fullWidth
            value={meetingDateTime.toISOString().slice(0, -1)}
            onChange={(e) => setMeetingDateTime(new Date(e.target.value))}
          />
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
          }}
        >
          <Button
            onClick={handleSchedule}
            sx={{
              margin: '0 8px',
              color: 'white',
              backgroundColor: 'blue',
              '&:hover': {
                backgroundColor: 'darkblue',
              },
            }}
          >
            Schedule
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for joining a meeting */}
      <Dialog
        open={openJoinDialog}
        onClose={handleCloseJoin}
        maxWidth="sm"
        PaperProps={{
          style: {
            backgroundColor: 'rgba(90, 90, 90, 0.8)', 
            borderRadius: '8px',
            padding: '20px',
            width: '300px',
          },
        }}
      >
        <DialogTitle
          sx={{
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          Join a Meeting
        </DialogTitle>
        <DialogContent
          sx={{
            marginBottom: '6px',
            color: 'white',
          }}
        >
          <TextField
            required
            autoFocus
            margin="dense"
            label="Meeting Link"
            fullWidth
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
          />
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
          }}
        >
          <Button
            onClick={handleJoin}
            sx={{
              margin: '0 8px',
              color: 'white',
              backgroundColor: 'blue',
              '&:hover': {
                backgroundColor: 'darkblue',
              },
            }}
          >
            Join
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openStartDialog}
        onClose={handleCloseStart}
        maxWidth="sm"
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(90, 90, 90, 0.8)', 
            borderRadius: '8px',
            padding: '20px',
            width: '300px',
          },
        }}
      >
        <DialogTitle
          sx={{
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center', // Center the title
          }}
        >
          Start a Meeting
        </DialogTitle>
        <DialogContent>
          <TextField
            required
            autoFocus
            margin="dense"
            label="Meeting Title"
            fullWidth
            value={meetingTitle}
            onChange={(e) => setMeetingTitle(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            label="Meeting Description"
            fullWidth
            value={meetingDescription}
            onChange={(e) => setMeetingDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}> {/* Center the button */}
          <Button
            onClick={handleStart}
            sx={{
              color: 'white',
              backgroundColor: 'blue ',
              '&:hover': {
                backgroundColor: 'darkblue',
              },
            }}
          >
            Start Meeting
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccessMessage(false)} severity="success" sx={{ width: '100%' }}>
          Meeting successfully scheduled!
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default HomePage;
