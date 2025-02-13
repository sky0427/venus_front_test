import { Link } from "react-router-dom";

import { multiFormatDateString } from "@/lib/utils";
import useAuthStore from "@/store/useAuthStore";
import { News } from "@/types";

type PostCardProps = {
  news: News;
};

const PostCard = ({ news }: PostCardProps) => {
  const { member } = useAuthStore();

  // if (!news.creator) return;

  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/`}>
            <img
              src={news.thumnailUrl || "/assets/icons/profile-placeholder.svg"}
              alt="creator"
              className="w-12 lg:h-12 rounded-full"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {/* {news.creator.name} */}
              {news.publisherName}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular ">
                {multiFormatDateString(news.publishedAt)}
              </p>
              •<p className="subtle-semibold lg:small-regular">{news.author}</p>
            </div>
          </div>
        </div>

        <Link
          to={`/update-post/${news.id}`}
          className={`${member?.nickname !== news.publisherName && "hidden"}`}>
          <img
            src={"/assets/icons/edit.svg"}
            alt="edit"
            width={20}
            height={20}
          />
        </Link>
      </div>

      <Link to={`/posts/${news.id}`} className="">
        <div className="small-medium lg:base-medium py-5">
          <p className="base-semibold lg:body-semibold mb-5">{news.title}</p>
          <p className="text-light-2 mb-5">{news.content}</p>
          <div className="bg-red">
            <a
              href={news.contentUrl}
              className="text-light-4 small-medium bg-red text-left"></a>
          </div>

          {/* <ul className="flex gap-1 mt-2">
            {news.tags.map((tag: string, index: string) => (
              <li key={`${tag}${index}`} className="text-light-3 small-regular">
                #{tag}
              </li>
            ))}
          </ul> */}
        </div>

        <img
          src={news.imageUrl}
          alt="post image"
          className={`post-card_img ${!news.imageUrl && "hidden"}`}
        />
      </Link>

      {/* <PostStats post={post} userId={member.id} /> */}
    </div>
  );
};

export default PostCard;
