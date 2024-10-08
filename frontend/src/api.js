import axios from 'axios';

const api = axios.create({

  // baseURL: 'http://localhost:3003',
  baseURL: 'https://workx-backend.onrender.com'//do remember to change the url in auth/login as well
  // baseURL: 'https://work-x-backend.vercel.app/'
});


//an interceptor to include the token in the headers of all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('user-token');
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;