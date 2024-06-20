import { api } from "./api";
import type CommunityData from "../../types/community";

export interface StartCommunityArgs {
  name: string;
}

export type StartCommunityResponse = CommunityData;

export type GetOwnedCommunitiesResponse = { name: string; picturePath?: string }[];

export const communityApi = api.injectEndpoints({
  endpoints: (builder) => ({
    startCommunity: builder.mutation<StartCommunityResponse, StartCommunityArgs>({
      query: ({ ...startCommunityArgs }) => ({
        url: "/community",
        method: "POST",
        body: startCommunityArgs,
      }),
      invalidatesTags: ["OwnedCommunities"],
    }),
    getOwnedCommunities: builder.query<GetOwnedCommunitiesResponse, Record<string, never>>({
      query: () => ({
        url: "/community/owned",
        method: "GET",
      }),
      providesTags: ["OwnedCommunities"],
    }),
  }),
});

export const { useStartCommunityMutation, useGetOwnedCommunitiesQuery } = communityApi;
