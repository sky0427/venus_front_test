import { getUserProfile } from "@/api/user";
import { queryKeys } from "@/constants";
import useAuthStore from "@/store/useAuthStore";
import { Profile } from "@/types";
import { useQuery } from "@tanstack/react-query";

/**
 * 내 프로필 정보 가져오기 Query 훅
 */

function useGetUserProfile() {
  const { setProfile, logout } = useAuthStore();

  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useQuery<Profile, Error>({
    queryKey: [queryKeys.GET_USER_PROFILE],
    queryFn: getUserProfile,
    onSuccess: (data) => {
      setProfile(data);
    },
    onError: (error) => {
      console.log("인증 실패: ", error);
      logout();
    },
    retry: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return { profile, isLoading, isError, error };
}

function useUser() {
  const getUserProfile = useGetUserProfile();

  return {
    getUserProfile,
  };
}

export default useUser;
