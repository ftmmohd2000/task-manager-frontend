import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from "redux";
import thunk from "redux-thunk";
import authReducer, {
  AuthStateType
} from "../reducers/auth";
import taskReducer, {
  TaskStateType
} from "../reducers/task";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export interface ReduxStateType {
  auth: AuthStateType;
  task: TaskStateType;
}

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function () {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      task: taskReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
}
