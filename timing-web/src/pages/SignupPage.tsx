import React, { useState } from 'react';
import { signup } from '../auth';

const SignupPage = () => {
  const [form, setForm] = useState({
    user_id: '',
    password: '',
    birth_date: '',
    region_id: 1,
    gender: 1,
    income_bracket: 5,
    occupation: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: ['region_id', 'gender', 'income_bracket'].includes(name)
        ? parseInt(value)
        : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await signup(form);
      alert('✅ 회원가입 성공: ' + res.data.message);
    } catch (err: any) {
      alert('❌ 회원가입 실패: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>회원가입</h2>
      <input name="user_id" placeholder="아이디" onChange={handleChange} /><br />
      <input name="password" type="password" placeholder="비밀번호" onChange={handleChange} /><br />
      <input name="birth_date" type="date" onChange={handleChange} /><br />
      <select name="region_id" onChange={handleChange}>
        <option value="1">서울</option>
        <option value="2">부산</option>
        <option value="3">대구</option>
      </select><br />
      <select name="gender" onChange={handleChange}>
        <option value="1">남성</option>
        <option value="0">여성</option>
      </select><br />
      <input name="income_bracket" type="number" placeholder="소득수준 (1~10)" onChange={handleChange} /><br />
      <input name="occupation" placeholder="직업" onChange={handleChange} /><br />
      <button onClick={handleSubmit}>회원가입</button>
    </div>
  );
};

export default SignupPage;