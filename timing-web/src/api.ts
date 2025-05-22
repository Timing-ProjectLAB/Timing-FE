import axios from 'axios';

const api = axios.create({
  baseURL: 'http://34.64.53.103:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;