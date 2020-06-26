import React from "react";
import { RouteComponentProps } from "react-router";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { startRemoveTask } from "../actions/task";
import Header from "./Header";
import TaskList from "./TaskList";
import TaskType from "../types/task";

const mapStateToProps = (state: any) => ({
  tasks: state.task.tasks
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AnyAction>) => ({
  removeTask: (id: string) => dispatch(startRemoveTask(id))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = RouteComponentProps &
  PropsFromRedux & {
    tasks: TaskType[];
  };

const TaskDashboardPage = ({ removeTask, history, tasks }: Props) => {
  const handleRemove = (id: string) => {
    removeTask(id);
  };

  return (
    <div>
      <Header history={history} />
      <TaskList tasks={tasks} handleRemove={handleRemove} />
      <Link to="/add">Add Task</Link>
    </div>
  );
};

export default connector(TaskDashboardPage);
