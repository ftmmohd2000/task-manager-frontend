import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { startLogin } from "../actions/auth";
import { startSetTasks } from "../actions/task";

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AnyAction>) => ({
  setTasks: () => dispatch(startSetTasks()),
  login: (email: string, password: string) =>
    dispatch(startLogin(email, password))
});

const connector = connect(undefined, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & RouteComponentProps;

const LoginPage = ({ history, setTasks, login }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const tryLogin = (e: any) => {
    e.preventDefault();
    login(email, password)
      .then(() => {
        setTasks();
        history.push("/dashboard");
      })
      .catch(() => {
        setError("Invalid Credentials");
      });
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={tryLogin}>
        <label>email:</label>
        <input
          type="text"
          value={email}
          onChange={(e: any) => {
            setEmail(e.target.value);
          }}
        />
        <label>password:</label>
        <input
          type="password"
          value={password}
          onChange={(e: any) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
      <Link to="/signup">Signup</Link>
    </div>
  );
};

export default connector(LoginPage);
