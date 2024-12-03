import axios from '../utils/axiosConfig';

export const loginUser = async (username, password) => {
  try {
    console.log(username, password)
    const response = await axios.post('/api/auth/login', { username, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Login failed');
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axios.get('/api/auth/profile');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to fetch profile');
  }
};