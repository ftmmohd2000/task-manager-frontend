import React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { startLogout } from "../actions/auth";
import { History } from "history";

interface Props {
  logout: () => Promise<any>;
  history: History<any>;
}

const Header = ({ logout, history }: Props) => {
  const tryLogout = () => {
    logout();
    history.push("/");
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <button onClick={tryLogout}>Logout</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AnyAction>) => ({
  logout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
