import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}: any) => (
  <Route
    {...rest}
    component={(props: any) =>
      isAuthenticated ? (
        <Redirect to="/dashboard" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = (state: any) => ({
  isAuthenticated: !!state.auth.user.token
});

export default connect(mapStateToProps)(PublicRoute);
