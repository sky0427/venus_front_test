import { ApiResponse, CustomPage, Post } from "@/types/domain";
import axiosInstance from "./axios";

type RequestPageParams = {
  page: number;
  limit: number;
};

type ResponseGetPosts = ApiResponse<CustomPage<Post[]>>;

// 뉴스 포스트 전체 가져오기
const getPosts = async (
  keyword: string,
  title: boolean,
  content: boolean,
  publisher: boolean,
  category: string,
  page: number = 0,
  limit: number = 20
): Promise<ResponseGetPosts> => {
  const { data } = await axiosInstance.get(`/api/v1/news`, {
    params: {
      keyword,
      title,
      content,
      publisher,
      category,
      page,
      limit,
    },
  });

  return data;
};

type ResponseSinglePost = ApiResponse<Post>;

// 뉴스 포스트 가져오기
const getPostById = async (id: number): Promise<ResponseSinglePost> => {
  const { data } = await axiosInstance.get(`/api/v1/news/${id}`);

  return data;
};

type RequestUpdatePost = {
  id: number;
  body: { title: string; content: string };
};

type ResponseUpdatePost = ApiResponse<Post>;

// 뉴스 포스트 수정
const updatePost = async ({
  id,
  body,
}: RequestUpdatePost): Promise<ResponseUpdatePost> => {
  const { data } = await axiosInstance.patch(`/api/v1/news/${id}`, body);
  return data;
};

type RequestDelete = ApiResponse<null>;

// 뉴스 포스터 삭제
const deletePost = async (id: number): Promise<RequestDelete> => {
  const { data } = await axiosInstance.delete(`api/v1/news/${id}`);

  return data;
};

export { getPosts, deletePost, updatePost, getPostById };
export type {
  RequestPageParams,
  ResponseGetPosts,
  RequestUpdatePost,
  ResponseUpdatePost,
  RequestDelete,
  ResponseSinglePost,
};
