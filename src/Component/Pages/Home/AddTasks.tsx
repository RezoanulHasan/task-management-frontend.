import React from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

import Container from "../../Shared/Container";
import {
  Tasks,
  useAddTaskMutation,
  useGetAllTasksQuery,
} from "../../../Redux/features/tasks/taskApi";
//  <div className="mt-8  bg-black t p-10 m-4  rounded-2xl">
const AddTasks: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [addTask] = useAddTaskMutation();
  const { refetch } = useGetAllTasksQuery({});
  const onSubmit = async (data: Partial<Tasks>) => {
    try {
      const result = await addTask({
        title: data.title!,
        description: data.description!,
        status: "incomplete",
      }).unwrap();
      console.log("Task added:", result);

      await refetch(); // Refetch all tasks after add

      Swal.fire({
        icon: "success",
        title: "Task Added!",
        text: "Your new task has been successfully added.",
      });

      reset(); // Reset form fields
    } catch (error) {
      console.error("Error adding task:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add task. Please try again later.",
      });
    }
  };

  return (
    <Container>
      <div
        className="mt-8 relative p-10 m-4 rounded-2xl bg-cover h-full w-full"
        style={{
          backgroundImage:
            "url(https://i.pinimg.com/736x/7b/b4/43/7bb4439e279301729e27d2f83e33daf4.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-2xl mb-4 text-white text-center font-extrabold ">
          ADD TASK HERE
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block mb-2">
            <p className="text-white font-extrabold ">TITLE:</p>
            <input
              type="text"
              {...register("title", { required: "Title is required." })}
              placeholder="Title"
              className={`border-2 border-gray-300 focus:outline-none focus:border-teal-500 px-4 py-2 rounded-md block w-full mt-1 ${
                errors.title ? "border-red-500" : ""
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                Title Filed is Required
              </p>
            )}
          </label>
          <label className="block mb-2">
            <p className="text-white font-extrabold  uppercase">
              {" "}
              Description:
            </p>

            <textarea
              {...register("description", {
                required: "Description is required.",
              })}
              placeholder="Description"
              className={`border-2 border-gray-300 focus:outline-none focus:border-teal-500 px-4 py-2 rounded-md block w-full mt-1 ${
                errors.description ? "border-red-500" : ""
              }`}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                Description Filed Required
              </p>
            )}
          </label>
          <div className="card-actions justify-center mt-5">
            <button
              type="submit"
              className="bg-teal-500  text-center  text-white px-4 py-2 rounded-md"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default AddTasks;
