import React, { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { NavigationTypes } from '../navigations/NavigationTypes';

export default function LoginScreen(props: NavigationTypes.LoginScreenProps) {
  const [saveId, setSaveId] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { navigation } = props;
  const handleLogin = () => {
    // 후에는 실제 로그인 API로 변경
    if (username === '' || password === '') {
      return;
    } else {
      console.log(navigation.getState());
      navigation.navigate('ChatNavigator');
    }
  };
  return (
    <View className="flex w-screen h-screen bg-white justify-center items-center">
      <View className="flex w-full h-1/2 items-center justify-center">
        <View className="flex w-full h-3/4 mb-4">
          <View className="flex w-full h-2/3 items-center">
            <Text className="font-inter font-bold text-2xl">아이디</Text>
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="아이디를 입력하세요"
              className="flex w-4/5 h-[48px] bg-gray-200 rounded-xl my-2 mb-3 border-[#007AFF] border-2 px-4 font-inter text-base"
              placeholderTextColor="#999"
            />
            <Text className="font-inter font-bold text-2xl">비밀번호</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="비밀번호를 입력하세요"
              secureTextEntry
              className="flex w-4/5 h-[48px] bg-gray-200 rounded-xl my-2 border-[#007AFF] border-2 px-4 font-inter text-base"
              placeholderTextColor="#999"
            />
          </View>

          <View className="flex w-full h-1/3">
            <View className="flex-row w-full h-1/3 items-center justify-around px-10">
              <Pressable
                className="flex-row items-center"
                onPress={() => setSaveId(!saveId)}
              >
                <View className="w-5 h-5 border-2 border-blue-500 mr-2 items-center justify-center rounded-sm bg-white">
                  {saveId && (
                    <View className="w-5 h-5 bg-blue-500 rounded-sm" />
                  )}
                </View>
                <Text className="font-inter font-semibold text-lg">
                  아이디 저장
                </Text>
              </Pressable>

              <Pressable
                className="flex-row items-center"
                onPress={() => setAutoLogin(!autoLogin)}
              >
                <View className="w-5 h-5 border-2 border-blue-500 mr-2 items-center justify-center rounded-sm bg-white">
                  {autoLogin && (
                    <View className="w-5 h-5 bg-blue-500 rounded-sm" />
                  )}
                </View>
                <Text className="font-inter font-semibold text-lg">
                  자동로그인
                </Text>
              </Pressable>
            </View>

            <View className="flex w-full h-2/3 items-center justify-center my-2">
              <Pressable
                className="flex w-5/6 h-[50px] bg-[#007AFF] rounded-xl items-center justify-center"
                onPress={() => handleLogin()}
              >
                <Text className="font-inter font-bold text-white text-2xl">
                  로그인
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View className="flex w-full h-auto items-center">
          <Pressable
            onPress={() => {
              navigation.navigate('RegisterNavigator');
            }}
          >
            <Text className="font-inter text-lg text-[#007AFF] my-1">
              회원가입
            </Text>
          </Pressable>
          <Pressable>
            <Text className="font-inter text-lg text-[#007AFF]">
              비밀번호를 잊어버렸나요?
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
