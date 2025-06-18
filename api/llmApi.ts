// src/api/llmApi.ts
import axios from 'axios';
import { LLM_BASE_URL } from '@env';

console.log('✅ .env에서 불러온 LLM_BASE_URL:', LLM_BASE_URL);

const llmApi = axios.create({
  baseURL: LLM_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// 요청/응답 로깅 (선택)
llmApi.interceptors.request.use(cfg => {
  console.log('📤 [LLM 요청]', cfg.method, cfg.url, cfg.data);
  return cfg;
});
llmApi.interceptors.response.use(
  res => {
    console.log('📥 [LLM 응답]', res.data);
    return res;
  },
  err => {
    console.log('❌ [LLM 에러]', err.response?.data);
    return Promise.reject(err);
  }
);

export default llmApi;