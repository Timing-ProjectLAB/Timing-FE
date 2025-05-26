import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://34.64.53.103:8080',
  withCredentials: true, // ✅ 쿠키 주고받기 설정
   headers: {
      'Content-Type': 'application/json', // ✅ 명시적 설정
    },
});

// 요청 인터셉터 - 요청에 포함된 쿠키 확인
api.interceptors.request.use(config => {
  console.log('📤 [요청 헤더]', config.headers);
  return config;
});

// 응답 인터셉터 - 응답으로 받은 쿠키 확인
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