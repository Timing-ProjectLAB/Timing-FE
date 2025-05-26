// src/api/auth.ts
import api from './api';

/**
 * 로그인 요청 (세션 기반 인증)
 * @param user_id 사용자 아이디
 * @param password 사용자 비밀번호
 */
export const login = (user_id: string, password: string) => {
  return api.post(
    '/auth/login',
    { user_id, password },
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // 반드시 있어야 쿠키 세션 유지 가능
    }
  );
};

/**
 * 회원가입 요청
 */
export const signup = (payload: {
  user_id: string;
  password: string;
  birth_date: string;
  region_id: number;
  gender: number;
  income_bracket: number;
  occupation: string;
}) => {
  return api.post(
    '/auth/signup',
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // 쿠키 기반 인증을 유지할 경우에도 필요
    }
  );
};