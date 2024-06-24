import { useState } from "react";
import ThemedButton from "../../../common/ThemedButton";
import PostPopup from "../../../common/popup/PostPopup";

export default function CommunityCreatePostOption() {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <>
      <ThemedButton onClick={() => setIsCreating(true)}>Create Post</ThemedButton>
      {isCreating && <PostPopup onComplete={() => setIsCreating(false)} />}
    </>
  );
}
