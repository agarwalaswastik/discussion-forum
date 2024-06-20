import { useDispatch } from "react-redux";
import { setUser } from "./userSlice";
import LoadingOverlay from "../../common/LoadingOverlay";
import { PatchUserArgs, usePatchUserMutation } from "../../app/services/user";
import ProfileDescription from "./ProfileDescription";
import ProfilePictureUpload from "./ProfilePictureUpload";
import ProfileAbout from "./ProfileAbout";
import type UserData from "../../types/user";

interface ProfileAttributes extends Partial<UserData> {
  isSelf: boolean;
  isLoading?: boolean;
  errorMessage?: string;
}
export default function Profile(props: ProfileAttributes) {
  const [patchUser, { isLoading, error }] = usePatchUserMutation();
  const dispatch = useDispatch();

  const errorMessage = error?.message;

  const handleSaveAbout = async (args: PatchUserArgs) => {
    try {
      const payload = await patchUser(args).unwrap();
      dispatch(setUser({ loggedInUser: payload }));
    } catch (error) {
      /* empty */
    }
  };

  if (props.errorMessage)
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <h2 className="text-heading">{props.errorMessage}</h2>
      </div>
    );

  if (props.isLoading) return <LoadingOverlay />;

  const email = props.email!;
  const username = props.username!;
  const about = props.about;
  const picturePath = props.picturePath;
  const karma = props.karma!;
  const createdAt = props.createdAt!;

  return (
    <>
      <div className="text-content flex flex-col py-4 ~gap-2/4 ~px-2/8">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <ProfileDescription
          email={email}
          username={username}
          picturePath={picturePath}
          karma={karma}
          createdAt={createdAt}
        />
        {props.isSelf && <ProfilePictureUpload />}
        <ProfileAbout isSelf={props.isSelf} about={about} handleSave={handleSaveAbout} />
        <hr className="border-t-slate" />
      </div>
      {isLoading && <LoadingOverlay />}
    </>
  );
}
