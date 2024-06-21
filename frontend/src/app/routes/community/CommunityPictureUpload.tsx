import { useEffect, useRef } from "react";
import LoadingOverlay from "../../../common/LoadingOverlay";
import { usePatchCommunityPictureMutation } from "../../services/community";
import { useParams } from "react-router-dom";
import ThemedButton from "../../../common/ThemedButton";

export default function CommunityPictureUpload() {
  const { name } = useParams();
  const [patchCommunityPicture, { isLoading, error }] = usePatchCommunityPictureMutation();
  const labelRef = useRef<HTMLLabelElement>(null);

  const errorMessage = error?.message;

  useEffect(() => {
    if (errorMessage) alert(errorMessage);
  }, [errorMessage]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    void (async () => {
      const formData = new FormData();
      if (event.target.files && event.target.files.length > 0) {
        formData.append("picture", event.target.files[0]);
        try {
          await patchCommunityPicture({ formData, args: { name: name! } });
        } catch (error) {
          /* empty */
        }
      }
    })();
  };

  return (
    <div>
      <label htmlFor="picture" ref={labelRef}>
        <ThemedButton onClick={() => labelRef.current?.click()}>Change Picture</ThemedButton>
      </label>
      <input id="picture" name="picture" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
      {isLoading && <LoadingOverlay />}
    </div>
  );
}
