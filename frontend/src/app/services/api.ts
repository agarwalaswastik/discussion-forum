import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
});

const baseQueryWithRetries = retry(baseQuery, { maxRetries: 5 });

export const api = createApi({
  baseQuery: baseQueryWithRetries,
  tagTypes: ["Auth"],
  endpoints: () => ({}),
});
