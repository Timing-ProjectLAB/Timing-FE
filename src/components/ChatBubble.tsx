import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { NavigationTypes } from '../navigations/NavigationTypes';

export type Message = {
  id: string;
  policy_id?: string;
  type: 'bot' | 'user';
  text: string;
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
      onPress={() =>
        navigation.navigate('InformScreen', { policy_id: message.id })
      }
    >
      <View
        className={`max-w-[80%] rounded-xl px-4 py-3 shadow-sm ${
          isBot ? 'bg-white' : 'bg-[#D0EFFF]'
        }`}
      >
        <Text className="text-base">{message.text}</Text>
      </View>
    </Pressable>
  );
}
