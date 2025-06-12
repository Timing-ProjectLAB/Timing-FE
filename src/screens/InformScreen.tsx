import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import { NavigationTypes } from '../navigations/NavigationTypes';
import GoBack from '../assets/images/goBack.svg';
import { getPolicyDetail } from '../../api/policy';

// 정책 타입 정의
type Policy = {
  policy_id: string;
  plcyKywdNm: string;
  policy_name: string;
  policy_description: string;
  policy_summary: {
    operating_agency: string;
    application_period: string;
    application_url: string;
  };
  target_audience: string[];
  support_content: string[];
};

// 샘플 정책 ID 리스트 (하드코딩된 테스트용)
const TEST_POLICY_IDS = [
  '20250521005400110863',
  '20250522005400210870',
  '20250520005400210861',
  '20250517005400210845',
  '20250529005400210880',
];

export default function InformScreen({
  navigation,
  route,
}: NavigationTypes.InformationScreenProps) {
  const [policy, setPolicy] = useState<Policy | null>(null);

useEffect(() => {
  const fetchPolicy = async () => {
    let policyId = route.params?.policy_id;

    if (!policyId) {
      console.warn('🧪 랜덤 테스트용 정책 ID 선택');
      const randomIndex = Math.floor(Math.random() * TEST_POLICY_IDS.length);
      policyId = TEST_POLICY_IDS[randomIndex];
    }

    try {
      const res = await getPolicyDetail(policyId);
      const data = res.data;

      console.log('✅ 정책 상세 응답:', data);

      // 🔁 camelCase → snake_case 수동 매핑
      const parsed: Policy = {
        policy_id: data.policyId,
        plcyKywdNm: data.plcyKywdNm,
        policy_name: data.policyName,
        policy_description: data.policyDescription,
        policy_summary: {
          operating_agency: data.policySummary.operatingAgency,
          application_period: data.policySummary.applicationPeriod,
          application_url: data.policySummary.applicationUrl,
        },
        target_audience: data.targetAudience,
        support_content: data.supportContent,
      };

      setPolicy(parsed);
    } catch (error: any) {
      console.error('❌ 정책 상세 조회 실패:', error);
      setPolicy(samplePolicy);
    }
  };

  fetchPolicy();
}, []);
  if (!policy) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-lg">정책 정보를 불러오는 중입니다...</Text>
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
          <Text className="font-inter text-lg font-bold text-[#007AFF]">
            지원 정책
          </Text>
        </View>
        <View className="w-6" />
      </View>

      {/* 본문 */}
      <ScrollView className="flex-1 px-5 py-4 mb-[80px]">
        <Text className="font-bold text-3xl text-black mb-2 leading-snug">
          {policy.policy_name}
        </Text>

        {/* 키워드 */}
        <View className="flex-row flex-wrap gap-2 mb-3">
          {policy.plcyKywdNm.split(',').map((tag: string, index: number) => (
            <View key={tag} className="px-3 py-1.5 rounded-full bg-[#E8EFF7]">
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
        <Text className="text-base text-gray-800 mb-4">
          {policy.policy_description}
        </Text>

        {/* 요약 카드 */}
        <View className="border border-gray-300 rounded-lg px-4 py-4 mb-6">
          <Text className="text-lg mb-1">
            <Text className="font-semibold">운영기관</Text>
            {'    '}
            {policy.policy_summary.operating_agency}
          </Text>
          <Text className="text-lg mb-1">
            <Text className="font-semibold">신청기간</Text>
            {'    '}
            {policy.policy_summary.application_period}
          </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(policy.policy_summary.application_url)}
          >
            <Text className="text-base text-gray-500 font-medium mt-1">
              링크 바로가기 &gt;
            </Text>
          </TouchableOpacity>
        </View>

        {/* 지원 대상 */}
        <Text className="font-bold text-xl mb-2">지원대상</Text>
        {policy.target_audience.map((item: string, index: number) => (
          <Text key={index} className="text-base text-gray-700 mb-1">
            • {item}
          </Text>
        ))}

        {/* 지원 내용 */}
        <Text className="font-bold text-xl mt-6 mb-2">지원내용</Text>
        {policy.support_content.map((item: string, index: number) => (
          <Text key={index} className="text-base text-gray-700 mb-1">
            • {item}
          </Text>
        ))}

        <View className="h-[60px]" />
        {/* 전체 JSON 보기 (디버깅용) */}
        <Text className="font-bold text-lg mt-8 mb-2">📦 전체 응답 JSON</Text>
        <Text className="text-xs text-gray-500 whitespace-pre-wrap">
          {JSON.stringify(policy, null, 2)}
        </Text>
      </ScrollView>

      {/* 하단 버튼 */}
      <View className="absolute bottom-0 left-0 right-0 pb-8 pt-3 px-5 border-t border-gray-200 bg-white">
        <TouchableOpacity
          className="w-full h-[50px] rounded-xl bg-[#007AFF] justify-center items-center"
          onPress={() => Linking.openURL(policy.policy_summary.application_url)}
        >
          <Text className="text-white text-lg font-bold">신청하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
