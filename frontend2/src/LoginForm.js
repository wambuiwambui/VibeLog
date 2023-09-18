// LoginForm.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function LoginForm({ handleLoginClick }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button onClick={() => handleLoginClick(username, password)}>Login</button>
    </div>
  );
}

LoginForm.propTypes = {
  handleLoginClick: PropTypes.func.isRequired
};

export default LoginForm;
