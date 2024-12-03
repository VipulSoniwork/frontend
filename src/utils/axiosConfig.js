import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // Your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;