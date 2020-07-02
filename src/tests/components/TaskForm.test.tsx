import React from "react";
import { shallow } from "enzyme";
import { TaskForm } from "../../components/TaskForm";
import { createBrowserHistory } from "history";

let wrapper: any,
  saveTask: (arg0: string, arg1: boolean) => Promise<void>,
  history: any;

beforeEach(() => {
  history = createBrowserHistory();
  saveTask = jest.fn(() => Promise.resolve());
  wrapper = shallow(
    <TaskForm saveTask={saveTask} history={history} />
  );
});

test("should render TaskForm correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should add task when submitted", () => {
  wrapper.find("input").at(0).value = "newTask";
  wrapper.find("input").at(1).value = true;
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });
  expect(saveTask).toHaveBeenCalled();
});
