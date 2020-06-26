import TaskType from "../types/task";
import { TaskActionType } from "../actions/task";

interface TaskStateType {
  tasks: TaskType[];
}

const taskReducerDefaultState = {
  tasks: []
};

export default (
  state: TaskStateType = taskReducerDefaultState,
  action: TaskActionType
) => {
  switch (action.type) {
    case "SET_TASKS":
      return {
        tasks: action.tasks
      };
    case "ADD_TASK":
      return {
        tasks: state.tasks.concat(action.task)
      };
    case "REMOVE_TASK":
      return {
        tasks: state.tasks.filter((task) => task._id !== action.id)
      };
    default:
      return state;
  }
};
