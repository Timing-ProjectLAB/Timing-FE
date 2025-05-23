// api/auth.ts
import api from './api';

export const login = (user_id: string, password: string) => {
  return api.post('/auth/login', { user_id, password });
};

export const signup = (payload: {
  user_id: string;
  password: string;
  birth_date: string;
  region_id: number;
  gender: number;
  income_bracket: number;
  occupation: string;
}) => {
  return api.post('/auth/signup', payload);
};