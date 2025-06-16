// src/screens/ChatScreen.tsx
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
import { sendQuestion, PolicyItem, LlmResponse } from '../../api/chat';
import { useUser } from '../contexts/UserContext';

export default function ChatScreen(props: NavigationTypes.ChatScreenProps) {
  const { navigation } = props;
  const { userInfo } = useUser();

  const initialMessages: Message[] = [
    { id: '1', type: 'bot', answer: '궁금한 내용이 있으면 물어보세요! 어떤 질문이든 대답 준비 완료 :)' },
    { id: '2', type: 'bot', answer: '청년정책 관련 챗봇입니다. 무엇을 도와드릴까요?' },
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    // 1) 유저 메시지 추가
    const userMsg: question = {
      id: Date.now().toString(),
      type: 'user',
      answer: input.trim(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    try {
      // 2) API 호출
      const res = await sendQuestion({
        user_id: userInfo.userId,  // snake_case 로 바꿔서 서버가 기대하는 필드명과 맞춥니다
        question: input.trim(),
      });
      const data = res.data;

      // 3) 챗봇 요약 메시지
      const botSummary: Message = {
        id: `bot-${Date.now()}`,
        type: 'bot',
        answer: data.message,
      };
      setMessages(prev => [...prev, botSummary]);

      // 4) 추천 정책이 있을 때
      if (data.policies && data.policies.length > 0) {
        const policyMsgs: Message[] = data.policies.map((p: PolicyItem, idx) => ({
          id: `policy-${Date.now()}-${idx}`,
          type: 'bot',
          // title과 summary를 줄바꿈으로 표시
          answer: `🔹 ${p.title}\n${p.summary}`,
          policy_id: p.policy_id,
        }));
        setMessages(prev => [...prev, ...policyMsgs]);
      }
      // 5) 부족한 정보가 있을 때
      else if (data.missing_info && data.missing_info.length > 0) {
        const askMore: Message = {
          id: `miss-${Date.now()}`,
          type: 'bot',
          answer: `추가 정보가 필요해요: ${data.missing_info.join(', ')} 알려주세요.`,
        };
        setMessages(prev => [...prev, askMore]);
      }
      // 6) fallback 정책이 있을 때
      else if (data.fallback_policies && data.fallback_policies.length > 0) {
        const fallbackMsgs: Message[] = data.fallback_policies.map((p, idx) => ({
          id: `fallback-${Date.now()}-${idx}`,
          type: 'bot',
          answer: `⚠️ 대체 추천: ${p.title}\n${p.summary}\n신청: ${p.apply_url || 'URL 없음'}`,
          policy_id: p.policy_id,
        }));
        setMessages(prev => [...prev, ...fallbackMsgs]);
      }

    } catch (err: any) {
      console.error('❌ [서버 응답 에러]:', err.response?.data || err.message);
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        type: 'bot',
        answer: '서버 오류로 답변을 받아올 수 없었어요. 다시 시도해주세요.',
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
      </View>
    </KeyboardAvoidingView>
  );
}