import { selectLoggedInUser } from "../../../features/user/userSlice";
import { useAppSelector } from "../../hooks";
import Profile from "./Profile";

export default function ProfilePageSelf() {
  const user = useAppSelector(selectLoggedInUser)!;
  return <Profile isSelf={true} {...user} />;
}
