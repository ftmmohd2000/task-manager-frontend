import React from "react";
import { shallow } from "enzyme";
import { SignupUserPage } from "../../components/SignupUserPage";

let wrapper: any,
  signup: (
    arg0: string,
    arg1: string,
    arg2: string,
    arg3: number
  ) => Promise<any>;

beforeEach(() => {
  const routeComponentPropsMock = {
    history: { push: jest.fn() } as any,
    match: {} as any,
    location: {} as any
  };
  signup = jest.fn(() => Promise.resolve());
  wrapper = shallow(
    <SignupUserPage
      signup={signup}
      {...routeComponentPropsMock}
    />
  );
});

test("should render SignupUserPage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should add new user", () => {
  wrapper.find("input").at(0).value = "testText";
  wrapper.find("input").at(1).value = "testText";
  wrapper.find("input").at(2).value = "testText";
  wrapper.find("input").at(3).value = 20;
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });
  expect(signup).toHaveBeenCalled();
});
