import React, { useEffect, useState } from "react";
import {
  Tasks,
  useGetAllTasksQuery,
} from "../../../Redux/features/auth/taskApi";
import Spinner from "../../Shared/Spinner/Spinner";
import Swal from "sweetalert2";
import { FaTrash, FaCheck, FaEdit } from "react-icons/fa"; // Example icons, adjust as needed
import { useTaskHelpers } from "./helper";
import AddTasks from "./AddTasks";
// Import the helper functions

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const {
    data: response,
    isError,
    isLoading,
    refetch,
  } = useGetAllTasksQuery({});

  const { handleDeleteTask, handleUpdateTask } = useTaskHelpers(); // Use the helper functions

  useEffect(() => {
    if (!isLoading && response && Array.isArray(response.tasks)) {
      setTasks(response.tasks);
    }
  }, [response, isLoading]);

  const confirmDeleteTask = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await handleDeleteTask(id, refetch);
    }
  };

  const confirmUpdateTask = async (id: string, updatedTask: Partial<Tasks>) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to change this status!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, update it!",
    });

    if (result.isConfirmed) {
      await handleUpdateTask(id, updatedTask, refetch);
    }
  };

  const confirmEditTask = async (task: Tasks) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Task",
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Title" value="${task.title}">
        <textarea id="swal-input2" class="swal2-textarea" placeholder="Description">${task.description}</textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Update",
      preConfirm: () => {
        const title = (
          document.getElementById("swal-input1") as HTMLInputElement
        ).value;
        const description = (
          document.getElementById("swal-input2") as HTMLTextAreaElement
        ).value;
        return { title, description };
      },
    });

    if (formValues) {
      await handleUpdateTask(
        task._id!,
        { title: formValues.title, description: formValues.description },
        refetch
      );
    }
  };

  if (isLoading) return <Spinner />;
  if (isError || !Array.isArray(tasks)) {
    return <div>Error loading data. Please try again later.</div>;
  }

  return (
    <>
      <AddTasks></AddTasks>
      <div className="max-w-4xl mx-auto mt-10 bg-gray-800 text-white p-10 m-4 border-white rounded-2xl">
        <ul>
          {tasks
            ?.slice()
            .reverse()
            .map((task: Tasks) => (
              <li
                key={task._id}
                className="border rounded-lg p-4 my-2 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between transition duration-500 ease-in-out transform hover:scale-105"
              >
                <div className="flex-grow">
                  <h3 className="text-xl  font-bold ">
                    Title:<span className="text-teal-500">{task.title}</span>
                  </h3>
                  <p className="">Description:{task.description}</p>
                  <p className="mb-2">
                    Status:{" "}
                    <span className="text-rose-500 font-mono font-bold">
                      {task.status}
                    </span>{" "}
                  </p>
                </div>
                <div className="flex mt-4 sm:mt-0">
                  <button
                    onClick={() =>
                      confirmUpdateTask(task._id!, {
                        status:
                          task.status === "completed"
                            ? "incomplete"
                            : "completed",
                      })
                    }
                    className={`mr-2 px-4 py-1 rounded-md ${
                      task.status === "completed"
                        ? "bg-gray-400 text-white"
                        : "bg-teal-500 text-white"
                    } hover:bg-opacity-80 transition duration-300 ease-in-out`}
                  >
                    {task.status === "completed" ? (
                      <>
                        <FaCheck className="inline-block mr-1" />
                        inComplete
                      </>
                    ) : (
                      <>
                        <FaCheck className="inline-block mr-1" />
                        Complete
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => confirmEditTask(task)}
                    className="px-4 py-1 bg-blue-500 text-white rounded-md mr-2 hover:bg-opacity-80 transition duration-300 ease-in-out"
                  >
                    <FaEdit className="inline-block mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDeleteTask(task._id!)}
                    className="px-4 py-1 bg-red-500 text-white rounded-md mr-2 hover:bg-opacity-80 transition duration-300 ease-in-out"
                  >
                    <FaTrash className="inline-block mr-1" />
                    Delete
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default TaskList;
