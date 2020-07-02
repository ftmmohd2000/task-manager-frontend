import React from "react";
import { shallow } from "enzyme";
import { TaskDashboardPage } from "../../components/TaskDashboardPage";
import { tasks } from "../fixtures/task";

let wrapper: any,
  removeTask: (argo: string) => Promise<void>;

beforeEach(() => {
  const routeComponentPropsMock = {
    history: { push: jest.fn() } as any,
    match: {} as any,
    location: {} as any
  };
  removeTask = jest.fn(() => Promise.resolve());
  wrapper = shallow(
    <TaskDashboardPage
      {...routeComponentPropsMock}
      removeTask={removeTask}
      tasks={tasks}
    />
  );
});

test("should render TaskDashboardPage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});
