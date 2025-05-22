import React, { useState } from 'react';
import { login } from '../auth';

const LoginPage = () => {
  const [user_id, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await login(user_id, password);
      alert('✅ 로그인 성공');
      console.log(res.data);
    } catch (err: any) {
      alert('❌ 로그인 실패: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>로그인</h2>
      <input placeholder="아이디" onChange={(e) => setUserId(e.target.value)} /><br />
      <input type="password" placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)} /><br />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
};

export default LoginPage;