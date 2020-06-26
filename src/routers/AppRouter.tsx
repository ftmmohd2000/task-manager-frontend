import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import LoginPage from "../components/LoginPage";
import TaskDashboardPage from "../components/TaskDashboardPage";
import SignupUserPage from "../components/SignupUserPage";
import AddTaskPage from "../components/AddTaskPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

interface Props {}

const AppRouter = (props: Props) => {
  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/" component={LoginPage} />
        <PrivateRoute exact path="/dashboard" component={TaskDashboardPage} />
        <PublicRoute exact path="/signup" component={SignupUserPage} />
        <PrivateRoute exact path="/add" component={AddTaskPage} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
