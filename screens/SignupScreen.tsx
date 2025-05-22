import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { signup } from '../api/auth';

const SignupScreen = () => {
  const [form, setForm] = useState({
    user_id: '',
    password: '',
    birth_date: '',
    region_id: 1,
    gender: 1,
    income_bracket: 5,
    occupation: '',
  });

  const handleChange = (name: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    console.log('📤 회원가입 요청:', form);
    try {
      const res = await signup(form);
      console.log('✅ 회원가입 성공 응답:', res.data);
      Alert.alert('✅ 회원가입 성공', res.data?.message || '');
    } catch (err: any) {
      console.log('❌ 회원가입 실패:', err.response?.status, err.response?.data || err.message);
      Alert.alert('❌ 회원가입 실패', err.response?.data?.message || '에러 발생');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        placeholder="아이디"
        style={styles.input}
        onChangeText={(v) => handleChange('user_id', v)}
      />
      <TextInput
        placeholder="비밀번호"
        style={styles.input}
        secureTextEntry
        onChangeText={(v) => handleChange('password', v)}
      />
      <TextInput
        placeholder="생년월일 (YYYY-MM-DD)"
        style={styles.input}
        onChangeText={(v) => handleChange('birth_date', v)}
      />
      <TextInput
        placeholder="지역 ID (숫자)"
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(v) => handleChange('region_id', parseInt(v))}
      />
      <TextInput
        placeholder="성별 (1=남성, 0=여성)"
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(v) => handleChange('gender', parseInt(v))}
      />
      <TextInput
        placeholder="소득 수준 (1~10)"
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(v) => handleChange('income_bracket', parseInt(v))}
      />
      <TextInput
        placeholder="직업"
        style={styles.input}
        onChangeText={(v) => handleChange('occupation', v)}
      />
      <Button title="회원가입" onPress={handleSignup} />
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1, justifyContent: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 10, borderRadius: 5 },
});