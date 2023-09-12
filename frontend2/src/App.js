import React, { useState, useEffect } from 'react';
import Header from './Header';
import LoginForm from './LoginForm'; // Import your LoginForm component
import SignupForm from './SignupForm'; // Import your SignupForm component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login state
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Make a GET request to your Flask backend
    fetch('http://127.0.0.1:5001/api/', {
      method: "GET"
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
  }, []);

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} /> 
      {isLoggedIn ? (
        <h1>{message}</h1>
      ) : (
        <>
          <LoginForm onLogin={() => setIsLoggedIn(true)} /> {/* Render login form */}
          <SignupForm onSignup={() => setIsLoggedIn(true)} /> {/* Render signup form */}
        </>
      )}
    </div>
  );
}

export default App;
