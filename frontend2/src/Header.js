import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Header({ isLoggedIn, setIsLoggedIn }) {
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
  };

  const headerStyle = {
    background: '#333', // Dark gray background for the navigation bar
    color: 'white',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
    padding: '20px 0',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  };

  const logoStyle = {
    fontWeight: 'bold',
    fontSize: '28px',
    textDecoration: 'none',
    color: 'white',
  };

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const linkStyle = {
    margin: '0 20px',
    fontSize: '18px',
    textDecoration: 'none',
    color: 'white',
  };

  const logoutButtonStyle = {
    background: 'transparent',
    border: 'none',
    fontSize: '16px',
    textDecoration: 'underline',
    color: 'white',
    cursor: 'pointer',
  };

  const introContainerStyle = {
    background: '#f0f0f0', // Gray background for the introductory section
    padding: '20px',
  };

  const introTextStyle = {
    textAlign: 'center',
  };

  return (
    <header className="header">
      <div style={headerStyle}>
        <div style={containerStyle}>
          <Link to="/" style={logoStyle}>
            VibeLog
          </Link>
          <nav style={navStyle}>
            {isLoggedIn ? (
              <>
                <Link to="/journal-entry" style={linkStyle}>
                  Journal
                </Link>
                <button onClick={handleLogout} style={logoutButtonStyle}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" style={linkStyle}>
                  Login
                </Link>
                <Link to="/signup" style={linkStyle}>
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
      <div style={introContainerStyle}>
        <div style={introTextStyle}>
          <h1 className="title">Welcome to Vibelog</h1>
          <p className="description">
            Your personal journaling app to capture your thoughts and experiences.
          </p>
          <p>
            Start journaling today and let your thoughts flow freely!
          </p>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Header;
