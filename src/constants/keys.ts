const queryKeys = {
  AUTH: "auth",
  LOGIN: "login",
  SIGNUP: "signup",
  REFRESH_ACCESS_TOKEN: "refreshAccessToken",
  GET_CURRENT_USER: "getCurrentUser",
  POST: "post",
  GET_POST: "getPost",
  GET_POSTS: "getPosts",
  FAVORITE: "favorite",
  GET_SEARCH_POSTS: "getSearchPosts",
  GET_FAVORITE_POSTS: "getFavoritePosts",
  GET_NEWS: "getNews",
} as const;

const storageKeys = {} as const;

export { queryKeys, storageKeys };
