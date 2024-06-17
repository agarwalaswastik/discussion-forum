import { api } from "./api";
import type { UserState } from "../../features/user/userSlice";

export type RegLogResponse = UserState;

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
      invalidatesTags: ["Auth"],
    }),
    login: build.mutation<RegLogResponse, LoginArgs>({
      query: ({ ...loginArgs }) => ({
        url: "/auth/login",
        method: "POST",
        body: loginArgs,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: build.mutation<object, Record<string, never>>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = authApi;
