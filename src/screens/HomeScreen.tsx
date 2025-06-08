import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { NavigationTypes } from '../navigations/NavigationTypes';
import ChatIcon from '../assets/images/chatIcon.svg';
import HomeIcon from '../assets/images/homeIcon.svg';
import QuestionIcon from '../assets/images/questionIcon.svg';

type Policy = {
  policy_name: string;
  application_period: string;
  policy_description: string;
};

const popularPolicies: Policy[] = [
  {
    policy_name: '청년희망적금',
    application_period: 'D-3',
    policy_description:
      '목돈 마련을 위한 정부 지원 적금입니다. 최대 3년까지 지원됩니다.',
  },
  {
    policy_name: '내일배움카드',
    application_period: '상시',
    policy_description:
      '직업 훈련 비용을 지원하여 취업 준비를 돕는 제도입니다.',
  },
  {
    policy_name: '주거 안정 지원금',
    application_period: 'D-7',
    policy_description:
      '월세 부담을 줄여주는 주거 지원금으로 안정적인 생활을 돕습니다.',
  },
];

const personalizedPolicies: Policy[] = [...popularPolicies]; // 예시로 동일하게 사용

function renderTag(period: string) {
  const isUrgent = period.startsWith('D-');
  const bgColor = isUrgent ? 'bg-[#FF4D4F]' : 'bg-[#0073FF]';
  return (
    <View className={`px-3 py-1 rounded-full ${bgColor}`}>
      <Text className="text-white text-xs font-bold">{period}</Text>
    </View>
  );
}

function renderPolicyCard(policy: Policy) {
  return (
    <View
      key={policy.policy_name}
      className="flex flex-row items-start justify-between w-full bg-white p-3 rounded-xl mb-2 border border-gray-300"
    >
      <View className="flex flex-col space-y-1 w-full">
        <View className="flex-row w-full">
          <View className="mr-1">{renderTag(policy.application_period)}</View>
          <Text className="text-base font-bold">{policy.policy_name}</Text>
        </View>

        <Text className="text-sm text-gray-600">
          {policy.policy_description}
        </Text>
      </View>
    </View>
  );
}

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

          {/* 질문 리스트 */}
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
            {popularPolicies.map(renderPolicyCard)}
          </View>
        </View>

        {/* 맞춤 정책 */}
        <View className="flex w-full items-center py-4 bg-white">
          <View className="w-11/12 mb-2">
            <Text className="font-bold text-xl mb-2">맞춤 정책</Text>
            {personalizedPolicies.map(renderPolicyCard)}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
