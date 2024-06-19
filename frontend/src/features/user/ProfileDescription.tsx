import ProfilePicture from "../../common/ProfilePicture";
import type UserData from "./user";

type ProfileDescriptionAttributes = Omit<UserData, "about" | "updatedAt">;
export default function ProfileDescription({
  email,
  username,
  picturePath,
  karma,
  createdAt,
}: ProfileDescriptionAttributes) {
  let createdAtDate: Date | null = null;
  if (createdAt) {
    try {
      createdAtDate = new Date(createdAt);
    } catch {
      /* empty */
    }
  }

  return (
    <div className="flex items-center gap-2">
      <ProfilePicture className="h-16 w-16" username={username} picturePath={picturePath} />
      <div>
        <h2 className="font-semibold">{username}</h2>
        <p className="text-smaller">{email}</p>
        <p className="text-smaller">Karma: {karma}</p>
        {createdAtDate && <p className="text-smaller">Member since {createdAtDate.toDateString()}</p>}
      </div>
    </div>
  );
}
