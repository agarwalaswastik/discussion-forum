import { api } from "./api";
import type { UserState } from "../../features/user/userSlice";

export type GetUserResponse = UserState;

export interface GetUserArgs {
  username: string;
}

export interface PatchUserArgs {
  password?: string;
  about?: string;
}

export type PatchUserResponse = UserState;

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
  }),
});

export const { useGetUserQuery, usePatchUserMutation } = userApi;
