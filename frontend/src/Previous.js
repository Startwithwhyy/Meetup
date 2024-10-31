import React, {useState, useEffect} from 'react';
import './Previous.css';
import Layout from './Layout';
import { backendUrl } from '../../constants';

const Previous = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMeetings = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${backendUrl}/api/meetings`);
        const data = await response.json();
        setMeetings(data);
      } catch (error) {
        console.error('Error fetching meetings:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMeetings();
  }, []);

  return (
    <Layout>
      <div className="previous-container">
        <h2>Previous Meetings</h2>
        <div className="event-box-container">
          {
            loading ? (
              <h3>Loading...</h3>
            ) : (
              meetings.length > 0 ? (
                meetings.map((meeting) => (
                  <div key={meeting.id} className="event-box">
                    <div className="event-header">
                      <div className="event-title">{meeting.title}</div>
                      <div className="event-date">{meeting.date}</div>
                    </div>
                    <div className="event-details">
                      <p>
                        <strong>Duration:</strong> {meeting.duration}
                      </p>
                      <p>
                        <strong>Participants:</strong> {meeting.participants}
                      </p>
                      <p>
                        <strong>Notes:</strong> {meeting.notes}
                      </p>
                    </div>
                    <div className="event-actions">
                      <button className="details-button">Export Summary</button>
                      <button className="delete-button">Delete</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No previous meetings found</p>
              )
            )
          }
        </div>
      </div>
    </Layout>
  );
};

export default Previous;
