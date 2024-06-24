import { useParams } from "react-router-dom";
import Popup from "./Popup";
import { Form, Formik } from "formik";
import ThemedButton from "../ThemedButton";
import ThemedTextField from "../ThemedTextField";
import { useRef, useState } from "react";
import { useCreatePostMutation } from "../../app/services/post";
import LoadingOverlay from "../LoadingOverlay";

export default function PostPopup({ onComplete }: { onComplete: () => void }) {
  const { name } = useParams();
  const [imgURL, setImgURL] = useState<string | null>(null);
  const imgLabelRef = useRef<HTMLLabelElement>(null);
  const [createPost, { isLoading }] = useCreatePostMutation();

  const initialValues = { picture: null, title: "", contents: "" };

  const handleSubmit = async (values: { picture?: File | null | undefined; title: string; contents: string }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("contents", values.contents);
    if (values.picture) formData.append("picture", values.picture);
    formData.append("communityName", name!);

    try {
      await createPost(formData).unwrap();
      onComplete();
    } catch (error) {
      const em = (error as { message?: string }).message;
      alert(em);
    }
  };

  return (
    <Popup title="Create Post">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue }) => (
          <Form className="flex w-full flex-col items-center ~gap-2/4">
            {imgURL && (
              <img src={imgURL} alt="Post Image" className="border-slate aspect-square w-5/6 rounded-xl border-2" />
            )}
            <label ref={imgLabelRef} htmlFor="post-picture">
              <ThemedButton
                onClick={(e) => {
                  e.preventDefault();
                  imgLabelRef.current?.click();
                }}
              >
                Upload Picture
              </ThemedButton>
            </label>
            <input
              id="post-picture"
              name="post-picture"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setImgURL(URL.createObjectURL(e.target.files[0]));
                  void setFieldValue("picture", e.target.files[0]);
                }
              }}
            />
            <ThemedTextField isError={false} id="title" name="title" placeholder="Post Title" required />
            <textarea
              rows={10}
              id="contents"
              name="contents"
              className="bg-primary border-slate focus:border-accent w-5/6 resize-none rounded-lg border-2 outline-none ~p-1/2"
              placeholder="Post Content"
              onChange={(e) => void setFieldValue("contents", e.target.value)}
              required
            />
            <div className="flex items-center justify-center ~gap-2/4">
              <ThemedButton type="submit">Create</ThemedButton>
              <ThemedButton
                onClick={(e) => {
                  e.preventDefault();
                  onComplete();
                }}
              >
                Cancel
              </ThemedButton>
            </div>
          </Form>
        )}
      </Formik>
      {isLoading && <LoadingOverlay />}
    </Popup>
  );
}
