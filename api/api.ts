import axios from 'axios';
import { API_BASE_URL } from '@env'; // ⬅️ 환경 변수 import

console.log('✅ .env에서 불러온 API_BASE_URL:', API_BASE_URL); // 추가

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  console.log('📤 [요청 헤더]', config.headers);
  return config;
});

api.interceptors.response.use(
  response => {
    console.log('📥 [응답 헤더]', response.headers);
    return response;
  },
  error => {
    console.log('❌ [응답 에러]', error.response?.headers);
    return Promise.reject(error);
  }
);

export default api;