import LoadingOverlay from "../../common/LoadingOverlay";
import PostWidget from "../../common/PostWidget";
import { useGetHomePostsQuery } from "../services/post";

export default function HomePage() {
  const { data, isLoading, error } = useGetHomePostsQuery({});
  const errorMessage = error?.message;

  if (isLoading || !data) return <LoadingOverlay />;

  if (errorMessage) return <p className="text-content text-center text-red-500 ~p-1/2">{errorMessage}</p>;

  return (
    <div className="py-4 ~px-2/8">
      <ul className="flex flex-col ~gap-2/4">
        <hr className="border-none ~h-1/2" />
        {data.map((post) => (
          <li key={post._id}>
            <PostWidget {...post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
