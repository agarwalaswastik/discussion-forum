import PostList from "../../common/PostList";
import { selectLoggedInUsername } from "../../features/user/userSlice";
import { useAppSelector } from "../hooks";

export default function AllPage() {
  const loggedInUsername = useAppSelector(selectLoggedInUsername);

  if (!loggedInUsername)
    return (
      <div className="flex h-full items-center justify-center">
        <h2 className="text-heading">Login to see Home Page</h2>
      </div>
    );

  return (
    <div className="py-4 ~px-2/8">
      <PostList />
    </div>
  );
}
