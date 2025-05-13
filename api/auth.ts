import api from './api';

export interface SignupPayload {
  user_id: string;
  password: string;
  birth_date: string;
  region_id: number;
  gender: number;
  income_bracket: number;
  occupation: string;
}

export const signup = (payload: SignupPayload) => {
  return api.post('/auth/signup', payload);
};