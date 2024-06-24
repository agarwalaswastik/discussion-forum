import PostData from "../../types/post";
import { api } from "./api";

type CreatePostResponse = PostData;

export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<CreatePostResponse, FormData>({
      query: (formData) => ({
        url: "/post",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["DisplayedPosts"],
    }),
  }),
});

export const { useCreatePostMutation } = postApi;
