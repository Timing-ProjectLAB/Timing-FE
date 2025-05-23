// api/api.ts
import axios from 'axios';
import { API_BASE_URL } from '@env'; // .env에서 불러옴

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 세션 쿠키 주고받기용
});

console.log('✅ baseURL:', API_BASE_URL);

export default api;