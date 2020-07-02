import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}: any) => (
  <Route
    {...rest}
    component={(props: any) =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const mapStateToProps = (state: any) => ({
  isAuthenticated: !!state.auth.user.token
});

export default connect(mapStateToProps)(PrivateRoute);
