import {
  login,
  logout,
  refreshAccessToken,
  signup,
  TokenResponse,
} from "@/api";
import axiosInstance from "@/api/axios";
import { getUserProfile } from "@/api/user";
import { queryKeys } from "@/constants";
import { numbers } from "@/constants/numbers";
import useAuthStore from "@/store/useAuthStore";
import { Profile, UseMutationCustomOptions } from "@/types";
import {
  MutationFunction,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import useBaseMutation from "./useBase";

/**
 * 로그인 Mutation 훅
 */

function useLogin<T>(
  loginAPI: MutationFunction<TokenResponse, T>,
  mutationOptions?: UseMutationCustomOptions
) {
  const store = useAuthStore();
  const queryClient = useQueryClient();

  return useBaseMutation<T, TokenResponse>(loginAPI, {
    ...mutationOptions,
    onSuccess: async (data: any) => {
      try {
        const profileResponse = await queryClient.fetchQuery({
          queryKey: [queryKeys.GET_USER_PROFILE],
          queryFn: getUserProfile,
        });

        store.login(data.accessToken, profileResponse as Profile);
      } catch (error) {
        console.error("프로필 정보 가져오기 실패: ", error);
      }
    },
  });
}

function useLocalLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(login, mutationOptions);
}

// function useKakaoLogin (mutationOptions?: UseMutationCustomOptions) {
//   return useLogin(socialLogin, mutationOptions);
// }

/**
 * 회원가입 Mutation 훅
 */

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useBaseMutation(signup, mutationOptions, (data) => {
    console.log("회원가입 성공", data.data);
  });
}

/**
 * 액세스 토큰 갱신 Query 훅
 */

function useRefreshAccessToken() {
  const store = useAuthStore();
  const { data, error, isSuccess, isError, isLoading } = useQuery<
    TokenResponse,
    Error
  >({
    queryKey: [queryKeys.REFRESH_ACCESS_TOKEN],
    queryFn: refreshAccessToken,
    onSuccess: (data) => {
      store.login(data.accessToken, store.profile!);
      axiosInstance.defaults.headers.common["Authorization"] =
        `Bearer ${data.accessToken}`;
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
  const queryClient = useQueryClient();

  return useBaseMutation(logout, {
    ...mutationOptions,
    onSuccess: () => {
      store.logout();
      delete axiosInstance.defaults.headers.common["Authorization"];
      queryClient.removeQueries({ queryKey: [queryKeys.GET_USER_PROFILE] });
      queryClient.removeQueries({ queryKey: [queryKeys.REFRESH_ACCESS_TOKEN] });
    },
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
