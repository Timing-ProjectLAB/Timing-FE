// api/policy.ts
import api from './api';

// 정책 상세 조회 API
export const getPolicyDetail = (policyId: string) => {
  return api.get(`/policy/detail/${policyId}`);
};

// ✅ 메인페이지 정책 목록 조회 API
export const getMainPolicies = () => {
  return api.get('/policy/board/main');
};