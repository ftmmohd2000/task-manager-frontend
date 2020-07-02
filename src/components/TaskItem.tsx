import React from "react";
import TaskType from "../types/task";
import { Link } from "react-router-dom";

interface ITaskItemProps {
  task: TaskType;
  handleRemove: (arg0: string) => void;
}

export const TaskItem = ({
  handleRemove,
  task: { description, completed, _id }
}: ITaskItemProps) => {
  const removeItem = (e: any) => {
    handleRemove(_id);
  };
  return (
    <div>
      <p>{description}</p>
      <p>Completed: {completed ? "yes" : "no"}</p>
      <button onClick={removeItem}>Remove</button>
      <Link to={`/edit/${_id}`}>Edit</Link>
    </div>
  );
};

export default TaskItem;
