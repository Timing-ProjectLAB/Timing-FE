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
        <Text className="text-base">{message.answer}</Text>
      </View>
    </Pressable>
  );
}
