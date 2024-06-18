import Loading from "../../../common/Loading";
import { UserState } from "../../../features/user/userSlice";
import ProfilePicture from "../../../common/ProfilePicture";

export default function Profile(props: Partial<UserState> & { isLoading?: boolean; errorMessage?: string }) {
  if (props.errorMessage)
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <h2 className="text-heading">{props.errorMessage}</h2>
      </div>
    );

  if (props.isLoading) return <Loading />;

  const username = props.username!;
  const picturePath = props.picturePath;

  return (
    <div className="grid grid-cols-1">
      <ProfilePicture username={username} picturePath={picturePath} />
    </div>
  );
}
