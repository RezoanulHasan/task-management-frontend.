import Swal from "sweetalert2";
import {
  Tasks,
  useDeleteTaskByIdMutation,
  useUpdateTaskByIdMutation,
} from "../../../Redux/features/tasks/taskApi";

export const useTaskHelpers = () => {
  const [deleteTaskById] = useDeleteTaskByIdMutation();
  const [updateTaskById] = useUpdateTaskByIdMutation();

  const handleDeleteTask = async (id: string, refetch: () => void) => {
    try {
      await deleteTaskById(id).unwrap();
      await refetch();
      Swal.fire({
        icon: "success",
        title: "Task Deleted!",
        text: "The task has been successfully deleted.",
        timer: 1500, // Auto close alert after 1.5 seconds
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete task. Please try again later.",
      });
    }
  };

  const handleUpdateTask = async (
    id: string,
    updatedTask: Partial<Tasks>,
    refetch: () => void
  ) => {
    try {
      await updateTaskById({ id, task: updatedTask }).unwrap();
      await refetch();
      Swal.fire({
        icon: "success",
        title: "Task Updated!",
        text: "The task has been successfully updated.",
        timer: 1500, // Auto close alert after 1.5 seconds
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error updating task:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update task. Please try again later.",
      });
    }
  };

  return {
    handleDeleteTask,
    handleUpdateTask,
  };
};
