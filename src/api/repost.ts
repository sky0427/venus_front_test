import { ApiResponse, Comment, CustomPage, Like, Repost } from "@/types";
import axiosInstance from "./axios";
import { Url } from "url";

type RequestReposts = {
  page: number;
  limit: number;
};

type ResponseGetReposts = ApiResponse<CustomPage<Repost[]>>;

// 리포스트 전체 조회 (페이지네이션)
const getReposts = async (
  keyword: string,
  page: number = 0,
  size: number = 20
): Promise<ResponseGetReposts> => {
  const { data } = await axiosInstance.get(`api/v1/reposts/`, {
    params: {
      keyword,
      page,
      size,
    },
  });

  return data;
};

// 뉴스 포스트 밑에 리포스트 전체 조회
const getRepostsUnderPost = async (
  newsId: number,
  page: number,
  size: number
) => {
  const { data } = await axiosInstance.get(`/api/v1/news/${newsId}/reposts`, {
    params: {
      page,
      size,
    },
  });

  return data;
};

// 리포스트 조회
type ResponseRepost = ApiResponse<Repost>;

const getRepostById = async (id: number): Promise<ResponseRepost> => {
  const { data } = await axiosInstance.get(`/api/v1/repost/${id}`);

  return data;
};

type RepostPinRequest = {
  pinned: boolean;
};

type RepostPinReponse = ApiResponse<null>;

// 리포스트 고정 설정
const setPinned = async (
  repostId: bigint,
  body: RepostPinRequest
): Promise<RepostPinReponse> => {
  const { data } = await axiosInstance.patch(
    `/api/v1/reposts/${repostId}`,
    body
  );
  return data;
};

type createRepostRequest = {
  newsId: bigint;
  writerId: bigint;
  content: string;
  mention: string;
  imageUrl: string | Url;
};

type createRepostResponse = ApiResponse<Repost>;

// 리포스트 생성
const createRepost = async (body: {
  request: createRepostRequest;
  imageFile: any;
}): Promise<createRepostResponse> => {
  const { data } = await axiosInstance.post(`/api/v1/reposts`, body);
  return data;
};

// 리포스트 삭제
const deleteRepostById = async (id: bigint): Promise<ApiResponse<null>> => {
  const { data } = await axiosInstance.delete(`/api/v1/reposts/${id}`);

  return data;
};

type getCommentsResponse = ApiResponse<CustomPage<Comment[]>>;

// 리포스트 댓글 가져오기
const getComments = async (
  repostId: bigint,
  page: number,
  size: number
): Promise<getCommentsResponse> => {
  const { data } = await axiosInstance.get(
    `/api/v1/reposts/${repostId}/comments`,
    {
      params: {
        page,
        size,
      },
    }
  );

  return data;
};

type createRepostCommentRequest = {
  mention: string;
  content: string;
  writerId: bigint;
  mentionedNames: string[];
};

type createRepostCommentResponse = ApiResponse<Comment>;

const createRepostComment = async (
  repostId: bigint,
  body: createRepostCommentRequest
): Promise<createRepostCommentResponse> => {
  const { data } = await axiosInstance.post(
    `/api/v1/reposts/${repostId}/comments`,
    body
  );
  return data;
};

type updateRepostCommentResponse = ApiResponse<Comment>;

// 리포스트 댓글 수정
const updateRepostComment = async (
  repostId: bigint,
  commentId: bigint,
  body: { content: string }
): Promise<updateRepostCommentResponse> => {
  const { data } = await axiosInstance.patch(
    `/api/v1/reposts/${repostId}/comments/${commentId}`,
    body
  );
  return data;
};

// 리포스트 댓글 삭제
const deleteRepostComment = async (
  repostId: bigint,
  commentId: bigint
): Promise<ApiResponse<null>> => {
  const { data } = await axiosInstance.delete(
    `/api/v1/reposts/${repostId}/comments/${commentId}`
  );
  return data;
};

type LikeResponse = { likes: Like[]; count: bigint };
type getRepostLikesResponse = ApiResponse<LikeResponse>;

// 리포스트 좋아요 정보 가져오기
const getRepostLikes = async (
  repostId: bigint
): Promise<getRepostLikesResponse> => {
  const { data } = await axiosInstance.get(`/api/v1/reposts/${repostId}/likes`);

  return data;
};

type markRepostLikeResponse = ApiResponse<Like>;

// 리포스트 좋아요 등록
const markRepostLike = async (
  repostId: bigint
): Promise<markRepostLikeResponse> => {
  const { data } = await axiosInstance.post(
    `/api/v1/reposts/${repostId}/likes`
  );
  return data;
};

// 리포스트 좋아요 취소
const deleteRepostLike = async (
  repostId: bigint
): Promise<ApiResponse<null>> => {
  const { data } = await axiosInstance.delete(
    `/api/v1/reposts/${repostId}/likes/`
  );
  return data;
};

export {
  getReposts,
  getRepostById,
  getRepostsUnderPost,
  deleteRepostById,
  createRepost,
  getRepostLikes,
  markRepostLike,
  deleteRepostLike,
  getComments,
  createRepostComment,
  updateRepostComment,
  deleteRepostComment,
  setPinned,
};
export type { RequestReposts, ResponseRepost };
