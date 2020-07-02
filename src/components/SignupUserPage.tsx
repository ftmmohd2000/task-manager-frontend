import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import { startSignup } from "../actions/auth";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

interface ISignupUserPageProps extends RouteComponentProps {
  signup: (
    arg0: string,
    arg1: string,
    arg2: string,
    arg3: number
  ) => Promise<any>;
}
export const SignupUserPage = (
  props: ISignupUserPageProps
) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [age, setAge] = useState(0);

  const tryLogin = (e: any) => {
    e.preventDefault();
    props
      .signup(name, email, password, age)
      .then(() => {
        props.history.push("/dashboard");
      })
      .catch(() => {
        setError("Invalid Credentials");
      });
  };

  return (
    <div>
      <h1>Signup Page</h1>
      <form onSubmit={tryLogin}>
        <p>email: </p>
        <input
          type="text"
          value={email}
          onChange={(e: any) => {
            setEmail(e.target.value);
          }}
        />
        <p>password: </p>
        <input
          type="password"
          value={password}
          onChange={(e: any) => {
            setPassword(e.target.value);
          }}
        />
        <p>name: </p>
        <input
          type="text"
          value={name}
          onChange={(e: any) => {
            setName(e.target.value);
          }}
        />
        <p>age: </p>
        <input
          type="number"
          value={age}
          onChange={(e: any) => {
            setAge(e.target.value);
          }}
        />
        <button>SignUp</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => ({
  signup: (
    name: string,
    email: string,
    password: string,
    age: number = 0
  ) => dispatch(startSignup(name, email, password, age))
});
export default connect(
  undefined,
  mapDispatchToProps
)(SignupUserPage);
