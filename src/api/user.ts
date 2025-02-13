import { ApiResponse, Member, Profile } from "@/types";
import { Url } from "url";
import axiosInstance from "./axios";

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
const getCurrentUser = async (): Promise<Member> => {
  const response =
    await axiosInstance.get<ApiResponse<Member>>(`/api/v1/member/auth`);
  console.log("response data: ", response.data);
  return response.data.data;
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

export { editProfile, getCurrentUser };
export type { MemberDto, ResponseProfile };
