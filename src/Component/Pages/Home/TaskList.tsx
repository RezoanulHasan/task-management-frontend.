import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaTrash, FaCheck, FaEdit } from "react-icons/fa";
import {
  useGetAllTasksQuery,
  Tasks,
} from "../../../Redux/features/auth/taskApi";
import Spinner from "../../Shared/Spinner/Spinner";
import { useTaskHelpers } from "./helper";
import AddTasks from "./AddTasks";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);

  const {
    data: response,
    isError,
    isLoading,
    refetch,
  } = useGetAllTasksQuery({
    page,
    limit,
  });

  const { handleDeleteTask, handleUpdateTask } = useTaskHelpers();

  useEffect(() => {
    if (!isLoading && response && Array.isArray(response.tasks)) {
      setTasks(response.tasks);
    }
  }, [response, isLoading]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const totalTasks = response?.meta?.total || 0;
  const TaskCountPerPage = tasks.length;

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
      <AddTasks />

      <div className="max-w-4xl mx-auto mt-10  bg-cover h-full w-full bg-black  text-white p-10 m-4 border-white rounded-2xl ">
        <h2 className="text-4xl lg:text-center md:text-center xl:text-center font-extrabold uppercase mb-4">
          Total Tasks - {totalTasks}{" "}
        </h2>
        <h1 className="text-accent text-center text-2xl font-extrabold uppercase">
          {TaskCountPerPage} Tasks
        </h1>

        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task: Tasks) => (
              <li
                key={task._id}
                className="border rounded-lg p-4 my-2 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between transition duration-500 ease-in-out transform hover:scale-105"
              >
                <div className="flex-grow">
                  <h3 className="text-xl  font-extrabold uppercase">
                    Title: <span className="text-teal-500">{task.title}</span>
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
        ) : (
          <div>
            <h1 className="text-center text-4xl mb-10 mt-32">
              No Tasks <span className="text-accent">Found</span>
            </h1>
          </div>
        )}

        <div className="flex justify-start lg:justify-end md:justify-end xl:justify-end items-center mt-8 mb-5">
          <button
            className={`join-item btn btn-outline bg-white mr-2 px-4 py-2 rounded-md ${
              page === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous Page
          </button>

          <button className=" text-xl font-bold md:mx-auto lg:mx-auto xl:mx-auto btn mr-2 px-4 py-2 ">
            {page}
          </button>

          <button
            className={`join-item btn btn-outline mr-2 px-4 py-2 rounded-md bg-white ${
              tasks.length < limit ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => handlePageChange(page + 1)}
            disabled={tasks.length < limit}
          >
            Next Page
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskList;
