import { ApiResponse, Profile } from "@/types";
import { Url } from "url";
import axiosInstance from "./axios";
import { useCookies } from "react-cookie";


// ============================================================
// 유저 정보 관리
// ============================================================

type RequestProfile = {
  memberId: bigint;
  password: string;
  nickname: string;
  profileUrl: string | Url;
};

type ResponseProfile = Profile;

// 내 프로필 조회
const getUserProfile = async (): Promise<ResponseProfile> => {
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies;
  const response = await axiosInstance.get(`/api/member/me`, {
    headers: {Authorization: `Bearer ${accessToken}`}
  });
  return response.data;
};

// 프로필 수정
const editProfile = async (
  request: RequestProfile,
  imageFile: any
): Promise<ApiResponse<null>> => {
  const { data } = await axiosInstance.patch(`/api/member/update`, imageFile, {
    params: request,
  });
  return data;
};

export { editProfile, getUserProfile };
export type { RequestProfile, ResponseProfile };
