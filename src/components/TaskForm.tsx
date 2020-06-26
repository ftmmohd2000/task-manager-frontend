import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { startAddTask } from "../actions/task";
import { History } from "history";

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AnyAction>) => ({
  addTask: (arg0: string, arg1: boolean) => dispatch(startAddTask(arg0, arg1))
});

const connector = connect(undefined, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  history: History<any>;
};

const TaskForm = ({ history, addTask }: Props) => {
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    addTask(description, completed);
    history.push("/dashboard");
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={description}
        onChange={(e: any) => setDescription(e.target.value)}
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

export default connector(TaskForm);
