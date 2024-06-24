import CommunityPicture from "../../common/CommunityPicture";
import { useGetJoinedCommunitiesQuery } from "../services/community";
import SidebarLink from "./SidebarLink";

export default function JoinedCommunities() {
  const { data: joinedData } = useGetJoinedCommunitiesQuery({});

  return (
    <>
      <h2 className="text-accent text-heading w-full text-center">Joined</h2>
      {joinedData?.map((comm) => (
        <SidebarLink key={comm.name} url={`/community/${comm.name}`}>
          <CommunityPicture className="~h-5/9 ~w-5/9" picturePath={comm.picturePath} />
          <p>g/{comm.name}</p>
        </SidebarLink>
      ))}
    </>
  );
}
