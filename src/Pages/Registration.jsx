import React, { useState } from 'react';
import { registerUser } from '../Services/authService';

const Registeration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await registerUser(formData);
      console.log('Registration successful:', result);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registeration;