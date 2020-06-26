import React from "react";
import UserType from "../types/task";
import TaskItem from "./TaskItem";
import TaskType from "../types/task";

interface Props {
  tasks: UserType[];
  handleRemove: (id: string) => void;
}

const TaskList = ({ tasks, handleRemove }: Props) => {
  return (
    <div>
      {tasks.map((task: TaskType) => (
        <TaskItem key={task._id} task={task} handleRemove={handleRemove} />
      ))}
    </div>
  );
};

export default TaskList;
