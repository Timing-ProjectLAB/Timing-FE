import llmApi from './llmApi';

export interface PolicyItem {
  policy_id: string;
  title: string;
  summary: string;
  apply_url: string;
  reason: string;
}
export interface LlmResponse {
  message: string;
  policies: PolicyItem[] | null;
  missing_info: string[] | null;
  fallback_policies: PolicyItem[] | null;
}

export interface SendQuestionPayload {
  user_id: string;
  message: string;
}

export const sendQuestion = (payload: SendQuestionPayload) => {
  // ⚠️ api가 아니라 llmApi 를 써야 body가 제대로 전송됩니다
  return llmApi.post<LlmResponse>('/llm/answers', payload);
};