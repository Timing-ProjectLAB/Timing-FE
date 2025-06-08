import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import { NavigationTypes } from '../navigations/NavigationTypes';
import GoBack from '../assets/images/goBack.svg';

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

const samplePolicy: Policy = {
  policy_id: '20250521005400110863',
  plcyKywdNm: '교육지원,보조금',
  policy_name: '주거 안정 장학금',
  policy_description:
    "원거리 대학 진학으로 인해 주거 관련 비용 부담이 큰 저소득 대학생을 대상으로 주거 부담 경감을 위한 '주거안정장학금' 지원",
  policy_summary: {
    operating_agency: '한국장학재단',
    application_period: '2025.05.23 ~ 06.23',
    application_url:
      'https://www.kosaf.go.kr/ko/scholar.do?pg=scholarship05_12_18&ttab1=0',
  },
  target_audience: [
    '대한민국 국적을 소지하고 재학 중인 대학생(대학원생 제외)',
    "당해연도 1월 1일 기준 만 39세 이하('85.1.1.이후 출생)로 미혼인 자",
    '기초생활수급자 또는 차상위계층으로 확인된 자',
    '원거리 지역에 해당하는 자',
  ],
  support_content: [
    '월 최대 20만 원 지원',
    '임차료(전·월세, 보증금 등) 지원',
    '주거 유지·관리비(수선유지비, 공동주택관리비 등) 지원',
    '수도·연료비(상하수도, 전기, 가스, 열, 등유, 연탄 등) 지원',
  ],
};

export default function InformScreen({
  navigation,
  route,
}: NavigationTypes.InformationScreenProps) {
  const policy = samplePolicy; // 현재는 샘플 데이터로 처리, API 연동 시 변경 필요

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

      {/* 본문 스크롤 영역 */}
      <ScrollView className="flex-1 px-5 py-4 mb-[80px]">
        {/* 제목 */}
        <Text className="font-bold text-3xl text-black mb-2 leading-snug">
          {policy.policy_name}
        </Text>

        {/* 키워드 태그 */}
        <View className="flex-row space-x-2 mb-3">
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

        {/* 요약 정보 카드 */}
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
            onPress={() =>
              Linking.openURL(policy.policy_summary.application_url)
            }
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
      </ScrollView>

      {/* 하단 고정 버튼 */}
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
