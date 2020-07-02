import { tasks } from "../../tests/fixtures/task";
import { user } from "../../tests/fixtures/user";

export const _get = jest.fn(
  (
    path: string,
    {
      headers: { Authorization: token }
    }: { headers: { Authorization: string } }
  ) => {
    return new Promise((resolve, reject) => {
      if (token === "Bearer " + user.token) {
        resolve({ data: tasks });
      } else {
        reject("401 Unauthorized");
      }
    });
  }
);

export const _post = jest.fn(
  (path: string, data: any, config: any) => {
    return new Promise((resolve, reject) => {
      if (
        config &&
        config.headers.Authorization ===
          "Bearer " + user.token
      ) {
        switch (path) {
          case "/tasks":
            resolve({
              data: {
                description: data.description,
                completed: data.completed,
                _id: "newId"
              }
            });
            break;
          case "/users/logout":
            resolve();
            break;
          default:
            break;
        }
      } else {
        switch (path) {
          case "/users":
            resolve({
              data: { user, token: user.token },
              token: "newToken"
            });
            break;
          case "/users/login":
            resolve({ data: { user, token: user.token } });
            break;
          default:
            reject("401 unauthorized");
        }
      }
    });
  }
);

export const _delete = jest.fn(
  (path: string, config: any) => {
    return new Promise((resolve, reject) => {
      if (
        config &&
        config.headers.Authorization ===
          "Bearer " + user.token
      ) {
        switch (path) {
          case "/users/me":
            resolve();
            break;
          case "/tasks/" + tasks[1]._id:
            resolve({ data: { _id: tasks[1]._id } });
            break;
        }
      } else {
        reject("401 Unauthorized");
      }
    });
  }
);

export default {
  get: _get,
  post: _post,
  delete: _delete
};
