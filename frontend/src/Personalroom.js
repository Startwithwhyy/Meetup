import React, { useState } from 'react';
import {
  Button, Typography, Card, CardContent, IconButton, Box, Link, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, Grid
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Layout from './Layout';

const generateUniqueId = (length = 10) => {
  return Math.random().toString(36).substr(2, length);
};

const generatePasscode = (length = 6) => {
  return Math.random().toString(36).substr(2, length).toUpperCase();
};

const Personalroom = () => {
  const [invitationLink, setInvitationLink] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [meetingTopic, setMeetingTopic] = useState('');
  const [meetingId, setMeetingId] = useState('');
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const createNewRoom = () => {
    const uniqueId = generateUniqueId();
    const newLink = `http://localhost:3000/meeting/${uniqueId}`;
    setInvitationLink(newLink);
    setMeetingId(uniqueId);
    setPasscode(generatePasscode());
    setMeetingTopic(''); // Clear the meeting topic when creating a new room
    setIsEditing(false);
    setDialogOpen(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setDialogOpen(true);
  };

  const handleDelete = () => {
    setMeetingTopic('');
    setMeetingId('');
    setPasscode('');
    setInvitationLink('');
    alert('Meeting deleted successfully!');
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    if (!isEditing) {
      setMeetingTopic('');
      setMeetingId('');
      setPasscode('');
      setInvitationLink('');
    }
  };

  const handleSave = () => {
    setDialogOpen(false);
    // Save the updated meeting info if editing, or create a new meeting if not
  };

  const handleCopyLink = () => {
    if (invitationLink) {
      navigator.clipboard.writeText(invitationLink)
        .then(() => {
          alert('Link copied!');
        })
        .catch(() => alert('Failed to copy link'));
    }
  };

  const toggleShowPasscode = () => {
    setShowPasscode(!showPasscode);
  };

  return (
    <Layout>
      <Box sx={{ flex: 1, padding: 4 }}>
        <Typography variant="h5" color="white" sx={{ marginBottom: 2 }}>
          Personal Meeting Room
        </Typography>
        <Card sx={{ backgroundColor: '#36393F', color: 'white', padding: 2, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6">Topic: {meetingTopic || "No Topic Yet"}</Typography>
            <Typography variant="body2">Meeting ID: {meetingId || "No ID Yet"}</Typography>
            <Typography variant="body2">
              Passcode: 
              <span style={{ letterSpacing: '0.1em' }}>
                {showPasscode ? passcode : "******"}
              </span> 
              <Button 
                variant="text" 
                sx={{ color: '#7289DA' }} 
                onClick={toggleShowPasscode}
              >
                {showPasscode ? 'Hide' : 'Show'}
              </Button>
            </Typography>
            <Typography variant="body2">
              Invite Link: <Link href={invitationLink} sx={{ color: '#7289DA' }}>{invitationLink || "No link yet"}</Link>
            </Typography>
            <Box sx={{ marginTop: 2 }}>
              <Button variant="contained" color="primary" sx={{ backgroundColor: '#7289DA', marginRight: 1 }}>Start the meeting</Button>
              <IconButton color="primary" sx={{ color: '#7289DA' }} onClick={handleCopyLink}><ContentCopyIcon /></IconButton>
              <IconButton color="primary" sx={{ color: '#7289DA' }} onClick={handleEdit}><EditIcon /></IconButton>
              <IconButton color="primary" sx={{ color: '#7289DA' }} onClick={handleDelete}><DeleteIcon /></IconButton>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ marginTop: 2, padding: 1, marginLeft: 4 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ backgroundColor: '#7289DA' }}
          startIcon={<AddCircleOutlineIcon sx={{ color: 'white' }} />}
          onClick={createNewRoom}
        >
          Create New Room
        </Button>
      </Box>

      <Dialog
  open={dialogOpen}
  onClose={handleDialogClose}
  sx={{
    '& .MuiDialog-paper': {
      backgroundColor: '#2F3136', // Background color of the dialog box
      color: 'white', // Text color inside the dialog box
      borderRadius: 3, // Rounded corners for the dialog box
      padding: 2, // Padding inside the dialog box
    },
  }}
>
  <DialogTitle
    sx={{
      borderBottom: '1px solid #42454A', // Bottom border to separate title
      paddingBottom: 2, // Padding at the bottom of the title
      marginBottom: 2, // Space below the title
      fontWeight: 'bold', // Bold title text
      color: '#7289DA', // Title text color
    }}
  >
    {isEditing ? 'Edit Meeting' : 'Create a New Meeting'}
  </DialogTitle>
  <DialogContent
    sx={{
      '& .MuiTextField-root': {
        marginBottom: 2, 
        '& label': {
          color: '#B9BBBE', // Label text color
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#42454A', // Border color for text fields
          },
          '&:hover fieldset': {
            borderColor: '#7289DA', // Border color on hover
          },
          '&.Mui-focused fieldset': {
            borderColor: '#7289DA', // Border color when focused
          },
        },
      },
    }}
  >
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Meeting Topic"
          variant="outlined"
          value={meetingTopic}
          onChange={(e) => setMeetingTopic(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Meeting ID"
          variant="outlined"
          value={meetingId}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Invite Link"
          variant="outlined"
          value={invitationLink}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Passcode"
          variant="outlined"
          value={passcode}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
    </Grid>
  </DialogContent>
  <DialogActions
    sx={{
      borderTop: '1px solid #42454A', // Top border to separate actions
      paddingTop: 2, // Padding at the top of the actions
      marginTop: 2, // Space above the actions
    }}
  >
    <Button onClick={handleDialogClose} color="secondary" sx={{ color: '#B9BBBE' }}>
      Cancel
    </Button>
    <Button onClick={handleSave} color="primary" sx={{ backgroundColor: 'darkblue', color: 'white' }}>
      {isEditing ? 'Save Changes' : 'Save'}
    </Button>
  </DialogActions>
</Dialog>

    </Layout>
  );
};

export default Personalroom;
