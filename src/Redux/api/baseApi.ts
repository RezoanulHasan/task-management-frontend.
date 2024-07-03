import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tag-types";

//  baseUrl: "http://localhost:5000/api"
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tasks-management-server-three.vercel.app/api",
  }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
