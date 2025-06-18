// src/components/ChatBubble.tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { NavigationTypes } from '../navigations/NavigationTypes';

export type Message = {
  id: string;
  type: 'bot' | 'user';
  policy_id?: string;
  answer: string;
};

interface ChatBubbleProps {
  message: Message;
  navigation: NavigationTypes.ChatScreenProps['navigation'];
}

const renderFormattedText = (text: string) => {
  // **강조** 텍스트와 일반 텍스트 분리
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return (
        <Text
          key={index}
          style={{
            fontWeight: 'bold',
            fontSize: 18, // 기본보다 4pt 상승
            color: '#000',
          }}
        >
          {boldText}
        </Text>
      );
    } else {
      return (
        <Text key={index} style={{ fontSize: 14, color: '#000' }}>
          {part}
        </Text>
      );
    }
  });
};

export default function ChatBubble({ message, navigation }: ChatBubbleProps) {
  const isBot = message.type === 'bot';

  return (
    <Pressable
      className={`mb-2 px-4 ${isBot ? 'items-start' : 'items-end'}`}
   onPress={() => {
       console.log('▶︎ 선택된 policy_id:', message.policy_id);
       console.log(message);
      if (message.policy_id) {
        navigation.navigate('InformScreen', {
         // camelCase 로 통일
          policyId: message.policy_id
        });
      }
    }}
    >
      <View
        className={`max-w-[80%] rounded-xl px-4 py-3 shadow-sm ${
          isBot ? 'bg-white' : 'bg-[#D0EFFF]'
        }`}
      >
        {renderFormattedText(message.answer)}
      </View>
    </Pressable>
  );
}
