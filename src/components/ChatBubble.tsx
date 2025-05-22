import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationTypes } from '../navigations/NavigationTypes';

export type Message = {
  id: string;
  type: 'bot' | 'user';
  // 일반 텍스트 only
  text?: string;
  // 구조화된 bot 응답
  title?: string;
  target?: string;
  amount?: string;
  date?: string;
  link?: string;
  // InformScreen 으로 보낼 전체 payload
  policy?: any;
};

interface ChatBubbleProps {
  message: Message;
  navigation: NavigationTypes.ChatScreenProps['navigation'];
}

export default function ChatBubble({ message, navigation }: ChatBubbleProps) {
  const isBot = message.type === 'bot';
  const isStructured = !!message.title;

  return (
    <View className={`mb-2 px-4 ${isBot ? 'items-start' : 'items-end'}`}>
      <View
        className={`max-w-[80%] rounded-xl px-4 py-3 shadow-sm ${
          isBot ? 'bg-white' : 'bg-[#D0EFFF]'
        }`}
      >
        {isStructured ? (
          <>
            {/* 제목 */}
            <Text className="font-bold text-base mb-1">{message.title}</Text>

            {/* 상세 항목 */}
            {message.target != null && (
              <Text className="text-sm">지원 대상: {message.target}</Text>
            )}
            {message.amount != null && (
              <Text className="text-sm">금액: {message.amount}</Text>
            )}
            {message.date != null && (
              <Text className="text-sm">신청 기간: {message.date}</Text>
            )}

            {/* 더보기 버튼 */}
            <TouchableOpacity
              className="mt-2"
              onPress={() =>
                navigation.navigate('InformScreen', {
                  policy: message.policy ?? message,
                })
              }
            >
              <Text className="text-sm text-blue-500">더보기 &gt;</Text>
            </TouchableOpacity>
          </>
        ) : (
          // 일반 텍스트 메시지
          <Text className="text-base">{message.text}</Text>
        )}
      </View>
    </View>
  );
}
