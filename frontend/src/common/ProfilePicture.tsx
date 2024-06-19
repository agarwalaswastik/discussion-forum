import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectLoggedInUsername } from "../features/user/userSlice";

interface ProfilePictureAttributes {
  className?: string;
  username: string;
  picturePath?: string | null | undefined;
}

export default function ProfilePicture({ className, picturePath, username }: ProfilePictureAttributes) {
  const loggedInUsername = useAppSelector(selectLoggedInUsername);

  let self = false;
  if (loggedInUsername === username) self = true;

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
