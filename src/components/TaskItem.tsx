import React from "react";
import TaskType from "../types/task";

interface Props {
  task: TaskType;
  handleRemove: (arg0: string) => void;
}

const TaskItem = ({
  handleRemove,
  task: { description, completed, _id }
}: Props) => {
  const removeItem = (e: any) => {
    handleRemove(_id);
  };
  return (
    <div>
      <p>{description}</p>
      <p>Completed: {completed ? "yes" : "no"}</p>
      <button onClick={removeItem}>Remove</button>
    </div>
  );
};

export default TaskItem;
