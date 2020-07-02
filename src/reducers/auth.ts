import UserType from "../types/user";
import { AuthActionType } from "../actions/auth";

export interface AuthStateType {
  user: UserType;
}

export const authDefaultState = {
  user: {
    name: "",
    age: 0,
    email: "",
    password: "",
    id: "",
    token: ""
  }
};

export default (
  state: AuthStateType = authDefaultState,
  action: AuthActionType
) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.user
      };
    case "LOGOUT":
      return authDefaultState;
    default:
      return state;
  }
};
