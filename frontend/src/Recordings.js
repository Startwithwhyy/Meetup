import React, { useEffect, useState } from 'react';
import { Button, Typography, Card, CardContent, IconButton, Box, Grid } from '@mui/material';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import ShareIcon from '@mui/icons-material/Share';
import Layout from './Layout';

const Recordings = () => {
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    // Fetch recordings from local storage
    const savedRecordings = JSON.parse(localStorage.getItem('recordings')) || [];
    setRecordings(savedRecordings);
  }, []);

  const handlePlayClick = (url) => {
    const video = document.createElement('video');
    video.src = url;
    video.controls = true;
    video.style.position = 'fixed';
    video.style.top = '50%';
    video.style.left = '50%';
    video.style.transform = 'translate(-50%, -50%)';
    video.style.zIndex = 9999;
    document.body.appendChild(video);
    video.play();
    video.onended = () => document.body.removeChild(video); // Remove video when playback ends
  };

  const handleShareClick = (url) => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this recording',
        text: 'Watch this recording!',
        url: url,
      }).catch(console.error);
    } else {
      alert('Share not supported on this browser');
    }
  };

  return (
    <Layout>
      <Box sx={{ flex: 1, padding: 4 }}>
        <Typography variant="h5" color="white" sx={{ marginBottom: 2 }}>
          Recordings
        </Typography>
        <Grid container spacing={2}>
          {recordings.map((recording, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ backgroundColor: '#36393F', color: 'white', padding: 2, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6">{recording.title}</Typography>
                  <Typography variant="body2">Date: {recording.date}</Typography>
                  <Typography variant="body2">Duration: {recording.duration}</Typography>
                  <Box sx={{ marginTop: 2 }}>
                    <IconButton
                      color="primary"
                      sx={{
                        color: '#7289DA',
                        '&:hover': {
                          transform: 'scale(1.2)',
                          transition: 'transform 0.3s ease-in-out',
                        },
                      }}
                      onClick={() => handlePlayClick(recording.url)}
                    >
                      <PlayCircleFilledWhiteIcon />
                    </IconButton>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ backgroundColor: '#7289DA', marginLeft: 1 }}
                      onClick={() => handleShareClick(recording.url)}
                    >
                      <ShareIcon sx={{ marginRight: 1 }} />
                      Share
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default Recordings;
