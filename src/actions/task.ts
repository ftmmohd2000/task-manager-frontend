import TaskType from "../types/task";
import client from "../rest/api";

export interface SetTasksAction {
  type: "SET_TASKS";
  tasks: TaskType[];
}

export interface AddTaskAction {
  type: "ADD_TASK";
  task: TaskType;
}

export interface RemoveTaskAction {
  type: "REMOVE_TASK";
  id: string;
}

export const startSetTasks = () => {
  return (dispatch: any, getState: any) => {
    client
      .get("/tasks", {
        headers: { Authorization: "Bearer " + getState().auth.token }
      })
      .then((res) => {
        dispatch(setTasks(res.data));
      })
      .catch(() => {});
  };
};

export const startAddTask = (description: string, completed: boolean) => {
  return (dispatch: any, getState: any) => {
    client
      .post(
        "/tasks",
        { description, completed },
        {
          headers: { Authorization: "Bearer " + getState().auth.token }
        }
      )
      .then(({ data: { description, completed, _id } }: { data: TaskType }) => {
        dispatch(
          addTask({
            description,
            completed,
            _id
          })
        );
      })
      .catch();
  };
};

export const startRemoveTask = (id: string) => {
  return (dispatch: any, getState: any) => {
    client
      .delete(`/tasks/${id}`, {
        headers: { Authorization: "Bearer " + getState().auth.token }
      })
      .then((res) => {
        dispatch(removeTask(res.data._id));
      })
      .catch();
  };
};

const setTasks = (tasks: TaskType[]): SetTasksAction => ({
  type: "SET_TASKS",
  tasks
});

const addTask = (task: TaskType): AddTaskAction => ({
  type: "ADD_TASK",
  task
});

const removeTask = (id: string): RemoveTaskAction => ({
  type: "REMOVE_TASK",
  id
});

export type TaskActionType = SetTasksAction | AddTaskAction | RemoveTaskAction;
