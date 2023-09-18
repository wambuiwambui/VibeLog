import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const headerStyle = {
    background: `url('/logo.png') center/cover no-repeat`,
    height: '50vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const containerStyle = {
    background: '#888',
    padding: '60px',
    borderRadius: '8px',
    boxShadow: '1px 0px 10px 0px rgba(0,0,0,0.2)',
    textAlign: 'center', // Center text horizontally
  };

  const titleStyle = {
    color: '#1877f2',
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const descriptionStyle = {
    color: '#333',
    fontSize: '18px',
    marginBottom: '20px',
  };

  const buttonStyle = {
    margin: '5px',
  };

  return (
    <header style={headerStyle}>
      <div className="container" style={containerStyle}>
        <h1 style={titleStyle}>Welcome to VibeLog</h1>
        <p style={descriptionStyle}>
          Your personal journaling app to capture your thoughts and experiences.
        </p>
        <div>
          <Link to="/login" style={buttonStyle}>
            Login
          </Link>
          <Link to="/signup" style={buttonStyle}>
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;



