import { getCurrentUser } from "@/api/user";
import { queryKeys } from "@/constants";
import useAuthStore from "@/store/useAuthStore";
import { Member } from "@/types";
import { useQuery } from "@tanstack/react-query";

/**
 * 내 프로필 정보 가져오기 Query 훅
 */

function useGetCurrentUser() {
  const { setMember } = useAuthStore();

  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Member, Error>({
    queryKey: [queryKeys.GET_CURRENT_USER],
    queryFn: getCurrentUser,
    onSuccess: (data) => {
      try {
        setMember(data);
        console.log("유저 정보를 가져옵니다: ", data);
      } catch (error) {
        console.error("유저 정보 가져오기 실패:", data);
        setMember(null);
      }
    },
    onError: (error) => {
      console.error("인증 실패:", error);
      setMember(null);
    },
    retry: false,
    staleTime: Infinity,
    cacheTime: Infinity,
    enabled: false,
  });

  return { member: response?.data, isLoading, isError, error, refetch };
}

function useUser() {
  const getCurrentUser = useGetCurrentUser();

  return {
    getCurrentUser,
  };
}

export default useUser;
