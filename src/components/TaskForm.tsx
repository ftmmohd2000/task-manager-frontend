import { History } from "history";
import React, { useState } from "react";
import TaskType from "../types/task";

interface ITaskFormProps {
  history: History<any>;
  saveTask: (arg0: string, arg1: boolean) => Promise<void>;
  task?: TaskType;
}

export const TaskForm = ({
  history,
  saveTask,
  task
}: ITaskFormProps) => {
  const [description, setDescription] = useState(
    task?.description || ""
  );
  const [completed, setCompleted] = useState(
    task?.completed || false
  );

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    saveTask(description, completed);
    history.push("/dashboard");
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={description}
        onChange={(e: any) =>
          setDescription(e.target.value)
        }
      />
      <input
        type="checkbox"
        checked={completed}
        onChange={(e: any) => setCompleted(!completed)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
