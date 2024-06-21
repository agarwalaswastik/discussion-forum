import { api } from "./api";
import type CommunityData from "../../types/community";

export interface CommunityArgs {
  name: string;
}
export type CommunityResponse = CommunityData;
export type GetOwnedCommunitiesResponse = { name: string; picturePath?: string }[];
export interface PatchCommunityArgs {
  name: string;
  description?: string;
}

export const communityApi = api.injectEndpoints({
  endpoints: (builder) => ({
    startCommunity: builder.mutation<CommunityResponse, CommunityArgs>({
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
    getCommunity: builder.query<CommunityResponse, CommunityArgs>({
      query: ({ name }) => ({
        url: `/community/${name}`,
        method: "GET",
      }),
      providesTags: ["DisplayedCommunity"],
    }),
    patchCommunity: builder.mutation<CommunityResponse, PatchCommunityArgs>({
      query: ({ name, ...patchCommunityArgs }) => ({
        url: `/community/${name}`,
        method: "PATCH",
        body: patchCommunityArgs,
      }),
      invalidatesTags: ["DisplayedCommunity"],
    }),
    patchCommunityPicture: builder.mutation<CommunityResponse, { formData: FormData; args: CommunityArgs }>({
      query: ({ args, formData }) => ({
        url: `/community/${args.name}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["DisplayedCommunity", "OwnedCommunities"],
    }),
    memberCommunity: builder.mutation<object, CommunityArgs>({
      query: ({ name }) => ({
        url: `/community/${name}/member`,
        method: "PATCH",
      }),
      invalidatesTags: ["DisplayedCommunity"],
    }),
    deleteCommunity: builder.mutation<object, CommunityArgs>({
      query: ({ name }) => ({
        url: `/community/${name}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DisplayedCommunity", "OwnedCommunities"],
    }),
  }),
});

export const {
  useStartCommunityMutation,
  useGetOwnedCommunitiesQuery,
  useGetCommunityQuery,
  usePatchCommunityMutation,
  usePatchCommunityPictureMutation,
  useDeleteCommunityMutation,
  useMemberCommunityMutation
} = communityApi;
