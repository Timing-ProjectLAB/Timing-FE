import axios from 'axios';

const api = axios.create({
  baseURL: 'http://34.64.53.103:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // ← JSESSIONID 쿠키 저장 위해 꼭 필요!
});

export default api;