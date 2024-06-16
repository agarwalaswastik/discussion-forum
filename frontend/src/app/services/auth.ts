import { api } from "./api";

export interface RegLogResponse {
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

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
    logout: build.mutation<RegLogResponse, Record<string, never>>({
      query: ({ ...logoutArgs }) => ({
        url: "/auth/logout",
        method: "POST",
        body: logoutArgs,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useRegisterMutation } = authApi;
