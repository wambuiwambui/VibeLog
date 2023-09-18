import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from './Header';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import JournalEntry from './JournalEntry';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Use useNavigate to navigate programmatically

  useEffect(() => {
    // Make a GET request to your Flask backend
    fetch('http://localhost:5001/api', {
      method: 'GET',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Network response was not ok (${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        // Set the message from the JSON response in the state
        setMessage(data.message);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        // Handle the error
      });
  }, [message]);

  const handleSignupClick = async (email, username, password) => {
    console.log('Signup button clicked');
    try {
      // Make a POST request to your signup API endpoint with the email and password
      const response = await fetch('http://localhost:5001/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // redirect to login
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
      // Handle the error (e.g., display an error message to the user)
    }
  };

  const handleLoginClick = async (username, password) => {
    try {
      // Make a POST request to your login API endpoint with the username and password
      const response = await fetch('http://localhost:5001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // Login successful, set isLoggedIn to true
      setIsLoggedIn(true);
      // save the access and refresh tokens in local storage for later use
      const res = await response.json()
      const { access_token, refresh_token } = res
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('refresh_token', refresh_token)
      // Navigate to the desired page (e.g., home)
      navigate('/journal-entry');
    } catch (error) {
      console.error('Login error:', error);
      // Handle the error (e.g., display an error message to the user)
    }
  };

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<h1>{message}</h1>} />
        <Route
          path="/login"
          element={<LoginForm handleLoginClick={handleLoginClick} />}
        />
        <Route
          path="/signup"
          element={<SignupForm handleSignupClick={handleSignupClick} />}
        />
       <Route path="/journal-entry" element={<JournalEntry />} />
      </Routes>
    </div>
  );
}

export default App;
