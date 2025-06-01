// api/chat.ts
import api from './api';

export const sendQuestion = async ({
  user_id,
  question,
}: {
  user_id: string;
  question: string;
}) => {
  return api.post('/llm/answers', { user_id, question });
};