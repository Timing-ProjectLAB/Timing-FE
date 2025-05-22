// src/api/auth.ts
import api from './api';

export const login = (userId: string, password: string) => {
  return api.post('/auth/login', {
    userId,
    password,
  });
};

export const signup = (payload: {
  userId: string;
  password: string;
  birth_date: string;
  region_id: number;
  gender: number;
  income_bracket: number;
  occupation: string;
}) => {
  return api.post('/auth/signup', payload);
};