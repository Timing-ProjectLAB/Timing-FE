import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { login } from '../api/auth';
import api from '../api/api';

const LoginScreen = () => {
  const navigation = useNavigation<any>();

  const [user_id, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log('📡 요청 주소:', api.defaults.baseURL + '/auth/login');
    console.log('📤 로그인 바디:', { user_id, password });

    try {
      const res = await login(user_id, password);
      console.log('✅ 응답 헤더:', res.headers);
    } catch (err: any) {
      console.log('❌ 로그인 실패:', err.response?.status, err.response?.data || err.message);
      Alert.alert('❌ 로그인 실패', err.response?.data?.message || err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>

      <TextInput
        placeholder="아이디"
        style={styles.input}
        value={user_id}
        onChangeText={setUserId}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="비밀번호"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="로그인" onPress={handleLogin} />

      <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>
        👉 아직 회원이 아니라면? 회원가입
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 10,
    borderRadius: 6,
  },
  link: {
    marginTop: 24,
    color: 'blue',
    textAlign: 'center',
    fontSize: 14,
  },
});