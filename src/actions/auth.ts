import client from "../rest/api";
import UserType from "../types/user";

interface LoginAction {
  type: "LOGIN";
  user: UserType;
  token: string;
}

interface LogoutAction {
  type: "LOGOUT";
}

export const startLogin = (email: string, password: string) => {
  return (dispatch: any, getState: any) => {
    return client
      .post("/users/login", { email, password })
      .then((res) => {
        dispatch(login(res.data.user, res.data.token));
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
        { headers: { Authorization: "Bearer " + getState().auth.token } }
      )
      .then(() => {
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
        dispatch(login(res.data.user, res.data.token));
      })
      .catch();
  };
};

const login = (user: UserType, token: string): LoginAction => {
  return {
    type: "LOGIN",
    user,
    token
  };
};

const logout = (): LogoutAction => {
  return {
    type: "LOGOUT"
  };
};

export type AuthActionType = LoginAction | LogoutAction;
