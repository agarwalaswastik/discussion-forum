import { useParams } from "react-router-dom";
import ProfilePageOther from "./ProfilePageOther";
import ProfilePageSelf from "./ProfilePageSelf";
import { useAppSelector } from "../../hooks";
import { selectLoggedInUsername } from "../../../features/user/userSlice";

export default function ProfilePage() {
  const { username } = useParams();
  const loggedInUsername = useAppSelector(selectLoggedInUsername);

  if (username === loggedInUsername) return <ProfilePageSelf />;
  if (username) return <ProfilePageOther />;
  else return <ProfilePageSelf />;
}
