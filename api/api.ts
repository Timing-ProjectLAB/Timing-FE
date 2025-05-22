// src/api/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://34.64.53.103:8080', // ← Android 에뮬레이터에서 localhost 접근
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // ← 세션 쿠키(JSESSIONID) 주고받기 위해 필수
});

export default api;