import client from "../rest/api";
import UserType from "../types/user";
import { clearTasks } from "./task";

export interface InitAction {
  type: "@@INIT";
}
export interface LoginAction {
  type: "LOGIN";
  user: UserType;
}

export interface LogoutAction {
  type: "LOGOUT";
}

export const startLogin = (
  email: string,
  password: string
) => {
  return (dispatch: any, getState: any) => {
    return client
      .post("/users/login", { email, password })
      .then((res) => {
        dispatch(
          login({ ...res.data.user, token: res.data.token })
        );
      })
      .catch();
  };
};

export const startLogout = () => {
  return (dispatch: any, getState: any) => {
    return client
      .post(
        "/users/logout",
        {},
        {
          headers: {
            Authorization:
              "Bearer " + getState().auth.user.token
          }
        }
      )
      .then(() => {
        dispatch(clearTasks());
        dispatch(logout());
      })
      .catch();
  };
};

export const startSignup = (
  name: string,
  email: string,
  password: string,
  age: number = 0
) => {
  return (dispatch: any, getState: any) => {
    return client
      .post("/users", { name, email, password, age })
      .then((res) => {
        dispatch(
          login({ ...res.data.user, token: res.data.token })
        );
      })
      .catch();
  };
};

export const startDelete = () => {
  return (dispatch: any, getState: any) => {
    return client
      .delete("/users/me", {
        headers: {
          Authorization:
            "Bearer " + getState().auth.user.token
        }
      })
      .then(() => {
        dispatch(clearTasks());
        dispatch(logout());
      })
      .catch();
  };
};

export const login = (user: UserType): LoginAction => {
  return {
    type: "LOGIN",
    user
  };
};

export const logout = (): LogoutAction => {
  return {
    type: "LOGOUT"
  };
};

export type AuthActionType =
  | LoginAction
  | LogoutAction
  | InitAction;
