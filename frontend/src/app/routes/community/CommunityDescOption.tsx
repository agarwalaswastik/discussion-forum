import { useEffect, useState } from "react";
import ThemedButton from "../../../common/ThemedButton";
import { usePatchCommunityMutation } from "../../services/community";
import { useParams } from "react-router-dom";
import TextAreaPopup from "../../../common/popup/TextAreaPopup";
import LoadingOverlay from "../../../common/LoadingOverlay";

export default function CommunityDescription({ description }: { description?: string }) {
  const { name: commName } = useParams();
  const [descriptionField, setDescriptionField] = useState<string | null>(description ?? null);
  const [patchCommunity, { isLoading, error }] = usePatchCommunityMutation();

  const errorMessage = error?.message;

  useEffect(() => {
    if (errorMessage) alert(errorMessage);
  }, [errorMessage]);

  const handleClick = () => {
    void (async () => {
      await patchCommunity({ name: commName!, description: descriptionField! });
      setDescriptionField(null);
    })();
  };

  return (
    <>
      <ThemedButton onClick={() => setDescriptionField("")}>Edit Description</ThemedButton>
      {descriptionField === null ? null : (
        <TextAreaPopup
          title="Description"
          value={descriptionField}
          setValue={setDescriptionField}
          onSave={handleClick}
          onCancel={() => setDescriptionField(null)}
        />
      )}
      {isLoading && <LoadingOverlay />}
    </>
  );
}
