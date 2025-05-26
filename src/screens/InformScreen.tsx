import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { NavigationTypes } from '../navigations/NavigationTypes';
import GoBack from '../assets/images/goBack.svg';

type Policy = {
  title: string; // 제목
  content: string; // 정책 내용
  target: string; // 지원 대상
  amount: string; // 금액
  date: string; // 신청 기간
  link: string; // 바로가기 링크
};

export default function InformScreen({
  navigation,
  route,
}: NavigationTypes.InformationScreenProps) {
  const { policy } = route.params as { policy: Policy };

  return (
    <View className="flex w-screen h-screen bg-white">
      <View className="flex-row items-center h-[80px] px-4 border-b border-gray-200 pt-5">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <GoBack />
        </TouchableOpacity>
        <View className="flex-1 items-center">
          <Text className="font-inter text-lg font-bold text-[#007AFF]">
            지원 정책
          </Text>
        </View>
        <View className="w-6" />
      </View>

      <View className="m-4 bg-[#8DD5FF] rounded-xl p-4">
        <Text className="text-xl font-bold mb-4">{policy.title}</Text>
        <Text className="text-sm font-semibold text-[#007AFF]">정책 내용</Text>
        <Text className="text-sm mb-4">{policy.content}</Text>
        <Text className="text-sm font-semibold text-[#007AFF]">지원 대상</Text>
        <Text className="text-sm mb-4">{policy.target}</Text>
        <Text className="text-sm font-semibold text-[#007AFF]">금액</Text>
        <Text className="text-sm mb-4">{policy.amount}</Text>
        <Text className="text-sm font-semibold text-[#007AFF]">신청기간</Text>
        <Text className="text-sm mb-6">{policy.date}</Text>
        {policy.link && (
          <TouchableOpacity
            onPress={() => Linking.openURL(policy.link!)}
            className="self-end bg-white px-4 py-2 rounded border border-gray-300"
          >
            <Text className="text-sm font-medium text-black">바로가기 →</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
