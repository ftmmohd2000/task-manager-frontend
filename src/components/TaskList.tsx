import React from "react";
import TaskItem from "./TaskItem";
import TaskType from "../types/task";

interface ITaskListProps {
  tasks: TaskType[];
  handleRemove: (id: string) => void;
}

export const TaskList = ({
  tasks,
  handleRemove
}: ITaskListProps) => {
  return (
    <div>
      {tasks.map((task: TaskType) => (
        <TaskItem
          key={task._id}
          task={task}
          handleRemove={handleRemove}
        />
      ))}
    </div>
  );
};

export default TaskList;
