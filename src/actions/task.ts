import TaskType from "../types/task";
import client from "../rest/api";

export interface InitAction {
  type: "@@INIT";
}

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

export interface EditTaskAction {
  type: "EDIT_TASK";
  id: string;
  updates: Partial<TaskType>;
}

export interface ClearTasksAction {
  type: "CLEAR_TASKS";
}

export const startSetTasks = () => {
  return (dispatch: any, getState: any) => {
    return client
      .get("/tasks", {
        headers: {
          Authorization:
            "Bearer " + getState().auth.user.token
        }
      })
      .then((res) => {
        dispatch(setTasks(res.data));
      })
      .catch(() => {});
  };
};

export const startAddTask = (
  description: string,
  completed: boolean
) => {
  return (dispatch: any, getState: any) => {
    return client
      .post(
        "/tasks",
        { description, completed },
        {
          headers: {
            Authorization:
              "Bearer " + getState().auth.user.token
          }
        }
      )
      .then(
        ({
          data: { description, completed, _id }
        }: {
          data: TaskType;
        }) => {
          dispatch(
            addTask({
              description,
              completed,
              _id
            })
          );
        }
      )
      .catch();
  };
};

export const startRemoveTask = (id: string) => {
  return (dispatch: any, getState: any) => {
    return client
      .delete(`/tasks/${id}`, {
        headers: {
          Authorization:
            "Bearer " + getState().auth.user.token
        }
      })
      .then((res) => {
        dispatch(removeTask(res.data._id));
      })
      .catch();
  };
};

export const startEditTask = (
  id: string,
  updates: Partial<TaskType>
) => {
  return (dispatch: any, getState: any) => {
    return client
      .patch(`/tasks/${id}`, updates, {
        headers: {
          Authorization:
            "Bearer " + getState().auth.user.token
        }
      })
      .then(() => dispatch(editTask(id, updates)))
      .catch();
  };
};

export const setTasks = (
  tasks: TaskType[]
): SetTasksAction => ({
  type: "SET_TASKS",
  tasks
});

export const addTask = (task: TaskType): AddTaskAction => ({
  type: "ADD_TASK",
  task
});

export const removeTask = (
  id: string
): RemoveTaskAction => ({
  type: "REMOVE_TASK",
  id
});

export const clearTasks = (): ClearTasksAction => ({
  type: "CLEAR_TASKS"
});

export const editTask = (
  id: string,
  updates: Partial<TaskType>
): EditTaskAction => ({
  type: "EDIT_TASK",
  id,
  updates
});

export type TaskActionType =
  | SetTasksAction
  | AddTaskAction
  | RemoveTaskAction
  | ClearTasksAction
  | InitAction
  | EditTaskAction;
