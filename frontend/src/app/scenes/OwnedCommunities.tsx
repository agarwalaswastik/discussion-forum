import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import TextFieldPopup from "../../common/popup/TextFieldPopup";
import { useGetOwnedCommunitiesQuery, useStartCommunityMutation } from "../services/community";
import LoadingOverlay from "../../common/LoadingOverlay";
import SidebarLink from "./SidebarLink";
import CommunityPicture from "../../common/CommunityPicture";

export default function OwnedCommunities() {
  const [startCommunity, { isLoading: isStartLoading, error: startError }] = useStartCommunityMutation();
  const { data: ownedData } = useGetOwnedCommunitiesQuery({});
  const [commName, setCommName] = useState<string | null>(null);

  const errorMessage = startError?.message;

  const handleSave = () => {
    void (async () => {
      await startCommunity({ name: commName! });
      setCommName(null);
    })();
  };

  useEffect(() => {
    if (errorMessage) alert(errorMessage);
  }, [errorMessage]);

  return (
    <>
      <h2 className="text-accent text-heading w-full text-center">Owned</h2>
      <button
        onClick={() => setCommName("")}
        className="hover:bg-gray flex w-full items-center gap-2 rounded-sm p-2 transition-none"
      >
        <IoAdd />
        <p>New Community</p>
      </button>
      {commName !== null && (
        <TextFieldPopup
          title="Community Name"
          value={commName}
          setValue={setCommName}
          onSave={handleSave}
          onCancel={() => setCommName(null)}
        />
      )}
      {isStartLoading && <LoadingOverlay />}
      {ownedData?.map((comm) => (
        <SidebarLink key={comm.name} url={`/community/${comm.name}`}>
          <CommunityPicture className="~h-5/9 ~w-5/9" picturePath={comm.picturePath} />
          <p>g/{comm.name}</p>
        </SidebarLink>
      ))}
    </>
  );
}
