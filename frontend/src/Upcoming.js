import React, { useState, useEffect } from 'react';
import './Upcoming.css';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';

const Upcoming = () => {
  const [meetings, setMeetings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve meetings from local storage
    const storedMeetings = JSON.parse(localStorage.getItem('meetings')) || [];
    setMeetings(storedMeetings);
  }, []);

  const handleStartMeeting = (meeting) => {
    console.log('Starting meeting:', meeting.description);
    // Navigate to the video page with the meeting details (if needed)
    navigate('/video', { state: { meeting } });
  };

  const handleDeleteMeeting = (index) => {
    const updatedMeetings = meetings.filter((_, i) => i !== index);
    setMeetings(updatedMeetings);
    localStorage.setItem('meetings', JSON.stringify(updatedMeetings));
  };

  return (
    <Layout>
      <div className="upcoming-container">
        <h2>Upcoming Meetings</h2>
        <div className="event-box-container">
          {meetings.map((meeting, index) => (
            <div key={index} className="event-box">
              <div className="event-title">{meeting.description}</div>
              <div className="event-date">{new Date(meeting.dateTime).toLocaleString()}</div>
              <div className="button-container">
                <button 
                  className="start-button" 
                  onClick={() => handleStartMeeting(meeting)}
                >
                  Start
                </button>
                <button 
                  className="delete-button" 
                  onClick={() => handleDeleteMeeting(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Upcoming;
