// import { useToast } from "@/components/ui/use-toast";
import { Loader, PostCard } from "@/components/shared";
import { useNews } from "@/hooks/react-query/usePost";
import { useNewsStore } from "@/store/usePostStore";
import { useCallback, useRef } from "react";

const Home = () => {
  // const { toast } = useToast();

  const { error, fetchNextPage, hasNextPage, isFetching, status } = useNews({});

  const newsList = useNewsStore((state) => state.newsList);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastNewsElementRef = useCallback(
    (node: HTMLLIElement) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetching, fetchNextPage, hasNextPage]
  );

  if (status === "loading")
    return (
      <>
        <Loader />
      </>
    );
  if (status === "error")
    return (
      <p>Error: {error instanceof Error ? error.message : "Unknown Error"}</p>
    );

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isFetching && !newsList ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full ">
              {newsList.map((news, index) => (
                <li
                  key={news.id}
                  className="flex justify-center w-full"
                  ref={
                    index === newsList.length - 1
                      ? lastNewsElementRef
                      : undefined
                  }>
                  <PostCard news={news} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* <div className="home-creators">
        <h3 className="h3-bold text-light-1">Top Creators</h3>
        {isUserLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div> */}
    </div>
  );
};

export default Home;
