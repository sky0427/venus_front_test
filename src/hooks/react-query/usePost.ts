import { getNews, NewsRequestParams } from "@/api";
import { queryKeys } from "@/constants";
import { useNewsStore } from "@/store/usePostStore";
import { useInfiniteQuery } from "@tanstack/react-query";

function useNews(params: NewsRequestParams) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    [queryKeys.GET_NEWS, params],
    ({ pageParam = 0 }) => getNews({ ...params, page: pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.contents.length === 0) {
          return undefined;
        }
        return lastPage.pageNumber + 1;
      },
      onSuccess: (data) => {
        const allNews = data.pages.flatMap((page) => page.contents);

        if (data.pages.length === 1) {
          useNewsStore.getState().setNews(allNews);
        } else {
          useNewsStore.getState().appendNews(allNews);
        }
        useNewsStore
          .getState()
          .setHasMore(!!data.pages[data.pages.length - 1].contents.length);
      },
    }
  );

  const hasMore = useNewsStore((state) => state.hasMore);

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage: hasMore,
    isFetching,
    isFetchingNextPage,
    status,
  };
}

export { useNews };
