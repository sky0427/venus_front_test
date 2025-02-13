import { Url } from "url";

interface ApiResponse<T> {
  returnCode: string;
  returnMessage: string;
  data: T;
}

type CustomPage<T> = {
  contents: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: bigint;
};

type ImageUri = {
  id?: number;
  uri: string | URL;
};

type Member = {
  id: string;
  email: string;
  nickname: string;
  profileUrl: URL | string;
};

type Follow = {
  id: bigint;
  follower: string;
  followee: string;
};

interface Profile {
  email: string;
  nickname: string;
  profileUrl: string | null;
  role: string;
  id: bigint;
}

type Post = {
  id: bigint;
  title: string;
  content: string;
  author: string;
  publisher: string;
  imageUrl: string;
  thumnailUrl: string;
  contentUrl: string;
  category: string;
  publishedAt: string;
  reposts: Repost[];
};

type UpdatePost = {
  newsId: bigint;
  writerId: bigint;
  content: string;
  mentions: string;
};

type Repost = {
  id: bigint;
  writerId: bigint;
  nickname: string;
  content: string;
  news: Post;
  mentions: Mention[];
  commentInfo: CommentInfo;
  likeInfo: LikeInfo;
  imageUrl: string;
};

type RepostUnderNews = {
  id: bigint;
  writerId: bigint;
  nickname: string;
  content: string;
  mentions: Mention[];
  commentInfo: CommentInfo;
  likeInfo: Like;
  imageUrl: string;
};

type Mention = {
  id: bigint;
  name: string;
};

type CommentMention = {
  comment: Comment;
  member: Member;
};

type Like = {
  id: bigint;
  repostId: bigint;
  writerId: bigint;
  checkedUserId: bigint;
  checkedUsername: string;
};

type LikeInfo = {
  likes: Like[];
  count: bigint;
};

type Comment = {
  id: bigint;
  repostId: bigint;
  repostWriterId: bigint;
  repostWriterName: string;
  memtions: CommentMention[];
  content: string;
  commentWriterId: bigint;
  commentWriterName: string;
};

type CommentInfo = {
  comments: Comment[];
  count: bigint;
};

type Notification = {
  id: bigint;
  message: string;
  url: string;
};

export type {
  ApiResponse,
  Comment,
  CommentInfo,
  CommentMention,
  CustomPage,
  Follow,
  ImageUri,
  Like,
  LikeInfo,
  Member,
  Mention,
  Notification,
  Post,
  Profile,
  Repost,
  RepostUnderNews,
  UpdatePost,
};
