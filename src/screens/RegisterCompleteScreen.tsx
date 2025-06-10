// src/screens/RegisterCompleteScreen.tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Next from '../assets/images/Next.svg';
import { NavigationTypes } from '../navigations/NavigationTypes';
import { signup } from '../../api/auth'; // 백엔드 회원가입 API
import { useUser } from '../contexts/UserContext';


export default function RegisterCompleteScreen(
  props: NavigationTypes.RegisterCompleteScreenProps,
) {
  const { navigation } = props;
  const { userInfo } = useUser();

 const handleNext = async () => {
   try {
     console.log('📤 회원가입 요청:', userInfo);

     const payload = {
       user_id: userInfo.userId,
       password: userInfo.password!,
       birth_date: userInfo.birth_date!, // YYYY-MM-DD
       region_id: userInfo.regionId!,
       gender: userInfo.gender!,
       income_bracket: userInfo.incomeLevel!,
       occupation: userInfo.occupation!,
     };

     const res = await signup(payload);
     console.log('✅ 회원가입 성공:', res.data);

     navigation.reset({
       index: 0,
       routes: [{ name: 'LoginScreen' }],
     });
   } catch (err: any) {
     console.error('❌ 회원가입 실패:', err.response?.data || err.message);
   }
 };

  return (
    <View className="flex w-screen h-screen bg-white">
      <View className="flex w-full h-1/6 items-center justify-end">
        <View className="flex w-4/5 h-[5px] rounded-full bg-gray-300 mb-4">
          <View className="flex w-full h-full bg-[#09F2C3]" />
        </View>
      </View>
      <View className="flex w-full h-5/6 ">
        <View className="flex w-full h-2/3 items-center justify-start">
          <View className="flex w-5/6 h-5/6 items-center justify-center">
            <Text className="font-inter font-bold text-2xl">
              완료 되었습니다!
            </Text>
            <Text className="font-inter font-bold text-2xl">
              로그인 후 맞춤형 정책을
            </Text>
            <Text className="font-inter font-bold text-2xl">
              추천 받아보세요!
            </Text>
          </View>
        </View>
        <View className="flex w-full h-1/3 items-center justify-center">
          <Pressable
            className="flex-row w-5/6 h-[48px] bg-[#007AFF] rounded-xl items-center justify-center relative"
            onPress={handleNext}
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