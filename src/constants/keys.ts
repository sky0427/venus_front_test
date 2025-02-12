const queryKeys = {
  AUTH: 'auth',
  LOGIN: 'login',
  SIGNUP: 'signup',
  REFRESH_ACCESS_TOKEN: 'refreshAccessToken',
  GET_PROFILE: 'getProfile',
  POST: 'post',
  GET_POST: 'getPost',
  GET_POSTS: 'getPosts',
  FAVORITE: 'favorite',
  GET_SEARCH_POSTS: 'getSearchPosts',
  GET_FAVORITE_POSTS: 'getFavoritePosts'
} as const;

const storageKeys = {

} as const;

export { queryKeys, storageKeys };
