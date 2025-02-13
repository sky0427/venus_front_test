import {
  kakaoLogin,
  login,
  LoginRequest,
  logout,
  naverLogin,
  refreshAccessToken,
  signup,
  TokenResponse,
} from "@/api";
import { getCurrentUser } from "@/api/user";
import { queryKeys } from "@/constants";
import useAuthStore from "@/store/useAuthStore";
import {
  ApiResponse,
  Member,
  UseMutationCustomOptions,
  UseQueryCustomOptions,
} from "@/types";
import {
  MutationFunction,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getCookie } from "../useCookie";
import useBaseMutation from "./useBase";

/**
 * 로그인 Mutation 훅
 */

function useLogin<T>(
  loginAPI: MutationFunction<ApiResponse<string>, T>,
  mutationOptions?: UseMutationCustomOptions
) {
  const store = useAuthStore();
  const queryClient = useQueryClient();

  return useBaseMutation<T, ApiResponse<string>>(loginAPI, {
    ...mutationOptions,
    onSuccess: async (data: ApiResponse<string>) => {
      try {
        const accessToken = getCookie("accessToken");
        if (!accessToken) {
          throw new Error("accessToken이 없습니다.");
        }

        const memberResponse = await queryClient.fetchQuery({
          queryKey: [queryKeys.GET_CURRENT_USER],
          queryFn: getCurrentUser,
        });

        store.login(memberResponse as Member);

        mutationOptions?.onSuccess?.(data);
      } catch (error) {
        console.error("프로필 정보 가져오기 실패: ", error);
        mutationOptions?.onError?.(error);
      }
    },
    onError: (error) => {
      console.error("로그인 실패: ", error);
      mutationOptions?.onError?.(error);
    },
  });
}

/**
 * 로컬 로그인
 */

function useLocalLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin<LoginRequest>(login, mutationOptions);
}

/**
 * 카카오 로그인
 */

function useKakaoLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(kakaoLogin, mutationOptions);
}

/**
 * 네이버 로그인
 */

interface NaverLoginParams {
  code: string;
  state: string;
}

function useNaverLogin(mutationOptions?: UseMutationCustomOptions) {
  return useBaseMutation<NaverLoginParams, TokenResponse>(
    ({ code, state }) => naverLogin(code, state),
    mutationOptions
  );
}
/**
 * 회원가입 Mutation 훅
 */

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useBaseMutation(signup, mutationOptions);
}

/**
 * 액세스 토큰 갱신 Query 훅
 */

function useRefreshAccessToken(options?: UseQueryCustomOptions<TokenResponse>) {
  const store = useAuthStore();
  const queryClient = useQueryClient();

  const { data, error, isSuccess, isError, isLoading, refetch } = useQuery<
    TokenResponse,
    Error
  >([queryKeys.REFRESH_ACCESS_TOKEN], refreshAccessToken, {
    ...options,
    enabled: false,
    retry: false,
    onSuccess: async (data) => {
      try {
        const memberResponse = await queryClient.fetchQuery({
          queryKey: [queryKeys.GET_CURRENT_USER],
          queryFn: getCurrentUser,
        });
        store.setMember(memberResponse);
        options?.onSuccess?.(data); // 기존 onSuccess 호출
      } catch (fetchError) {
        console.error("사용자 정보 가져오기 실패:", fetchError);
        options?.onError?.(fetchError);
      }
    },
    onError: (error) => {
      console.error("액세스 토큰 갱신 실패:", error);
      const refreshToken = getCookie("refreshToken");
      if (refreshToken) {
        store.logout();
      }
      options?.onError?.(error);
    },
  });

  return { data, error, isSuccess, isError, isLoading, refetch };
}

// function useRefreshAccessToken(mutationOptions?: UseMutationCustomOptions) {
//   const store = useAuthStore();
//   const queryClient = useQueryClient();
//
//   const { mutate, isLoading, isError, error } = useBaseMutation(
//     refreshAccessToken,
//     {
//       ...mutationOptions,
//       onSuccess: async (data: TokenResponse) => {
//         try {
//           const memberResponse = await queryClient.fetchQuery({
//             queryKey: [queryKeys.GET_CURRENT_USER],
//             queryFn: getCurrentUser,
//           });
//           store.setMember(memberResponse);
//           mutationOptions?.onSuccess?.(data);
//         } catch (fetchError) {
//           console.log("사용자 정보 가져오기 실패: ", fetchError);
//           mutationOptions?.onError?.(fetchError);
//         }
//       },
//       onError: (error) => {
//         console.error("액세스 토큰 갱신 실패: ", error);
//         const refreshToken = getCookie("refreshToken");
//         if (refreshToken) {
//           store.logout();
//         }
//         mutationOptions?.onError?.(error);
//       },
//     }
//   );
//   return { mutate, isLoading, isError, error };
//}

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
      queryClient.removeQueries({ queryKey: [queryKeys.GET_CURRENT_USER] });
      queryClient.removeQueries({ queryKey: [queryKeys.REFRESH_ACCESS_TOKEN] });
      mutationOptions?.onSuccess?.();
    },
    onError: (error) => {
      mutationOptions?.onError?.(error);
    },
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const refreshAccessTokenQuery = useRefreshAccessToken();
  const loginMutation = useLocalLogin();
  const kakaoLoginMutation = useKakaoLogin();
  const naverLoginMutation = useNaverLogin();
  const logoutMutation = useLogout();

  return {
    signupMutation,
    refreshAccessTokenQuery,
    loginMutation,
    kakaoLoginMutation,
    naverLoginMutation,
    logoutMutation,
  };
}

export default useAuth;
