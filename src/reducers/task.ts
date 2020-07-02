import TaskType from "../types/task";
import { TaskActionType } from "../actions/task";

export interface TaskStateType {
  tasks: TaskType[];
}

export const tasksDefaultState = {
  tasks: []
};

export default (
  state: TaskStateType = tasksDefaultState,
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
        tasks: state.tasks.filter(
          (task) => task._id !== action.id
        )
      };
    case "CLEAR_TASKS":
      return {
        tasks: []
      };
    case "EDIT_TASK":
      return {
        tasks: state.tasks.map((task) => {
          if (task._id === action.id)
            return {
              ...task,
              ...action.updates
            };
          else return task;
        })
      };
    default:
      return state;
  }
};
