import React from "react";
import { shallow } from "enzyme";
import { TaskItem } from "../../components/TaskItem";
import { tasks } from "../fixtures/task";

let wrapper: any, handleRemove: (argo: string) => void;

beforeEach(() => {
  handleRemove = jest.fn();
  wrapper = shallow(
    <TaskItem task={tasks[2]} handleRemove={handleRemove} />
  );
});

test("should render TaskItem correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should remove item on button click", () => {
  wrapper.find("button").simulate("click");
  expect(handleRemove).toHaveBeenCalled();
});
