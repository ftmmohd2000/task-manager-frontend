import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { startDelete, startLogout } from "../actions/auth";

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => ({
  logout: () => dispatch(startLogout()),
  deleteUser: () => dispatch(startDelete())
});

const connector = connect(undefined, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type IHeaderProps = PropsFromRedux & {
  history: {
    push: (arg0: string) => void;
  };
};

export const Header = ({
  logout,
  deleteUser,
  history
}: IHeaderProps) => {
  const tryLogout = () => {
    logout();
    history.push("/");
  };

  const tryDeleteUser = () => {
    deleteUser();
    history.push("/");
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <button id="logout" onClick={tryLogout}>
        Logout
      </button>
      <button id="deleteUser" onClick={tryDeleteUser}>
        Delete Account
      </button>
    </div>
  );
};

export default connector(Header);
