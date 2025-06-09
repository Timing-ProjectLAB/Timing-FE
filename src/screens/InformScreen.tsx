import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { NavigationTypes } from '../navigations/NavigationTypes';
import GoBack from '../assets/images/goBack.svg';
import api from '../../api/api'; // axios 인스턴스

type Policy = {
  policyId: string;
  plcyKywdNm: string;
  policyName: string;
  policyDescription: string;
  policySummary: {
    operatingAgency: string;
    applicationPeriod: string;
    applicationUrl: string;
  };
  targetAudience: string[];
  supportContent: string[];
};

export default function InformScreen({
  navigation,
  route,
}: NavigationTypes.InformationScreenProps) {
  const [policy, setPolicy] = useState<Policy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const res = await api.get(`/policy/detail/${route.params.policy_id}`);
        console.log('📦 정책 상세 응답:', res.data);
        setPolicy(res.data);
      } catch (error: any) {
        console.error('❌ 정책 조회 실패:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();
  }, [route.params.policy_id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!policy) {
    return (
      <View className="flex-1 justify-center items-center bg-white px-6">
        <Text className="text-lg text-gray-700">정책 정보를 불러오지 못했습니다.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {/* 헤더 */}
      <View className="flex-row items-center h-[80px] px-4 border-b border-gray-200 pt-5">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <GoBack />
        </TouchableOpacity>
        <View className="flex-1 items-center">
          <Text className="font-inter text-lg font-bold text-[#007AFF]">지원 정책</Text>
        </View>
        <View className="w-6" />
      </View>

      {/* 본문 */}
      <ScrollView className="flex-1 px-5 py-4 mb-[80px]">
        {/* 제목 */}
        <Text className="font-bold text-3xl text-black mb-2 leading-snug">
          {policy.policyName}
        </Text>

        {/* 키워드 태그 */}
        <View className="flex-row flex-wrap gap-2 mb-3">
          {policy.plcyKywdNm.split(',').map((tag: string, index: number) => (
            <View key={index} className="px-3 py-1.5 rounded-full bg-[#E8EFF7]">
              <Text
                className={`font-pre text-base font-medium ${
                  index % 2 === 0 ? 'text-[#0060C9]' : 'text-[#0DE2B8]'
                }`}
              >
                #{tag}
              </Text>
            </View>
          ))}
        </View>

        {/* 설명 */}
        <Text className="text-base text-gray-800 mb-4">{policy.policyDescription}</Text>

        {/* 요약 정보 */}
        <View className="border border-gray-300 rounded-lg px-4 py-4 mb-6">
          <Text className="text-lg mb-1">
            <Text className="font-semibold">운영기관</Text>
            {'    '}
            {policy.policySummary.operatingAgency}
          </Text>
          <Text className="text-lg mb-1">
            <Text className="font-semibold">신청기간</Text>
            {'    '}
            {policy.policySummary.applicationPeriod}
          </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(policy.policySummary.applicationUrl)}
          >
            <Text className="text-base text-gray-500 font-medium mt-1">
              링크 바로가기 &gt;
            </Text>
          </TouchableOpacity>
        </View>

        {/* 지원 대상 */}
        <Text className="font-bold text-xl mb-2">지원대상</Text>
        {policy.targetAudience.map((item: string, index: number) => (
          <Text key={index} className="text-base text-gray-700 mb-1">
            • {item}
          </Text>
        ))}

        {/* 지원 내용 */}
        <Text className="font-bold text-xl mt-6 mb-2">지원내용</Text>
        {policy.supportContent.map((item: string, index: number) => (
          <Text key={index} className="text-base text-gray-700 mb-1">
            • {item}
          </Text>
        ))}
        <View className="h-[60px]" />
      </ScrollView>

      {/* 하단 버튼 */}
      <View className="absolute bottom-0 left-0 right-0 pb-8 pt-3 px-5 border-t border-gray-200 bg-white">
        <TouchableOpacity
          className="w-full h-[50px] rounded-xl bg-[#007AFF] justify-center items-center"
          onPress={() => Linking.openURL(policy.policySummary.applicationUrl)}
        >
          <Text className="text-white text-lg font-bold">신청하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}