import React from "react";
import { shallow } from "enzyme";
import { Header } from "../../components/Header";

let wrapper: any,
  logout: () => Promise<void>,
  history: { push: jest.Mock<any, any> },
  deleteUser: () => Promise<void>;

beforeEach(() => {
  logout = jest.fn();
  history = {
    push: jest.fn()
  };
  deleteUser = jest.fn();
  wrapper = shallow(
    <Header history={history} logout={logout} deleteUser={deleteUser} />
  );
});

test("should render header correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should call logout on button click", () => {
  wrapper.find("button").at(0).simulate("click");
  expect(logout).toHaveBeenCalled();
});

test("should call deleteUser on button click", () => {
  wrapper.find("button").at(1).simulate("click");
  expect(deleteUser).toHaveBeenCalled();
});
