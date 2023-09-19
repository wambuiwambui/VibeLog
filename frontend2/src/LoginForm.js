import React, { useState } from 'react';
import PropTypes from 'prop-types';

function LoginForm({ handleLoginClick }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const formStyle = {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '8px',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  };

  const inputStyle = {
    width: '100%',
    marginBottom: '10px',
    padding: '8px',
    fontSize: '16px',
    border: 'none',
    borderBottom: '1px solid #1877f2',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    background: '#1877f2',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '18px',
    cursor: 'pointer',
  };

  return (
    <div style={formStyle}>
      <h2>Login</h2>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          required
        />
      </div>
      <button onClick={() => handleLoginClick(username, password)} style={buttonStyle}>
        Login
      </button>
    </div>
  );
}

LoginForm.propTypes = {
  handleLoginClick: PropTypes.func.isRequired
};

export default LoginForm;
