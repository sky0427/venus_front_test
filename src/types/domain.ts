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
  data(arg0: string, data: any): unknown;
  id: string;
  email: string;
  nickname: string;
  profileUrl?: string;
  role: string;
};

type Follow = {
  id: bigint;
  follower: string;
  followee: string;
};

interface Profile {
  id: number;
  email: string;
  nickname: string;
  profileUrl?: string;
  role: string;
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
};

interface News {
  id: bigint;
  title: string;
  content: string;
  author: string;
  publisherName: string;
  imageUrl: string;
  thumnailUrl: string;
  contentUrl: string;
  category: string;
  publishedAt: string;
}

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
  News,
  Notification,
  Post,
  Profile,
  Repost,
  RepostUnderNews,
  UpdatePost,
};
