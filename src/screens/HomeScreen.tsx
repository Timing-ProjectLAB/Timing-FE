import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { NavigationTypes } from '../navigations/NavigationTypes';
import ChatIcon from '../assets/images/chatIcon.svg';
import HomeIcon from '../assets/images/homeIcon.svg';
import QuestionIcon from '../assets/images/questionIcon.svg';
import api from '../../api/api';  // Axios 인스턴스
import { useUser } from '../contexts/UserContext';

type Policy = {
  policyName: string;
  supportSummary: string;
  applicationDeadline: string;
  inquiryCount: number;
};

export default function HomeScreen(props: NavigationTypes.HomeScreenProps) {
  const { navigation } = props;
  const { userInfo } = useUser();

  const [popularPolicies, setPopularPolicies] = useState<Policy[]>([]);
  const [customPolicies, setCustomPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/policy/board/main')
      .then(res => {
        setPopularPolicies(res.data.popularPolicies);
        setCustomPolicies(res.data.customPolicies);
      })
      .catch(err => {
        console.error('❌ 메인 정책 조회 실패:', err);
        console.log('🔗 요청 URL:', err.config.baseURL + err.config.url);
        console.log('⚠️ 상태코드:', err.response?.status);
        console.log('⚠️ 응답 데이터:', err.response?.data);
      })
      .finally(() => setLoading(false));
  }, []);

  function renderTag(deadline: string) {
    const isUrgent = deadline.startsWith('D-');
    const bgColor = isUrgent ? 'bg-[#FF4D4F]' : 'bg-[#0073FF]';
    return (
      <View className={`px-3 py-1 rounded-full ${bgColor}`}>
        <Text className="text-white text-xs font-bold">{deadline}</Text>
      </View>
    );
  }

  function renderPolicyCard(policy: Policy) {
    return (
      <View
        key={policy.policyName}
        className="flex flex-row items-start justify-between w-full bg-white p-3 rounded-xl mb-2 border border-gray-300"
      >
        <View className="flex flex-col space-y-1 w-full">
          <View className="flex-row w-full">
            <View className="mr-1">{renderTag(policy.applicationDeadline)}</View>
            <Text className="text-base font-bold">{policy.policyName}</Text>
          </View>

          <Text className="text-sm text-gray-600">{policy.supportSummary}</Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex w-screen h-screen bg-white">
      <ScrollView className="pb-6">
        {/* 상단 바 */}
        <View className="flex w-full h-[100px] justify-end pb-2 px-4 border-b border-b-gray-400">
          <Text className="font-pre text-2xl font-medium">
            {userInfo.userId}님, 안녕하세요 👋
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

        {loading ? (
          <ActivityIndicator size="large" color="#0073FF" className="mt-6" />
        ) : (
          <>
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
                {customPolicies.map(renderPolicyCard)}
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}
