import { useParams } from "react-router-dom";
import ProfilePageOther from "./ProfilePageOther";
import ProfilePageSelf from "./ProfilePageSelf";

export default function ProfilePage() {
  const { username } = useParams();

  if (username) return <ProfilePageOther />;
  else return <ProfilePageSelf />;
}
