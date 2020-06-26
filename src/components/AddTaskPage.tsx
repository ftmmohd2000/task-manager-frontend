import React from "react";
import TaskForm from "./TaskForm";
import { RouteComponentProps } from "react-router";

interface Props extends RouteComponentProps {}

const AddTaskPage = ({ history }: Props) => {
  return (
    <div>
      <TaskForm history={history} />
    </div>
  );
};

export default AddTaskPage;
