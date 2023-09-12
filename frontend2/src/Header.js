import React from 'react';

function Header() {
  const headerStyle = {
    background: `url('/logo.png') center/cover no-repeat`,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const containerStyle = {
    background: '#888',
    padding: '80px',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
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
          <button className="btn btn-primary" style={buttonStyle}>
            Sign Up
          </button>
          <button className="btn btn-success" style={buttonStyle}>
            Login
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;



