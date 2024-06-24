import { Link } from "react-router-dom";
import type PostData from "../types/post";
import { TiArrowDownOutline, TiArrowDownThick, TiArrowUpOutline, TiArrowUpThick } from "react-icons/ti";
import { useAppSelector } from "../app/hooks";
import { selectLoggedInUsername } from "../features/user/userSlice";
import { useDeletePostMutation, useDownvotePostMutation, useUpvotePostMutation } from "../app/services/post";
import LoadingOverlay from "./LoadingOverlay";
import ThemedButton from "./ThemedButton";

export default function PostWidget(props: PostData) {
  const username = useAppSelector(selectLoggedInUsername);
  const [upvotePost, { isLoading: isUpvoteLoading }] = useUpvotePostMutation();
  const [downvotePost, { isLoading: isDownvoteLoading }] = useDownvotePostMutation();
  const [deletePost, { isLoading: isDeleteLoading }] = useDeletePostMutation();

  const upvoted = props.upvoters.reduce((result, curr) => result || curr.username === username, false);
  const downvoted = props.downvoters.reduce((result, curr) => result || curr.username === username, false);

  const handleUpvote = () => {
    void (async () => {
      await upvotePost({ id: props._id });
    })();
  };

  const handleDownvote = () => {
    void (async () => {
      await downvotePost({ id: props._id });
    })();
  };

  const handleDelete = () => {
    void (async () => {
      await deletePost({ id: props._id });
    })();
  };

  const allowDelete = username === props.author.username;

  return (
    <article className="bg-secondary border-slate flex rounded-lg border-2 ~gap-2/4 ~p-2/4">
      <img
        src={`/${props.picturePath ?? "community.png"}`}
        alt="Post Image"
        className="border-slate rounded-xl border-2 ~h-16/40 ~w-16/40"
      />
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex-1">
          <div className="text-smaller flex items-center ~gap-1/2">
            <h3 className="text-heading">{props.title}</h3>
            {props.community ? (
              <Link to={`/community/${props.community.name}`}>g/{props.community.name}</Link>
            ) : (
              <p>g/deleted</p>
            )}
            <Link to={`/profile/${props.author.username}`}>u/{props.author.username}</Link>
          </div>
          <p className="text-content">{props.contents}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center ~gap-1/2">
            <button disabled={!username} onClick={handleUpvote}>
              {upvoted ? <TiArrowUpThick /> : <TiArrowUpOutline />}
            </button>
            <button disabled={!username} onClick={handleDownvote}>
              {downvoted ? <TiArrowDownThick /> : <TiArrowDownOutline />}
            </button>
            <p className="text-content mr-10">{props.upvoters.length - props.downvoters.length}</p>
          </div>
          {allowDelete && <ThemedButton onClick={handleDelete}>Delete</ThemedButton>}
        </div>
      </div>
      {(isUpvoteLoading || isDownvoteLoading || isDeleteLoading) && <LoadingOverlay />}
    </article>
  );
}
