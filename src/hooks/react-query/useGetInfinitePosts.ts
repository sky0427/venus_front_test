import { getPosts } from "@/api";
import { queryKeys } from "@/constants";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetInfinitePosts(

) {
  return useInfiniteQuery({
    queryFn: ({ pageParam = 0 }: any) => getPosts(pageParam),
    queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, allPages: any) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPages.length + 1 : undefined;
    },
  })
}

export default useGetInfinitePosts;
