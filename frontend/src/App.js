import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import VideoChatPage from './VideoChatPage';
import Upcoming from './Upcoming';
import Previous from './Previous';
import Recordings from './Recordings';
import Personalroom from './Personalroom';
import './App.css';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PrivateRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/video" element={<VideoChatPage />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/previous" element={<Previous />} />
          <Route path="/recordings" element={<Recordings />} />
          <Route path="/personal-room" element={<Personalroom />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
