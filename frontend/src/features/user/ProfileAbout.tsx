import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import clsx from "clsx";
import TextInputPopup from "../../common/popup/TextInputPopup";
import type UserData from "./user";
import type { PatchUserArgs } from "../../app/services/user";

interface ProfileAboutAttributes extends Pick<UserData, "about"> {
  handleSave: (args: PatchUserArgs) => Promise<void>;
  isSelf: boolean;
}
export default function ProfileAbout({ about, handleSave, isSelf }: ProfileAboutAttributes) {
  const [aboutField, setAboutField] = useState<string | null>(null);

  const handleClick = () => {
    void (async () => {
      await handleSave({ about: aboutField! });
      setAboutField(null);
    })();
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 font-semibold">
        <h3>About</h3>
        {isSelf && (
          <button onClick={() => setAboutField(about ?? "")}>
            <FaRegEdit className="text-content" />
          </button>
        )}
        {aboutField === null ? null : (
          <TextInputPopup
            title="About"
            value={aboutField}
            setValue={setAboutField}
            onSave={handleClick}
            onCancel={() => setAboutField(null)}
          />
        )}
      </div>
      <p className={clsx(about ? "" : "text-smaller italic")}>{about ? about : "*No about section provided"}</p>
    </div>
  );
}
