import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query/react";

interface ErrorResponse {
  status: number | "FETCH_ERROR" | "PARSING_ERROR" | "TIMEOUT_ERROR" | "CUSTOM_ERROR";
  message: string;
}

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, ErrorResponse> = async (args, api, extraOptions) => {
  const rawBaseQuery = fetchBaseQuery({ baseUrl: "/api" });
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    const errorBody = result.error.data as { error: string };
    return { error: { status: result.error.status, message: errorBody.error } };
  }

  const myData = result.data as { data?: unknown };
  return { data: myData.data };
};

const baseQueryWithRetries = retry(baseQuery, { maxRetries: 3 });

export const api = createApi({
  baseQuery: baseQueryWithRetries,
  tagTypes: ["Auth", "User", "OwnedCommunities", "JoinedCommunities", "DisplayedCommunity", "DisplayedPosts"],
  endpoints: () => ({}),
});
