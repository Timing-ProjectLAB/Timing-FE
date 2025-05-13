import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { signup } from './api/auth';

const App = () => {
  useEffect(() => {
    const testSignup = async () => {
      try {
        const res = await signup({
          user_id: 'johndoe123',
          password: 'Password123!',
          birth_date: '1995-06-15',
          region_id: 3,
          gender: 1,
          income_bracket: 5,
          occupation: 'software engineer',
        });

        console.log('✅ 회원가입 성공:', res.data);
      } catch (err: any) {
        console.error('❌ API 호출 에러:', err.response?.data || err.message);
      }
    };

    testSignup();
  }, []);

  return (
    <View>
      <Text>📡 회원가입 테스트 중...</Text>
    </View>
  );
};

export default App;