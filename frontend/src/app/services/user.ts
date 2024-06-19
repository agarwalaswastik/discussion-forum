import { api } from "./api";
import type UserData from "../../features/user/user";

export type GetUserResponse = UserData;

export interface GetUserArgs {
  username: string;
}

export interface PatchUserArgs {
  password?: string;
  about?: string;
}

export type PatchUserResponse = UserData;

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<GetUserResponse, GetUserArgs>({
      query: ({ username }) => ({
        url: `/user/${username}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    patchUser: builder.mutation<PatchUserResponse, PatchUserArgs>({
      query: ({ ...patchUserArgs }) => ({
        url: "/user",
        method: "PATCH",
        body: patchUserArgs,
      }),
      invalidatesTags: ["User"],
    }),
    patchUserPicture: builder.mutation<PatchUserResponse, FormData>({
      query: (formData) => ({
        url: "/user",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUserQuery, usePatchUserMutation, usePatchUserPictureMutation } = userApi;
