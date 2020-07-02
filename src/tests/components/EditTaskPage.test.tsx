import { shallow } from "enzyme";
import React from "react";
import { EditTaskPage } from "../../components/EditTaskPage";
import { tasks } from "../fixtures/task";

let wrapper: any;

beforeEach(() => {
  const routeComponentPropsMock = {
    history: { push: jest.fn() } as any,
    match: { params: { id: tasks[0]._id } } as any,
    location: {} as any
  };
  wrapper = shallow(
    <EditTaskPage
      {...routeComponentPropsMock}
      task={tasks[0]}
      id={tasks[0]._id}
      editTask={jest.fn()}
    />,
    {
      context: {
        match: { params: { id: tasks[0]._id } }
      }
    }
  );
});

test("should render EditTaskPage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});
