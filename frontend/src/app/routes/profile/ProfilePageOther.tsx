import { useParams } from "react-router-dom";
import { useGetUserQuery } from "../../services/user";
import Profile from "./Profile";

export default function ProfilePageOther() {
  const { username } = useParams();
  const { data, isLoading, error } = useGetUserQuery({ username: username! });
  return <Profile isSelf={false} {...data} isLoading={isLoading} errorMessage={error?.message} />;
}
