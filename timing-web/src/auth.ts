/*import api from './api';

export const login = (user_id: string, password: string) => {
  return api.post('/auth/login', { user_id, password });
};
*/



import api from './api';

export const login = async (user_id: string, password: string) => {
  const token = btoa(`${user_id}:${password}`); // ← 아이디:비밀번호 Base64 인코딩

  return api.post('/auth/login', null, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
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