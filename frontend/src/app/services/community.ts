import { api } from "./api";
import type CommunityData from "../../types/community";

export interface StartCommunityArgs {
  name: string;
}

export type StartCommunityResponse = CommunityData;

export const communityApi = api.injectEndpoints({
  endpoints: (builder) => ({
    startCommunity: builder.mutation<StartCommunityResponse, StartCommunityArgs>({
      query: ({ ...startCommunityArgs }) => ({
        url: "/community",
        method: "POST",
        body: startCommunityArgs,
      }),
      invalidatesTags: ["Community"],
    }),
  }),
});

export const { useStartCommunityMutation } = communityApi;
