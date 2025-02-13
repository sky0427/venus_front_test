import { ApiResponse, Profile } from "@/types";
import { Url } from "url";
import axiosInstance from "./axios";
import { useCookies } from "react-cookie";

// ============================================================
// 유저 정보 관리
// ============================================================
interface MemberDto {
  id: bigint;
  email: string;
  nickname: string;
  profileUrl: string | Url;
  role: string;
}

type ResponseProfile = Profile;

// 액세스 토큰으로 사용자 정보 가져오기
const getUserProfile = async (): Promise<Profile> => {
  try {
    const response =
      await axiosInstance.get<ApiResponse<Profile>>(`/api/v1/member/auth`);

    if (response.data.returnCode !== "SUCCESS") {
      throw new Error(response.data.returnMessage || "인증 실패!");
    }

    return response.data.data;
  } catch (error: any) {
    console.error("인증 실패: ", error);
    throw error;
  }
};

// 프로필 수정
const editProfile = async (
  request: Profile,
  imageFile: any
): Promise<ApiResponse<null>> => {
  const { data } = await axiosInstance.patch(`/api/member/update`, imageFile, {
    params: request,
  });
  return data;
};

export { editProfile, getUserProfile };
export type { MemberDto, ResponseProfile };
