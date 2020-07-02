import React from "react";
import TaskForm from "./TaskForm";
import { RouteComponentProps } from "react-router";
import { ConnectedProps, connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { startAddTask } from "../actions/task";

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => ({
  addTask: (description: string, completed: boolean) =>
    dispatch(startAddTask(description, completed))
});

const connector = connect(undefined, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type IAddTaskPageProps = RouteComponentProps &
  PropsFromRedux;

export const AddTaskPage = ({
  history,
  addTask
}: IAddTaskPageProps) => {
  return (
    <div>
      <TaskForm history={history} saveTask={addTask} />
    </div>
  );
};

export default connector(AddTaskPage);
