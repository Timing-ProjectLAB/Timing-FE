// screens/ChatScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Menu from '../assets/images/Menu.svg';
import Profile from '../assets/images/Profile.svg';
import ChatBubble, { Message } from '../components/ChatBubble';
import { NavigationTypes } from '../navigations/NavigationTypes';
import { sendQuestion } from '../../api/chat'; // ✅ API 요청 함수
import { useUser } from '../contexts/UserContext'; // ✅ 로그인된 user_id 가져오기


export default function ChatScreen(props: NavigationTypes.ChatScreenProps) {
  const { navigation } = props;

  // 초기 2개의 메시지
  const initialMessages: Message[] = [
    {
      id: '1',
      type: 'bot',
      text: '궁금한 내용이 있으면 물어보세요!\n어떤 질문이든지 대답할 준비가 됐어요 :)',
    },
    {
      id: '2',
      type: 'bot',
      text: '청년정책에 관한 챗봇입니다.\n어떤 내용을 도와드릴까요 ?',
    },
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const categories = ['주거', '복지', '창업', '취업', '교육'];

const { userId } = useUser(); // 로그인된 user_id

const handleSend = async () => {
  if (!input.trim()) return;

  const userMsg: Message = {
    id: Date.now().toString(),
    type: 'user',
    text: input.trim(),
  };

  setMessages(prev => [...prev, userMsg]); // 사용자 메시지 먼저 보여주기
  setInput(''); // 입력 초기화

  try {
    console.log('📩 사용자 질문:', input.trim());
    const res = await sendQuestion({
      user_id: userId, // ✅ Context에서 불러온 유저 ID
      question: input.trim(),
    });
    console.log('✅ 응답:', res.data);

    const botMsg: Message = {
      id: Date.now().toString(),
      type: 'bot',
      text: res.data.answer || '죄송해요, 답변을 불러오지 못했어요.',
    };

    setMessages(prev => [...prev, botMsg]); // 응답 메시지 추가
  } catch (error: any) {
    console.error('❌ 질문 전송 오류:', error);
    const errorMsg: Message = {
      id: Date.now().toString(),
      type: 'bot',
      text: '서버 오류로 답변을 불러오지 못했어요.',
    };
    setMessages(prev => [...prev, errorMsg]);
  }
};
  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat],
    );
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#8DD5FF]"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* 헤더 */}
      <View className="flex-row w-full h-20 border-b border-[#CAC4D0] items-end px-4 py-2 bg-[#8DD5FF]">
        <TouchableOpacity className="w-1/6 items-start justify-end">
          <Menu width={24} height={24} />
        </TouchableOpacity>
        <View className="w-4/6 items-center justify-end">
          <Text className="text-white font-bold text-xl">Timing</Text>
        </View>
        <View className="w-1/6 items-end justify-end">
          <Profile width={35} height={35} />
        </View>
      </View>

      {/* 메시지 리스트 */}
      <FlatList
        className="flex-1 px-4 pt-4"
        data={messages.slice(2)}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => (
          <>
            <ChatBubble message={initialMessages[0]} navigation={navigation} />
            <ChatBubble message={initialMessages[1]} navigation={navigation} />

            {/* 카테고리: flex-1 으로 균등 분할 */}
            <View className="flex-row w-full px-4 mb-4">
              {categories.map(cat => {
                const sel = selectedCategories.includes(cat);
                return (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => toggleCategory(cat)}
                    className={`flex-1 mx-1 py-2 rounded-full border ${
                      sel
                        ? 'bg-[#007AFF] border-transparent'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    <Text
                      className={`text-center font-medium ${
                        sel ? 'text-white' : 'text-black'
                      }`}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}
        renderItem={({ item }) => (
          <ChatBubble message={item} navigation={navigation} />
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      {/* 입력창 */}
      <View className="flex-row items-center px-4 py-2 bg-white border-t border-gray-300">
        <TextInput
          className="flex-1 h-10 px-4 bg-gray-100 rounded-full text-black"
          placeholder="궁금한 정책을 물어보세요!"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />
      </View>
    </KeyboardAvoidingView>
  );
}
