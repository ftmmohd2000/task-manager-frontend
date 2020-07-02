import React from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  Redirect,
  RouteComponentProps
} from "react-router";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { startEditTask } from "../actions/task";
import { ReduxStateType } from "../store/configureStore";
import TaskType from "../types/task";
import TaskForm from "./TaskForm";

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => ({
  editTask: (id: string, updates: Partial<TaskType>) =>
    dispatch(startEditTask(id, updates))
});

const mapStateToProps = (
  state: ReduxStateType,
  props: RouteComponentProps<{ id: string }>
) => ({
  task: state.task.tasks.find(
    (task) => task._id === props.match.params.id
  ),
  id: props.match.params.id
});

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

type PropsFromRedux = ConnectedProps<typeof connector>;

type IEditTaskPageProps = RouteComponentProps<{
  id: string;
}> &
  PropsFromRedux;

export const EditTaskPage = ({
  task,
  history,
  id,
  editTask
}: IEditTaskPageProps) => {
  const startEditTask = (
    description: string,
    completed: boolean
  ) => {
    return editTask(id, {
      description,
      completed
    });
  };

  return task ? (
    <div>
      <TaskForm
        history={history}
        task={task}
        saveTask={startEditTask}
      />
    </div>
  ) : (
    <Redirect to="/dashboard" />
  );
};

export default connector(EditTaskPage);
