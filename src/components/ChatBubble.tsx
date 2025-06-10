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
  const parts = text.split(/(\*\*[^*]+\*\*)/g); // **굵은 텍스트** 구간 나누기

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.replace(/\*\*/g, '');
      return (
        <Text
          key={index}
          style={{
            fontWeight: 'bold',
            fontSize: 18, // 기본보다 3~4pt 증가
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
        if (message.policy_id) {
          navigation.navigate('InformScreen', { policy_id: message.policy_id });
        }
      }}
    >
      <View
        className={`max-w-[80%] rounded-xl px-4 py-3 shadow-sm ${
          isBot ? 'bg-white' : 'bg-[#D0EFFF]'
        }`}
      >
        <Text>{renderFormattedText(message.answer)}</Text>
      </View>
    </Pressable>
  );
}