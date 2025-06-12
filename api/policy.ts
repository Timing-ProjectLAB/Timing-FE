// src/api/policy.ts
import api from './api'

export interface PolicyBoardResponse {
  userId: string
  totalCount: number
  policies: {
    policyName: string
    supportSummary: string
    applicationDeadline: string
    keywords: string[]
  }[]
}

/**
 * 전체 게시판 조회
 */
export const getPolicyBoard = (userId: string) => {
  return api.get<PolicyBoardResponse>(
    `/policy/board/${userId}`,
    {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    }
  )
}

// 1) main 정책 조회 응답 타입 정의
export interface MainPoliciesResponse {
  popularPolicies: Array<{
    policyId: string;
    policyName: string;
    supportSummary: string;
    applicationDeadline: string;
    inquiryCount: number;
  }>;
  customPolicies: Array<{
    policyId: string;
    policyName: string;
    supportSummary: string;
    applicationDeadline: string;
    inquiryCount: number;
  }>;
}

// 2) getMainPolicies 함수 추가
export const getMainPolicies = () => {
  return api.get<MainPoliciesResponse>(
    `/policy/board/main`,
    {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};

export const getPolicyDetail = (policyId: string) => {
  return api.get<PolicyDetailResponse>(
    `/policy/detail/${policyId}`,
    {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};

/**
 * 카테고리 필터링 게시판 조회
 */
export const getPolicyBoardFiltered = (
  userId: string,
  category: string
) => {
  return api.get<PolicyBoardResponse>(
    `/policy/board/filter/${userId}`,
    {
      params: { category },
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    }
  )
}