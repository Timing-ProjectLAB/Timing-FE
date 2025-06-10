// api/policy.ts
import api from './api';

export const getPolicyDetail = (policyId: string) => {
  return api.get(`/policy/detail/${policyId}`);
};