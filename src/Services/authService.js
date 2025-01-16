import api from './api';

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/api/User/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await api.post('/api/User/login', loginData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.get('/api/User/logout');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};