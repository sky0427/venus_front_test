import { ApiResponse } from "@/types";
import axiosInstance from "./axios";

// ============================================================
// 인증, 인가
// ============================================================

interface TokenResponse {
  accessToken: string;
};

interface LoginRequest {
  email: string;
  password: string;
};

interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
};

// 회원가입
const signup = async (request: SignupRequest): Promise<ApiResponse<any>> => {
  const response = await axiosInstance.post<ApiResponse<any>>(
    "/api/v1/member/signup",
    request,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

/**
 * 로그인 API 호출 (액세스 토큰만 받음)
 */

const login = async (request: LoginRequest): Promise<TokenResponse> => {
  const response = await axiosInstance.post<ApiResponse<TokenResponse>>("/api/v1/member/login", request, {
    withCredentials: true,
  });
  return response.data.data; // accessToken만 반환
};

/**
 * 로그아웃 API 호출 (리프레시 토큰 삭제)
 */

const logout = async (): Promise<void> => {
  const response = await axiosInstance.post<ApiResponse<void>>("/api/v1/member/logout", null, { withCredentials: true, });

  if (response.data.returnCode !== "로그아웃 성공") {
    throw new Error(response.data.returnMessage || "로그아웃 실패");
  }
};

/**
 * 액세스 토큰 갱신 API 호출 (리프레시 토큰 사용)
 */

const refreshAccessToken = async (): Promise<TokenResponse> => {
  const response = await axiosInstance.get<ApiResponse<TokenResponse>>(`/api/v1/member/refresh`, {
    withCredentials: true,
  });
  return response.data.data;
};




export { login, logout, refreshAccessToken, signup };
export type { LoginRequest, SignupRequest, TokenResponse };
