import React from "react";
import { shallow } from "enzyme";
import { AddTaskPage } from "../../components/AddTaskPage";

let wrapper: any,
  addTask: (arg0: string, arg1: boolean) => Promise<void>;

beforeEach(() => {
  const routeComponentPropsMock = {
    history: { push: jest.fn() } as any,
    match: {} as any,
    location: {} as any
  };
  wrapper = shallow(
    <AddTaskPage
      addTask={addTask}
      {...routeComponentPropsMock}
    />
  );
});

test("should render AddTaskPage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});
