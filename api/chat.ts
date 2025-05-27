import api from './api';

export const sendQuestion = async ({
  user_id,
  question,
}: {
  user_id: string;
  question: string;
}) => {
  console.log('📡 API 호출 - 질문 전송', { user_id, question });

  return api.post(
    '/llm/answers',
    { user_id, question }, // ✅ 여기 request body에 user_id 추가
    {
      withCredentials: true, // 세션 유지 필요 시 true
    }
  );
};