import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, logoutUser } from '../Services/authService';

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser(formData);
      console.log('Login successful:', result);
      localStorage.setItem('token', result.token);
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      setError(error.message || 'An error occurred');
    }
  };

  const handleLogout = async () => {
    try {
      const result = await logoutUser();
      console.log('Logout successful:', result);
      // Remove the token from localStorage or state management
      localStorage.removeItem('token');
      // Set login status to false
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      <h2>{isLoggedIn ? 'Welcome' : 'Login'}</h2>
      {error && <div>{error.toString()}</div>}
      {!isLoggedIn ? (
        <form onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} />
          <button type="submit">Login</button>
        </form>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
};

export default Login;