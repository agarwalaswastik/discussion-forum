import { useParams } from "react-router-dom";
import CommunityPicture from "../../../common/CommunityPicture";
import { useGetCommunityQuery } from "../../services/community";
import LoadingOverlay from "../../../common/LoadingOverlay";
import clsx from "clsx";
import CommunityOptions from "./CommunityOptions";
import PostList from "../../../common/PostList";

export default function CommunityPage() {
  const { name } = useParams();
  const { data, isLoading, error } = useGetCommunityQuery({ name: name! });

  const errorMessage = error?.message;

  if (errorMessage) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <h2 className="text-heading">{errorMessage}</h2>
      </div>
    );
  }

  if (isLoading) return <LoadingOverlay />;

  const commData = data!;

  return (
    <div className="text-content flex flex-col py-4 ~gap-2/4 ~px-2/8">
      <div className="~mb-12/24">
        <div className="border-slate bg-secondary relative w-full rounded-md border-2 ~h-20/40">
          <div className="absolute left-[5%] top-full flex -translate-y-1/4 items-center ~gap-2/4">
            <CommunityPicture
              picturePath={data?.picturePath}
              className="border-slate rounded-xl border-2 ~h-16/32 ~w-16/32"
            />
            <h2 className="~text-3xl/6xl">g/{commData.name}</h2>
          </div>
        </div>
      </div>
      <p className={clsx(commData.description ? "" : "text-smaller italic")}>
        {commData.description ? commData.description : "*No description provided"}
      </p>
      <CommunityOptions commData={commData} />
      <PostList communityName={name} />
    </div>
  );
}
