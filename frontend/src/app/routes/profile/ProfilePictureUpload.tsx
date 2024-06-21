import { useDispatch } from "react-redux";
import { setUser } from "../../../features/user/userSlice";
import LoadingOverlay from "../../../common/LoadingOverlay";
import { usePatchUserPictureMutation } from "../../../app/services/user";

export default function ProfilePictureUpload() {
  const [patchUserPicture, { isLoading, error }] = usePatchUserPictureMutation();
  const dispatch = useDispatch();

  const errorMessage = error?.message;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    void (async () => {
      const formData = new FormData();
      if (event.target.files && event.target.files.length > 0) {
        formData.append("picture", event.target.files[0]);

        try {
          const payload = await patchUserPicture(formData).unwrap();
          dispatch(setUser({ loggedInUser: payload }));
        } catch (error) {
          /* empty */
        }
      }
    })();
  };

  return (
    <div>
      <label
        htmlFor="picture"
        className="text-accent border-accent hover:bg-accent cursor-pointer rounded-md border-2 ~px-2/4 ~py-1/2 hover:text-dark-text"
      >
        Change Picture
      </label>
      <input id="picture" name="picture" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
      {isLoading && <LoadingOverlay />}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
}
