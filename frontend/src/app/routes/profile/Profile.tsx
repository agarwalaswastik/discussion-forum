import Loading from "../../../common/Loading";
import { setUser, UserState } from "../../../features/user/userSlice";
import ProfilePicture from "../../../common/ProfilePicture";
import { FaRegEdit } from "react-icons/fa";
import clsx from "clsx";
import { useState } from "react";
import TextPopup from "../../../common/TextAreaPopup";
import { PatchUserArgs, usePatchUserMutation } from "../../services/user";
import { useDispatch } from "react-redux";

export default function Profile(props: Partial<UserState> & { isLoading?: boolean; errorMessage?: string }) {
  const [aboutField, setAboutField] = useState<string | null>(null);
  const [patchUser, { isLoading }] = usePatchUserMutation();
  const dispatch = useDispatch();

  const handleSave = async (args: PatchUserArgs) => {
    try {
      const payload = await patchUser(args).unwrap();
      setAboutField(null);
      dispatch(setUser(payload));
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

  if (props.isLoading) return <Loading />;

  const email = props.email!;
  const username = props.username!;
  const picturePath = props.picturePath;
  const karma = props.karma;
  const about = props.about;

  let createdAt: Date | null = null;
  if (props.createdAt && props.updatedAt) {
    try {
      createdAt = new Date(props.createdAt);
    } catch {
      /* empty */
    }
  }

  return (
    <div className="text-content flex flex-col py-4 ~gap-2/4 ~px-2/8">
      <div className="flex items-center gap-2">
        <ProfilePicture className="h-16 w-16" username={username} picturePath={picturePath} />
        <div>
          <h2 className="font-semibold">{username}</h2>
          <p className="text-smaller">{email}</p>
          <p className="text-smaller">Karma: {karma}</p>
          {createdAt && <p className="text-smaller">Member since {createdAt.toDateString()}</p>}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 font-semibold">
          <h3>About</h3>
          <button onClick={() => setAboutField(about ?? "")}>
            <FaRegEdit className="text-content" />
          </button>
          {isLoading && <Loading />}
          {aboutField === null ? null : (
            <TextPopup
              input="About"
              text={aboutField}
              setText={setAboutField}
              onSave={() => {
                void handleSave({ about: aboutField });
              }}
              onCancel={() => setAboutField(null)}
            />
          )}
        </div>
        <p className={clsx(about ? "" : "text-smaller italic")}>{about ? about : "*No about section provided"}</p>
      </div>
      <hr className="border-t-slate" />
    </div>
  );
}
