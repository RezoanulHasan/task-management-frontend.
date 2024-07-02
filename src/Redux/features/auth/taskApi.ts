/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types";

export interface Tasks {
  _id?: string;
  title: string;
  description: string;
  image?: string;
  status?: "completed" | "incomplete";
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  data?: any;
}

const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTasks: builder.query({
      query: () => ({
        url: "/tasks",
        method: "GET",
      }),
      providesTags: [tagTypes.tasks],
    }),
    getSingleTask: builder.query({
      query: (id: string) => ({
        url: `/tasks/${id}`,
        method: "GET",
      }),

      providesTags: [tagTypes.tasks],
    }),
    addTask: builder.mutation({
      query: (newTask: Partial<Tasks>) => ({
        url: `/tasks`,
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: [{ type: tagTypes.tasks }],
    }),

    updateTaskById: builder.mutation({
      query: ({ id, task }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        body: task,
      }),
      invalidatesTags: [{ type: tagTypes.tasks }],
    }),

    deleteTaskById: builder.mutation({
      query: (id: string) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: tagTypes.tasks }],
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useGetSingleTaskQuery,
  useAddTaskMutation,
  useUpdateTaskByIdMutation,
  useDeleteTaskByIdMutation,
} = taskApi;
