import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { NavigationTypes } from '../navigations/NavigationTypes';
import ChatIcon from '../assets/images/chatIcon.svg';
import HomeIcon from '../assets/images/homeIcon.svg';
import QuestionIcon from '../assets/images/questionIcon.svg';

type Policy = {
  policy_id: string;
  policyName: string;
  supportSummary: string;
  applicationDeadline: string;
  inquiryCount: number;
};

const popularPolicies: Policy[] = [
  {
    policy_id: '20250521005400110863',
    policyName: '주거안정장학금',
    supportSummary: '지원금액: 월 최대 20만 원',
    applicationDeadline: '2025.06.23',
    inquiryCount: 1552,
  },
  {
    policy_id: '20250519005400210851',
    policyName: '서울 영테크',
    supportSummary: '무료 재무상담(대면, 비대면) 및 금융교육, 커뮤니티 운영',
    applicationDeadline: '2025.11.30',
    inquiryCount: 742,
  },
  {
    policy_id: '20250520005400210862',
    policyName: '부산 청년돌봄이음',
    supportSummary: '1. 청년 돌봄이음 시범사업(제공기관 : 종합사회복지관)...',
    applicationDeadline: '상시',
    inquiryCount: 254,
  },
];

const customPolicies: Policy[] = [
  {
    policy_id: '20250521005400110863',
    policyName: '주거안정장학금',
    supportSummary: '지원금액: 월 최대 20만 원',
    applicationDeadline: '2025.06.23',
    inquiryCount: 1552,
  },
  {
    policy_id: '20250520005400210862',
    policyName: '부산 청년돌봄이음',
    supportSummary: '1. 청년 돌봄이음 시범사업(제공기관 : 종합사회복지관)...',
    applicationDeadline: '상시',
    inquiryCount: 254,
  },
  {
    policy_id: '20250529005400210880',
    policyName: '2025년 화성시 청년정책 아이디어 공모전',
    supportSummary: '접수기간: 2025. 6. 2.(월) ~ 6. 20.(금)',
    applicationDeadline: '2025.06.20',
    inquiryCount: 92,
  },
];

const renderTag = (applicationDeadline: string) => {
  const isOngoing =
    applicationDeadline === '상시' || applicationDeadline === '정보없음';

  let tagLabel = '상시';
  let tagColor = 'bg-blue-600';

  if (!isOngoing) {
    const parsedDate = new Date(applicationDeadline.replace(/\./g, '-'));
    const now = new Date();
    const diffDays = Math.ceil(
      (parsedDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );

    tagLabel = `D-${Math.max(0, diffDays)}`;
    tagColor = 'bg-[#FF4D4F]';
  }

  return (
    <View className={`px-2 py-1 rounded-full ${tagColor}`}>
      <Text className="text-white text-xs font-semibold">{tagLabel}</Text>
    </View>
  );
};

const renderPolicyCardWithNav =
  (navigation: NavigationTypes.HomeScreenProps['navigation']) =>
  (policy: Policy) =>
    (
      // props로 policy_id 함께 전송
      <Pressable
        key={policy.policy_id}
        className="flex flex-row items-start justify-between w-full bg-white p-3 rounded-xl mb-2 border border-gray-300"
        onPress={() =>
          navigation.navigate('InformScreen', { policy_id: policy.policy_id })
        }
      >
        <View className="flex flex-col space-y-1 w-full">
          <View className="flex-row w-full">
            <View className="mr-1">
              {renderTag(policy.applicationDeadline)}
            </View>
            <Text className="text-base font-bold">{policy.policyName}</Text>
          </View>
          <Text className="text-sm text-gray-600">{policy.supportSummary}</Text>
        </View>
      </Pressable>
    );

export default function HomeScreen(props: NavigationTypes.HomeScreenProps) {
  const { navigation } = props;

  return (
    <View className="flex w-screen h-screen bg-white">
      <ScrollView className="pb-6">
        {/* 상단 바 */}
        <View className="flex w-full h-[100px] justify-end pb-2 px-4 border-b border-b-gray-400">
          <Text className="font-pre text-2xl font-medium">
            홍길동님, 안녕하세요 👋
          </Text>
        </View>

        {/* 질문 추천 영역 */}
        <View className="flex w-full h-[280px] bg-white items-center justify-center py-4 space-y-2">
          <Pressable
            className="w-11/12 h-[65px] bg-[#0073FF] rounded-xl justify-center items-center"
            onPress={() => navigation.navigate('ChatNavigator')}
          >
            <Text className="text-white text-xl font-semibold">
              지금 받을 수 있는 정책 물어보기
            </Text>
          </Pressable>

          {[
            {
              icon: <ChatIcon width={18} height={18} />,
              text: '생활비 지원은 뭐가 있을까?',
            },
            {
              icon: <HomeIcon width={18} height={18} />,
              text: '취업 준비에 도움이 되는 건?',
            },
            {
              icon: <QuestionIcon width={18} height={18} />,
              text: '학자금 대출 조건이 궁금해',
            },
          ].map((item, idx) => (
            <Pressable
              key={idx}
              className="w-11/12 h-[45px] bg-white rounded-full border border-gray-300 px-4 flex-row items-center space-x-2"
            >
              {item.icon}
              <Text className="text-base">{item.text}</Text>
            </Pressable>
          ))}
        </View>

        {/* 인기 정책 */}
        <View className="flex w-full py-4 items-center justify-center">
          <View className="flex w-11/12 mb-2">
            <Text className="font-bold text-xl mb-2">인기 정책</Text>
            {popularPolicies.map(renderPolicyCardWithNav(navigation))}
          </View>
        </View>

        {/* 맞춤 정책 */}
        <View className="flex w-full items-center py-4 bg-white">
          <View className="w-11/12 mb-2">
            <Text className="font-bold text-xl mb-2">맞춤 정책</Text>
            {customPolicies.map(renderPolicyCardWithNav(navigation))}
          </View>
        </View>
        <View className="flex w-full h-[50px]" />
      </ScrollView>
    </View>
  );
}
