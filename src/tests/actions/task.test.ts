import configureMockStore, {
  MockStoreEnhanced
} from "redux-mock-store";
import thunk from "redux-thunk";
import {
  setTasks,
  addTask,
  removeTask,
  clearTasks,
  startAddTask,
  startRemoveTask,
  startSetTasks
} from "../../actions/task";
import { TaskStateType } from "../../reducers/task";
import { AuthStateType } from "../../reducers/auth";
import { tasks } from "../fixtures/task";
import { user } from "../fixtures/user";

jest.mock("../../rest/api");
let store: MockStoreEnhanced<any, any>;
const createMockStore = configureMockStore<any, any>([
  thunk
]);
const defaultState: {
  auth: AuthStateType;
  task: TaskStateType;
} = {
  auth: {
    user: user
  },
  task: {
    tasks
  }
};

beforeEach(() => {
  store = createMockStore(defaultState);
});

test("should return addTask action", () => {
  const task = tasks[0];
  const action = addTask(task);
  expect(action).toEqual({ type: "ADD_TASK", task });
});

test("should return setTasks action", () => {
  const action = setTasks(tasks);
  expect(action).toEqual({ type: "SET_TASKS", tasks });
});

test("should return removeTask action", () => {
  const id = tasks[0]._id;
  const action = removeTask(id);
  expect(action).toEqual({ type: "REMOVE_TASK", id });
});

test("should return clearTasks action", () => {
  const action = clearTasks();
  expect(action).toEqual({ type: "CLEAR_TASKS" });
});

test("should fetch task data from server", (done) => {
  store.dispatch(startSetTasks()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_TASKS",
      tasks
    });
    done();
  });
});

test("should add new task to server", (done) => {
  store
    .dispatch(
      startAddTask(tasks[1].description, tasks[1].completed)
    )
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_TASK",
        task: {
          description: tasks[1].description,
          completed: tasks[1].completed,
          _id: "newId"
        }
      });
      done();
    });
});

test("should remove task from server", (done) => {
  store.dispatch(startRemoveTask(tasks[1]._id)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "REMOVE_TASK",
      id: tasks[1]._id
    });
    done();
  });
});
