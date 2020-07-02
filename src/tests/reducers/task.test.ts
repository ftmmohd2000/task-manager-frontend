import taskReducer, {
  tasksDefaultState
} from "../../reducers/task";
import {
  InitAction,
  SetTasksAction,
  AddTaskAction,
  RemoveTaskAction,
  ClearTasksAction
} from "../../actions/task";
import { tasks } from "../fixtures/task";

test("should set up default state", () => {
  const action: InitAction = { type: "@@INIT" };
  const state = taskReducer(undefined, action);
  expect(state).toEqual(tasksDefaultState);
});

test("should set tasks", () => {
  const action: SetTasksAction = {
    type: "SET_TASKS",
    tasks
  };
  const state = taskReducer(tasksDefaultState, action);
  expect(state).toEqual({
    tasks
  });
});

test("should add new task", () => {
  const action: AddTaskAction = {
    type: "ADD_TASK",
    task: tasks[0]
  };
  const state = taskReducer(tasksDefaultState, action);
  expect(state).toEqual({
    tasks: [tasks[0]]
  });
});

test("should remove a given task", () => {
  const action: RemoveTaskAction = {
    type: "REMOVE_TASK",
    id: tasks[1]._id
  };
  const state = taskReducer({ tasks }, action);
  expect(state).toEqual({
    tasks: [tasks[0], tasks[2]]
  });
});

test("should clear all tasks", () => {
  const action: ClearTasksAction = {
    type: "CLEAR_TASKS"
  };
  const state = taskReducer({ tasks }, action);
  expect(state).toEqual({
    tasks: []
  });
});
