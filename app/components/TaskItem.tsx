"use client";
import Task from "@/types/task";
import TrashIcon from "@/icons/trashIcon";
import { deleteTaskById } from "@/actions/home";

interface TaskProp {
  task: Task;
  handleRemove: (taskId: string) => void;
}
// @ts-ignore
export default function TaskItem({ task, handleRemove }: TaskProp) {
  return (
    <div
      key={task._id}
      className={
        "w-full bg-[#f2f2f2] rounded p-2 flex items-start justify-between"
      }
    >
      <div className={"flex flex-col gap-1"}>
        <p className={"font-semibold text-md"}>
          TaskID: <span className={"font-semibold text-base"}>{task._id}</span>
        </p>
        <p className={"font-semibold text-md"}>
          Task: <span className={"font-semibold text-base"}>{task.task}</span>
        </p>
        <p className={"font-semibold text-md"}>
          Command:{" "}
          <code className={"font-semibold text-base"}>{task.command}</code>
        </p>
      </div>

      <button
        className="btn btn-error text-whites"
        onClick={() => {
          handleRemove(task._id);
        }}
      >
        <TrashIcon />
        Delete
      </button>
    </div>
  );
}
