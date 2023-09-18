import React, { useState } from 'react';
import PropTypes from 'prop-types';

function SignupForm({ handleSignupClick }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('')

  return (
    <div>
      <h2>Sign Up</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Username:</label>
        <input
          type="username"
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
      <button onClick={() => handleSignupClick(email, username, password)}>Sign Up</button>
    </div>
  );
}

SignupForm.propTypes = {
  handleSignupClick: PropTypes.func.isRequired,
};

export default SignupForm;



