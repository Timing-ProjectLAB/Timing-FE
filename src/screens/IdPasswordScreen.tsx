import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import Next from '../assets/images/Next.svg';
import { NavigationTypes } from '../navigations/NavigationTypes';

export default function IdPasswordScreen(
  props: NavigationTypes.IdPasswordScreenProps,
) {
  const [user_id, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const { navigation } = props;
  const handleNext = () => {
    if (user_id === '' || password === '') {
      return;
    } else {
      navigation.navigate('BirthLocationScreen');
    }
  };
  return (
    <View className="flex w-screen h-screen bg-white">
      <View className="flex w-full h-1/6 items-center justify-end">
        <View className="flex w-4/5 h-[5px] rounded-full bg-gray-300 mb-4">
          <View className="flex w-1/4 h-full bg-[#09F2C3]" />
        </View>
      </View>
      <View className="flex w-full h-5/6">
        <View className="flex w-full h-2/3 items-center justify-center">
          <View className="flex w-5/6 h-5/6 ">
            <View>
              <Text className="font-inter font-bold text-2xl">아이디</Text>
              <TextInput
                value={user_id}
                onChangeText={setUserId}
                className="flex w-full h-[48px] bg-gray-200 rounded-xl my-2 mb-8 border-[#007AFF] border-2 px-4 font-inter text-base"
                placeholderTextColor="#999"
              />
              <Text className="font-inter font-bold text-2xl">비밀번호</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                className="flex w-full h-[48px] bg-gray-200 rounded-xl my-2 border-[#007AFF] border-2 px-4 font-inter text-base"
                placeholderTextColor="#999"
              />
            </View>
          </View>
        </View>
        <View className="flex w-full h-1/3 items-center justify-center">
          <Pressable
            className="flex-row w-5/6 h-[48px] bg-[#007AFF] rounded-xl items-center justify-center relative"
            onPress={() => handleNext()}
          >
            <Text className="font-inter font-bold text-xl text-white">
              다음
            </Text>
            <View className="absolute right-5">
              <Next width={14} height={14} />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
