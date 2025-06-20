import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Person from '../assets/images/person.svg';
import Box from '../assets/images/box.svg';
import { NavigationTypes } from '../navigations/NavigationTypes';
import { useUser } from '../contexts/UserContext';
import {
  PolicyBoardResponse,
  getPolicyBoard,
  getPolicyBoardFiltered,
} from '../../api/policy';

type Policy = PolicyBoardResponse['policies'][0] & { policyId: string };

export default function BoardScreen(props: NavigationTypes.BoardScreenProps) {
  const { navigation } = props;
  const { userInfo } = useUser();
  const insets = useSafeAreaInsets();

  const [filter, setFilter] = useState<string>('전체');
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const categories = ['전체', '복지문화', '일자리', '주거', '교육', '기타'];

  useEffect(() => {
    fetchPolicies('전체');
  }, []);

  const fetchPolicies = async (category: string) => {
    setFilter(category);
    setLoading(true);
    try {
      let res;
      if (category === '전체') {
        res = await getPolicyBoard(userInfo.userId);
      } else {
        // Map UI '기타' to backend keyword '참여권리'
        const apiCategory = category === '기타' ? '참여권리' : category;
        res = await getPolicyBoardFiltered(userInfo.userId, apiCategory);
      }
      const all = res.data.policies;
      // Ensure each policy object has a policyId field
      const withId: Policy[] = all.map(p => ({
        ...p,
        policyId: (p as any).policyId || (p as any).policy_id,
      }));
      // Exclude expired policies
      const datePattern = /^\d{4}\.\d{2}\.\d{2}$/;
      const today = new Date(); today.setHours(0,0,0,0);
      const nonExpired = withId.filter(p => {
        if (datePattern.test(p.applicationDeadline)) {
          const d = new Date(p.applicationDeadline.replace(/\./g, '-'));
          return d.getTime() >= today.getTime();
        }
        return true;
      });
      setPolicies(nonExpired);
      // Update count only for 전체
      if (category === '전체') {
        setTotalCount(nonExpired.length);
      }
    } catch (error) {
      console.error('API 요청 실패:', error);
      setPolicies([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  const renderCategoryButtons = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      className="mt-2"
    >
      {categories.map((category, idx) => {
        const isSelected = filter === category;
        return (
          <Pressable
            key={idx}
            onPress={() => fetchPolicies(category)}
            className={`px-4 py-2 mr-2 rounded-full ${
              isSelected ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <Text className={`text-sm ${
              isSelected ? 'text-white' : 'text-black'
            }`}>
              {category}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );

  const renderPolicyCard = (policy: Policy, index: number) => {
const isOngoing = !/^\d{4}\.\d{2}\.\d{2}$/.test(policy.applicationDeadline);
    let tagLabel = '상시';
    let tagColor = 'bg-blue-600';

    if (!isOngoing) {
      const parsedDate = new Date(
        policy.applicationDeadline.replace(/\./g, '-')
      );
      const now = new Date();
      const diffDays = Math.ceil(
        (parsedDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );
      tagLabel = `D-${Math.max(0, diffDays)} 마감`;
      tagColor = 'bg-[#FF4D4F]';
    }

    return (
      <View
        key={index}
        className="bg-white border border-gray-300 rounded-xl px-4 py-3 mb-3 mx-4"
      >
        <View className="flex-row justify-between mb-2">
          <Text className="font-bold text-base">{policy.policyName}</Text>
          <View className={`px-2 py-1 rounded-full ${tagColor}`}>
            <Text className="text-xs text-white font-bold">{tagLabel}</Text>
          </View>
        </View>
        <Text className="text-sm text-gray-700 mb-1">
          {policy.supportSummary}
        </Text>
        <Text className="text-xs text-gray-500 mb-2">
          {isOngoing ? '상시 모집' : `${policy.applicationDeadline} 마감`}
        </Text>
        <View className="flex-row flex-wrap">
          {(policy.keywords ?? []).map((kw, i) => (
            <View
              key={`keyword-${i}`}
              className="bg-gray-100 border border-gray-300 px-2 py-1 mr-2 mb-1 rounded-full"
            >
              <Text className="text-xs text-gray-600">{kw}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: 'white', paddingBottom: insets.bottom }}
      edges={['bottom']}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
        {/* 상단 바 */}
        <View className="flex w-full h-[100px] justify-end pb-2 px-4 border-b border-b-gray-400">
          <Text className="font-pre text-2xl font-medium">
            맞춤 정책
          </Text>
        </View>

        {/* 사용자 정보 카드 */}
        <View className="flex w-full h-[150px] items-center justify-center mt-2">
          <View className="flex-row w-11/12 h-[120px] bg-[#007AFF] rounded-xl px-4">
            <View className="flex w-1/5 h-full items-end justify-center pr-2">
              <Person />
            </View>
            <View className="flex-wrap w-2/5 h-full items-center justify-center">
              <Text className="text-white text-lg font-bold">
                {userInfo.userId}님을 위한 정책 게시판입니다.
              </Text>
            </View>
            <View className="flex w-2/5 h-full justify-center items-center space-y-3">
              <Pressable className="w-4/5 h-[40px] bg-white rounded-lg items-center justify-center">
                <Text className="text-blue-600 text-sm font-pre">
                  필터 설정 {'>'}
                </Text>
              </Pressable>
              <View className="flex-row bg-white rounded-full px-3 py-1 items-center justify-center">
                <Box />
                <Text className="ml-1 text-black font-pre">{totalCount}건</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 카테고리 필터 */}
        <View className="mt-4">{renderCategoryButtons()}</View>

        {/* 정책 리스트 or 로딩 */}
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" className="mt-6" />
        ) : (
          <View className="mt-4">
            {policies.length > 0 ? (
              policies.map((policy, index) => (
                <Pressable
                  key={policy.policyId}
                  onPress={() =>
                    navigation.navigate('InformScreen', { policy_id: policy.policyId })
                  }
                >
                  {renderPolicyCard(policy, index)}
                </Pressable>
              ))
            ) : (
              <Text className="text-center text-gray-500 mt-4">
                정책 정보가 없습니다.
              </Text>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
