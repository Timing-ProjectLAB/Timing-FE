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
import { sendQuestion } from '../../api/chat';
import { useUser } from '../contexts/UserContext';

export default function ChatScreen(props: NavigationTypes.ChatScreenProps) {
  const { navigation } = props;

  const initialMessages: Message[] = [
    {
      id: '1',
      type: 'bot',
      answer: '궁금한 내용이 있으면 물어보세요!\n어떤 질문이든지 대답할 준비가 됐어요 :)',
    },
    {
      id: '2',
      type: 'bot',
      answer: '청년정책에 관한 챗봇입니다.\n어떤 내용을 도와드릴까요 ?',
    },
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const { userInfo } = useUser();

const handleSend = async () => {
  if (!input.trim()) return;

  const userMsg: Message = {
    id: Date.now().toString(),
    type: 'user',
    answer: input.trim(),
  };

  setMessages(prev => [...prev, userMsg]);
  setInput('');

  try {
    const res = await sendQuestion({
      user_id: userInfo.userId,
      question: input.trim(),
    });

    console.log('📦 전체 응답 데이터 (string):', res.data);

// ...
const outerParsed = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
const innerParsed = typeof outerParsed.answer === 'string' ? JSON.parse(outerParsed.answer) : outerParsed.answer;

const rawAnswer = innerParsed.answer || '';

// ✅ 실제 줄바꿈 문자 기준으로 나눔
const splitLines = rawAnswer
  .split('\n') // 핵심: 문자열 안의 줄바꿈
  .map(line => line.trim())
  .filter(Boolean);

console.log('✅ 실제 분리된 라인:', splitLines);

const parsedMsgs: Message[] = splitLines.map((line, idx) => {
  const [titleRaw, descRaw] = line.split('**:').map(s => s.trim());

  const title = titleRaw?.replace(/^-?\s*\*\*/, '').replace(/\*\*$/, '') ?? '';
  const desc = descRaw?.replace(/\*\*/g, '') ?? '';
  const text = `${title}\n${desc}\n더보기 >`;

  return {
    id: `${Date.now()}-${idx}`,
    type: 'bot',
    answer: text,
    policy_id: outerParsed.policy_id?.[idx] ?? null,
  };
});

setMessages(prev => [...prev, ...parsedMsgs]);
// ...


  } catch (error: any) {
    console.error('❌ [서버 응답 에러]:', error.response?.data || error.message);
    const errorMsg: Message = {
      id: Date.now().toString(),
      type: 'bot',
      answer: '서버 오류로 답변을 불러오지 못했어요.',
    };
    setMessages(prev => [...prev, errorMsg]);
  }
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
        <TouchableOpacity
          className="absolute bottom-20 right-4 bg-white border border-gray-300 px-4 py-2 rounded-xl shadow"
          onPress={() => navigation.navigate('InformScreen')}
        >
          <Text className="text-black font-semibold">샘플 정책 보기</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}