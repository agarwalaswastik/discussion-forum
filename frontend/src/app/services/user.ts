import { api } from "./api";
import type { UserState } from "../../features/user/userSlice";

export type GetUserResponse = UserState;

export interface GetUserArgs {
  username: string;
}

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<GetUserResponse, GetUserArgs>({
      query: ({ username }) => ({
        url: `/user/${username}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserQuery } = userApi;
