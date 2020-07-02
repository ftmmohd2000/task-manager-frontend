import authReducer, {
  authDefaultState
} from "../../reducers/auth";
import {
  LoginAction,
  InitAction,
  LogoutAction
} from "../../actions/auth";
import { user } from "../fixtures/user";

test("should set default state", () => {
  const action: InitAction = { type: "@@INIT" };
  const state = authReducer(undefined, action);
  expect(state).toEqual(authDefaultState);
});

test("should login user", () => {
  const action: LoginAction = { type: "LOGIN", user };
  const state = authReducer(authDefaultState, action);
  expect(state).toEqual({
    user
  });
});

test("should logout user", () => {
  const action: LogoutAction = { type: "LOGOUT" };
  const state = authReducer({ user }, action);
  expect(state).toEqual(authDefaultState);
});
