import React from "react";
import { shallow } from "enzyme";
import { LoginPage } from "../../components/LoginPage";

let wrapper: any,
  setTasks: () => Promise<void>,
  login: (arg0: string, arg1: string) => Promise<void>;

beforeEach(() => {
  const routeComponentPropsMock = {
    history: { push: jest.fn() } as any,
    match: {} as any,
    location: {} as any
  };
  login = jest.fn(() => Promise.resolve());
  setTasks = jest.fn();
  wrapper = shallow(
    <LoginPage
      setTasks={setTasks}
      login={login}
      {...routeComponentPropsMock}
    />
  );
});

test("should render LoginPage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should run login function when button is clicked", () => {
  wrapper.find("input").at(0).value = "someEmail";
  wrapper.find("input").at(1).value = "somePassword";
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });
  expect(login).toHaveBeenCalled();
});
