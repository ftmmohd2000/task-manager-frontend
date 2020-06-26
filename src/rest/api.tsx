import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4000"
  // baseURL: "http://motorwala-task-app-backend.heroku.com"
});
