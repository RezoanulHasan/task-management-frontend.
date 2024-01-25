import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://y-teal-seven.vercel.app" }),
  tagTypes: ["data"],
  endpoints: (builder) => ({
    getDatas: builder.query({
      query: () => ({
        url: "/datas",
        method: "GET",
      }),
      providesTags: ["data"],
    }),

    addDatas: builder.mutation({
      query: (data) => ({
        url: "/datas",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["data"],
    }),

    deleteDatas: builder.mutation({
      query: (id) => ({
        url: `/datas/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["data"],
    }),
  }),
});

export const { useGetDatasQuery, useAddDatasMutation, useDeleteDatasMutation } =
  baseApi;
