import UserType from "../types/user";
import { AuthActionType } from "../actions/auth";

interface AuthStateType {
  user: UserType | null;
  token: string;
}

const authDefaultState = {
  user: null,
  token: ""
};

export default (
  state: AuthStateType = authDefaultState,
  action: AuthActionType
) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.user,
        token: action.token
      };
    case "LOGOUT":
      return {
        user: null,
        token: ""
      };
    default:
      return state;
  }
};
