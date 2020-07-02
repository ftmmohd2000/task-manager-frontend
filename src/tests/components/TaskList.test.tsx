import { shallow } from "enzyme";
import React from "react";
import { TaskList } from "../../components/TaskList";
import { tasks } from "../fixtures/task";

let wrapper: any, handleRemove: (argo: string) => void;

beforeEach(() => {
  handleRemove = jest.fn(() => Promise.resolve());
  wrapper = shallow(
    <TaskList handleRemove={handleRemove} tasks={tasks} />
  );
});

test("should render TaskList correctly", () => {
  expect(wrapper).toMatchSnapshot();
});
