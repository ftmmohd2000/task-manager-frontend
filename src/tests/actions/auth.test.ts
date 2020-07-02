import configureMockStore, {
  MockStoreEnhanced
} from "redux-mock-store";
import thunk from "redux-thunk";
import {
  login,
  logout,
  startLogin,
  startLogout,
  startDelete,
  startSignup
} from "../../actions/auth";
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

test("should return login action", () => {
  const action = login(user);
  expect(action).toEqual({ type: "LOGIN", user });
});

test("should return logout action", () => {
  const action = logout();
  expect(action).toEqual({ type: "LOGOUT" });
});

test("should login user", (done) => {
  const password = "newPassword";
  store
    .dispatch(startLogin(user.email, password))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({ type: "LOGIN", user });
      done();
    });
});

test("should logout user", (done) => {
  store.dispatch(startLogout()).then(() => {
    const actions = store.getActions();
    expect(actions[1]).toEqual({ type: "LOGOUT" });
    expect(actions[0]).toEqual({ type: "CLEAR_TASKS" });
    done();
  });
});

test("should add new user", (done) => {
  store
    .dispatch(
      startSignup(
        user.name,
        user.email,
        "newPassword",
        user.age
      )
    )
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "LOGIN",
        user
      });
      done();
    });
});

test("should delete given user", (done) => {
  store.dispatch(startDelete()).then(() => {
    const actions = store.getActions();
    expect(actions[1]).toEqual({ type: "LOGOUT" });
    expect(actions[0]).toEqual({ type: "CLEAR_TASKS" });
    done();
  });
});
