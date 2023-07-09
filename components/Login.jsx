import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'; // Import useHistory hook
import { login } from '@/utils/api';
import { setAuth } from '@/store/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory(); // Initialize useHistory hook
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      // Perform login logic here
      const response = await login(username, password); // Assuming you have an API function for login

      // Dispatch action to store auth data in the Redux store
      dispatch(setAuth(response.data));

      // Redirect to home page
      history.push('/');
    } catch (error) {
      // Handle login error
      setError('Invalid username or password');
      console.log(error);
    }
  };

  const handleLogout = () => {
    // Clear auth data in the Redux store (assuming you have implemented this action)
    dispatch(clearAuth());

    // Redirect to login page
    history.push('/login');
  };

  return (
    <div>
      <h2>Login Page</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LoginPage;
