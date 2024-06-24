import { useEffect } from "react";
import LoadingOverlay from "../../../common/LoadingOverlay";
import ThemedButton from "../../../common/ThemedButton";
import { selectLoggedInUsername } from "../../../features/user/userSlice";
import CommunityData from "../../../types/community";
import { useAppSelector } from "../../hooks";
import { useDeleteCommunityMutation, useMemberCommunityMutation } from "../../services/community";
import CommunityPictureUpload from "./CommunityPictureUpload";
import { useNavigate } from "react-router-dom";
import CommunityDescOption from "./CommunityDescOption";
import CommunityCreatePostOption from "./CommunityCreatePostOption";

export default function CommunityOptions({ commData }: { commData: CommunityData }) {
  const loggedInUsername = useAppSelector(selectLoggedInUsername);
  const [deleteCommunity, { isLoading: isDeleteLoading, error: deleteError }] = useDeleteCommunityMutation();
  const [memberCommunity, { isLoading: isMemberLoading, error: memberError }] = useMemberCommunityMutation();
  const navigate = useNavigate();

  const deleteErrorMessage = deleteError?.message;
  const memberErrorMessage = memberError?.message;

  useEffect(() => {
    if (deleteErrorMessage) alert(deleteErrorMessage);
  }, [deleteErrorMessage]);

  useEffect(() => {
    if (memberErrorMessage) alert(memberErrorMessage);
  }, [memberErrorMessage]);

  let relation: "none" | "owner" | "member" = "none";
  if (loggedInUsername === commData.owner.username) relation = "owner";

  const isMember = commData.members.reduce((result, curr) => result || curr.username === loggedInUsername, false);
  if (isMember) {
    relation = "member";
  }

  const handleDelete = () => {
    void (async () => {
      navigate("/");
      await deleteCommunity({ name: commData.name });
    })();
  };

  const handleMember = () => {
    void (async () => {
      await memberCommunity({ name: commData.name });
    })();
  };

  return (
    <div className="flex flex-wrap items-center ~gap-2/4">
      {relation === "owner" && <CommunityDescOption />}
      {relation === "owner" && <CommunityPictureUpload />}
      {loggedInUsername && relation !== "owner" && (
        <ThemedButton onClick={handleMember}>{relation === "member" ? "Leave" : "Join"}</ThemedButton>
      )}
      {relation === "owner" && <ThemedButton onClick={handleDelete}>Delete</ThemedButton>}
      <CommunityCreatePostOption />
      {(isDeleteLoading || isMemberLoading) && <LoadingOverlay />}
    </div>
  );
}
