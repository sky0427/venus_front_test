import { ApiResponse } from "@/types";
import axiosInstance from "./axios";

// ============================================================
// 인증, 인가
// ============================================================
interface TokenResponse {
  accessToken: string;
}

interface LoginRequest {
  email?: string;
  password?: string; // 소셜 로그인 불필요
  provider?: "LOCAL" | "KAKAO" | "NAVER";
  providerId?: string;
}

interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
}

/**
 * 회원가입 API 호출 (액세스 토큰만 받음)
 */

const signup = async (request: SignupRequest): Promise<ApiResponse<any>> => {
  const response = await axiosInstance.post<ApiResponse<any>>(
    "/api/v1/member/signup",
    request
  );
  return response.data;
};

/**
 * 로그인 API 호출 (액세스 토큰만 받음)
 */

const login = async (request: LoginRequest): Promise<ApiResponse<string>> => {
  const response = await axiosInstance.post<ApiResponse<string>>(
    "/api/v1/member/login",
    request
  );
  return response.data;
};

// 카카오 로그인 API
export const kakaoLogin = async (code: string) => {
  const response = await axiosInstance.post(
    "/oauth/callback/kakao",
    { code },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data;
};

// 네이버 로그인 API
export const naverLogin = async (code: string, state: string) => {
  const response = await axiosInstance.post(
    "/oauth/callback/naver",
    {
      code,
      state,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data;
};

/**
 * 로그아웃 API 호출 (리프레시 토큰 삭제)
 */

const logout = async () => {
  const response = await axiosInstance.post("/api/v1/member/logout");
  return response.data;
};

/**
 * 액세스 토큰 갱신 API 호출 (리프레시 토큰 사용)
 */

const refreshAccessToken = async (): Promise<TokenResponse> => {
  const response = await axiosInstance.get<ApiResponse<TokenResponse>>(
    `/api/v1/member/refresh`
  );
  return response.data.data;
};

export { login, logout, refreshAccessToken, signup };
export type { LoginRequest, SignupRequest, TokenResponse };
