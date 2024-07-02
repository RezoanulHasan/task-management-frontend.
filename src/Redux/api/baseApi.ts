import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tag-types";
//baseQuery: fetchBaseQuery({
//baseUrl: import.meta.env.BACKEND_API_URL,
//})
export const baseApi = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
