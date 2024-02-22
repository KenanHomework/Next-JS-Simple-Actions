"use client";
import Task from "@/types/task";
import TaskItem from "./TaskItem";
import { createUserTask, deleteTaskById } from "@/actions/home";
import { useFormState } from "react-dom";
import PlusIcon from "@/icons/plusIcon";
import AlertView from "@/app/components/Alert";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const initialState = {
  error: false,
  message: "",
};

export default function Tasks({ tasks }: { tasks: Task[] }) {
  const [animationParent] = useAutoAnimate();
  const createTaskByUser = createUserTask.bind(null, "Kanan");
  let innerTasks = tasks;

  // @ts-ignore
  const [state, stateAction] = useFormState(createUserTask, initialState);

  const handleRemove = async (taskId: string) => {
    await deleteTaskById(taskId);
    const indexToDelete = innerTasks.findIndex((task) => task._id === taskId);
    if (indexToDelete !== -1) {
      innerTasks.splice(indexToDelete, 1);
    }
  };
  return (
    <main className={"p-10 flex flex-col gap-4 justify-center"}>
      <form
        action={stateAction}
        method="POST"
        className={"w-full flex items-center gap-5"}
      >
        <div className={"flex gap-2"}>
          <label
            htmlFor="email"
            className="input input-bordered flex items-center gap-2"
          >
            Task
            <input
              type="text"
              className="grow"
              placeholder="Enter Task here"
              id="email"
              name="task"
              required
            />
          </label>
          <label
            htmlFor="command"
            className="input input-bordered flex items-center gap-2"
          >
            Command
            <input
              type="text"
              className="grow"
              placeholder="Enter Command here"
              id="command"
              name="command"
              required
            />
          </label>
        </div>

        <button type="submit" className={"btn btn-primary"}>
          <PlusIcon />
          Add task
        </button>
      </form>

      {state?.error && <AlertView message={state.message} />}

      <div className={"w-full flex flex-col gap-2"} ref={animationParent}>
        {innerTasks?.map((el) => (
          <TaskItem task={el} handleRemove={handleRemove} />
        ))}
      </div>
    </main>
  );
}
