import { api } from "./api";
import type UserData from "../../types/user";

export type RegLogResponse = UserData;

export interface RegisterArgs {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface LoginArgs {
  emailOrUsername: string;
  password: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<RegLogResponse, RegisterArgs>({
      query: ({ ...registerArgs }) => ({
        url: "/auth/register",
        method: "POST",
        body: registerArgs,
      }),
      invalidatesTags: ["Auth", "OwnedCommunities"],
    }),
    login: build.mutation<RegLogResponse, LoginArgs>({
      query: ({ ...loginArgs }) => ({
        url: "/auth/login",
        method: "POST",
        body: loginArgs,
      }),
      invalidatesTags: ["Auth", "OwnedCommunities"],
    }),
    logout: build.mutation<object, Record<string, never>>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth", "OwnedCommunities"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = authApi;
