import { useGetPostsQuery } from "../app/services/post";
import LoadingOverlay from "./LoadingOverlay";
import PostWidget from "./PostWidget";

export default function PostList({ communityName, authorName }: { communityName?: string; authorName?: string }) {
  const { data, isLoading, error } = useGetPostsQuery({ communityName, authorName });
  const errorMessage = error?.message;

  if (isLoading || !data) return <LoadingOverlay />;

  if (errorMessage) return <p className="text-content text-center text-red-500 ~p-1/2">{errorMessage}</p>;

  return (
    <ul className="flex flex-col ~gap-2/4">
      <hr className="border-none ~h-1/2" />
      {data.map((post) => (
        <li key={post._id}>
          <PostWidget {...post} />
        </li>
      ))}
    </ul>
  );
}
