import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
import logo from './logo.png'; // Ensure this path is correct

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [birthdate, setBirthdate] = useState(''); // New state for birthdate
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [isFirstTimeSignUp, setIsFirstTimeSignUp] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    setAlertMessage(''); // Clear alert on toggle
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      // Sign-up logic
      if (!validateSignUp()) {
        return;
      }

      try {
        const response = await axios.post('/api/auth/signup', {
          name,
          username,
          email,
          password,
          birthdate,
        });

        setIsFirstTimeSignUp(true); // Mark as first-time sign-up
        showAlertMessage('Sign-up successful. You are logged in!', true);
        navigate('/home');
      } catch (error) {
        showAlertMessage(error.response?.data?.error || 'An error occurred during sign-up');
      }
    } else {
      // Login logic
      if (!validateLogin()) {
        return;
      }

      try {
        const response = await axios.post('/api/auth/login', {
          email,
          password,
        });

        localStorage.setItem('token', response.data.token); // Save token to localStorage
        if (isFirstTimeSignUp) {
          showAlertMessage('Login successful. Welcome back!', true);
        }
        navigate('/home');
      } catch (error) {
        showAlertMessage(error.response?.data?.error || 'An error occurred during login');
      }
    }
  };

  const validateSignUp = () => {
    if (!email || !email.includes('@')) {
      showAlertMessage('Please enter a valid email address.');
      return false;
    }

    if (!username || username.length < 4) {
      showAlertMessage('Username must be at least 4 characters long.');
      return false;
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!password || !passwordRegex.test(password)) {
      showAlertMessage(
        'Password must be at least 8 characters long and contain at least one symbol, one number, and one alphabet character.'
      );
      return false;
    }

    const today = new Date();
    const birthDate = new Date(birthdate);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      age < 13 ||
      (age === 13 && monthDifference < 0) ||
      (age === 13 && monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      showAlertMessage('You must be at least 13 years old to sign up.');
      return false;
    }

    return true;
  };

  const validateLogin = () => {
    if (!email || !email.includes('@')) {
      showAlertMessage('Please enter a valid email address.');
      return false;
    }

    if (!password) {
      showAlertMessage('Please enter your password.');
      return false;
    }

    return true;
  };

  const showAlertMessage = (message, autoDismiss = false) => {
    setAlertMessage(message);
    setShowAlert(true);
    if (autoDismiss) {
      setTimeout(() => {
        setShowAlert(false);
      }, 3000); // Dismiss after 3 seconds
    }
  };

  return (
    <div className="login-container">
      {showAlert && (
        <div className="alert-box">
          <p>{alertMessage}</p>
        </div>
      )}
      <img src={logo} alt="Logo" className="logo" />
      <h1 className="app-name">MeetUp</h1>
      <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit} className="login-form">
        {isSignUp && (
          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        {isSignUp && (
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {isSignUp && (
          <div className="form-group">
            <label htmlFor="birthdate">Birthdate:</label>
            <input
              type="date"
              id="birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
            />
          </div>
        )}
        <button type="submit" className="submit-button">
          {isSignUp ? 'Sign Up' : 'Login'}
        </button>
      </form>
      <button onClick={handleToggle} className="toggle-button">
        {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
};

export default LoginPage;