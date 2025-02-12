
import { login, logout, refreshAccessToken, signup, TokenResponse } from "@/api";
import axiosInstance from "@/api/axios";
import { queryKeys } from "@/constants";
import { numbers } from "@/constants/numbers";
import useAuthStore from "@/store/useAuthStore";
import { UseMutationCustomOptions } from "@/types";
import { MutationFunction, useMutation, useQuery } from "@tanstack/react-query";

/**
 * 로그인 Mutation 훅
 */

function useLogin<T> (
  loginAPI: MutationFunction<TokenResponse, T>,
  mutationOptions?: UseMutationCustomOptions,
) {
  const store = useAuthStore();
  const {
    mutate: loginMutate,
    isLoading: isLoginLoading,
    isError,
    error,
  } = useMutation(loginAPI, {
    onSuccess: (data: TokenResponse) => {
      store.login(data.accessToken);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.accessToken}`;
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
    },
    ...mutationOptions,
  });
  return { loginMutate, isLoginLoading, isError, error };
}

function useLocalLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(login, mutationOptions);
}

/**
 * 회원가입 Mutation 훅
 */

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  const {
    mutate: signupMutate,
    isLoading: isSignupLoading,
    isError: isSignupError,
    error: signupError,
  } = useMutation(signup, {
    onSuccess: (data) => {
      console.log("회원가입 성공:", data.returnMessage);
      // 성공 후 처리 (예: 로그인 페이지로 리다이렉트, 성공 메시지 표시)
    },
    onError: (error) => {
      console.error("회원가입 실패:", error);
      // 에러 처리 (예: 에러 메시지 표시)
    },
    ...mutationOptions
  });

  return { signupMutate, isSignupLoading, isSignupError, signupError };
}

/**
 * 액세스 토큰 갱신 Query 훅
 */

function useRefreshAccessToken() {
  const store = useAuthStore();
  const {
    data,
    error,
    isSuccess,
    isError,
    isLoading
  } = useQuery<TokenResponse, Error> ([queryKeys.REFRESH_ACCESS_TOKEN], refreshAccessToken, {
    onSuccess: (data) => {
      store.login(data.accessToken);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.accessToken}`;
    },
    onError: (error) => {
      console.log("액세스 토큰 갱신 실패: ", error);
      store.logout();
    },
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
    retry: false,
    enabled: useAuthStore.getState().isLoggedIn,
  });
  return { isSuccess, isError, isLoading, data, error };
}

/**
 * 로그아웃 Mutation 훅
 */

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  const store = useAuthStore();
  return useMutation(logout, {
    onSuccess: () => {
      store.logout();
      delete axiosInstance.defaults.headers.common['Authorization'];
    },
    onError: (error) => {
      console.error('로그아웃 실패: ', error);
    },
    ...mutationOptions,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const refreshAccessTokenQuery = useRefreshAccessToken();
  const loginMutation = useLocalLogin();
  const logoutMutation = useLogout();

  return {
    signupMutation,
    refreshAccessTokenQuery,
    loginMutation,
    logoutMutation,
  };
}

export default useAuth;
