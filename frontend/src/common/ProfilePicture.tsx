import { selectUser } from "../features/user/userSlice";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export default function ProfilePicture({
  className,
  picturePath,
  username,
}: {
  className?: string;
  username: string;
  picturePath?: string | null | undefined;
}) {
  const loggedInUser = useAppSelector(selectUser);

  let self = false;
  if (loggedInUser.username === username) self = true;

  return (
    <Link className="flex items-center justify-center" to={self ? "/profile" : `/profile/${username}`}>
      <img
        src={`/${picturePath ?? "profile.svg"}`}
        alt="User's profile picture"
        className={className}
        style={{
          borderRadius: "50%",
        }}
      />
    </Link>
  );
}
