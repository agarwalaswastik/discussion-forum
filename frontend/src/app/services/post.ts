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
    getPosts: builder.query<PostData[], { authorName?: string; communityName?: string }>({
      query: ({ authorName, communityName }) => {
        let url = "/post?";
        if (authorName) url += `author=${authorName}&`;
        if (communityName) url += `community=${communityName}&`;

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["DisplayedPosts"],
    }),
    upvotePost: builder.mutation<object, { id: string }>({
      query: ({ id }) => ({
        url: `/post/${id}/vote`,
        method: "PATCH",
        body: { action: "upvote" },
      }),
      invalidatesTags: ["DisplayedPosts"],
    }),
    downvotePost: builder.mutation<object, { id: string }>({
      query: ({ id }) => ({
        url: `/post/${id}/vote`,
        method: "PATCH",
        body: { action: "downvote" },
      }),
      invalidatesTags: ["DisplayedPosts"],
    }),
    deletePost: builder.mutation<object, { id: string }>({
      query: ({ id }) => ({
        url: `/post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DisplayedPosts"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useDownvotePostMutation,
  useGetPostsQuery,
  useUpvotePostMutation,
} = postApi;
