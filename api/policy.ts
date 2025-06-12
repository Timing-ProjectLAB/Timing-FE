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