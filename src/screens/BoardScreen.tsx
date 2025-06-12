import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import Person from '../assets/images/person.svg';
import Box from '../assets/images/box.svg';
import { NavigationTypes } from '../navigations/NavigationTypes';

type Policy = {
  policy_id: string;
  policyName: string;
  supportSummary: string;
  applicationDeadline: string;
  keywords: string[];
};

type Info = {
  userId: string;
  totalCount: number;
  policies: Policy[];
};

export default function BoardScreen(props: NavigationTypes.BoardScreenProps) {
  const [filter, setFilter] = useState<string>('전체');
  const [policies, setPolicies] = useState<Policy[]>([]);

  const categories = ['전체', '복지문화', '취업지원', '주거금융', '기타'];

  // 초기에는 전체 카테고리 로드
  useEffect(() => {
    handleCategory('전체');
  }, []);

  const handleCategory = async (category: string) => {
    setFilter(category);

    if (category === '전체') {
      const sampleData: Policy[] = [
        {
          policy_id: '20250521005400110863',
          policyName: '2025년 화성시 청년정책 아이디어 공모전',
          supportSummary: '❍ 접수기간: 2025. 6. 2.(월) ~ 6. 20.(금)',
          applicationDeadline: '2025.06.20',
          keywords: ['교육지원'],
        },
        {
          policy_id: '20250521005400110863',
          policyName: '부산디지털혁신아카데미 BDIA',
          supportSummary:
            '□ 사업대상 : 대학졸업(예정)자, 취업준비생, 미취업자 등 지역청년',
          applicationDeadline: '정보없음',
          keywords: ['교육지원'],
        },
        {
          policy_id: '20250521005400110863',
          policyName: '서울 영테크',
          supportSummary:
            '무료 재무상담(대면, 비대면) 및 금융교육, 커뮤니티 운영',
          applicationDeadline: '2025.11.30',
          keywords: ['맞춤형상담서비스'],
        },
      ];

      setPolicies(sampleData);
    } else {
      try {
        const mockData: Policy[] = [
          {
            policy_id: '',
            policyName: `[${category}] 지원 정책 예시`,
            supportSummary: `${category} 분야의 혜택을 제공합니다.`,
            applicationDeadline: '정보없음',
            keywords: [category],
          },
        ];
        setPolicies(mockData);
      } catch (error) {
        console.error('API 요청 실패:', error);
        setPolicies([]);
      }
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
            onPress={() => handleCategory(category)}
            className={`px-4 py-2 mr-2 rounded-full ${
              isSelected ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <Text
              className={`text-sm ${isSelected ? 'text-white' : 'text-black'}`}
            >
              {category}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );

  const renderPolicyCard = (
    policy: Policy,
    index: number,
    navigation: NavigationTypes.BoardScreenProps['navigation'],
  ) => {
    const isOngoing = policy.applicationDeadline === '정보없음';

    let tagLabel = '상시';
    let tagColor = 'bg-blue-600';

    if (!isOngoing) {
      const parsedDate = new Date(
        policy.applicationDeadline.replace(/\./g, '-'),
      );
      const now = new Date();
      const diffDays = Math.ceil(
        (parsedDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
      );

      tagLabel = `D-${Math.max(0, diffDays)}`;
      tagColor = 'bg-[#FF4D4F]';
    }

    return (
      <Pressable
        key={index}
        className="bg-white border border-gray-300 rounded-xl px-4 py-3 mb-3 mx-4"
        onPress={() =>
          navigation.navigate('InformScreen', { policy_id: policy.policy_id })
        }
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
          {policy.keywords.map((kw, i) => (
            <View
              key={i}
              className="bg-gray-100 border border-gray-300 px-2 py-1 mr-2 mb-1 rounded-full"
            >
              <Text className="text-xs text-gray-600">{kw}</Text>
            </View>
          ))}
        </View>
      </Pressable>
    );
  };

  return (
    <View className="flex w-screen h-screen bg-white">
      <ScrollView className="pb-6">
        {/* 상단 바 */}
        <View className="flex w-full h-[100px] justify-end pb-2 px-4 border-b border-b-gray-400">
          <Text className="font-pre text-2xl font-medium">맞춤 정책</Text>
        </View>

        {/* 사용자 정보 카드 */}
        <View className="flex w-full h-[150px] items-center justify-center mt-2">
          <View className="flex-row w-11/12 h-[120px] bg-[#007AFF] rounded-xl px-4">
            <View className="flex w-1/5 h-full items-end justify-center pr-2">
              <Person />
            </View>
            <View className="flex-wrap w-2/5 h-full items-center justify-center">
              <Text className="text-white text-lg font-bold">
                홍길동님을 위한 맞춤 정책이에요
              </Text>
            </View>
            <View className="flex w-2/5 h-full justify-center items-center space-y-3">
              <Pressable className="w-4/5 h-[40px] bg-white rounded-lg items-center justify-center">
                <Text className="text-blue-600 text-sm font-pre">
                  맞춤정보 수정 {'>'}
                </Text>
              </Pressable>
              <View className="flex-row bg-white rounded-full px-3 py-1 items-center justify-center">
                <Box />
                {/* API 연동 이후 totalCount로 변경 */}
                <Text className="ml-1 text-black font-pre">180건</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 카테고리 필터 */}
        <View className="mt-4">{renderCategoryButtons()}</View>

        {/* 카드 목록 */}
        <View className="mt-4">
          {policies.length > 0 ? (
            policies.map((policy, index) =>
              renderPolicyCard(policy, index, props.navigation),
            )
          ) : (
            <Text className="text-center text-gray-500 mt-4">
              정책 정보가 없습니다.
            </Text>
          )}
        </View>
        <View className="flex w-full h-[40px]" />
      </ScrollView>
    </View>
  );
}
