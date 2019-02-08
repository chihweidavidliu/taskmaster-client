import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

import Root from "../../Root";
import Dashboard from "../Dashboard";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import TodoContainer from "../TodoContainer";
import FormInput from "../FormInput";
import TodoList from "../TodoList";

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root initialState={{}}>
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it("should render a Navbar component", () => {
  expect(wrapped.find(Navbar).length).toEqual(1);
});

it("should render a Sidebar component", () => {
  expect(wrapped.find(Sidebar).length).toEqual(1);
});

it("should render a TodoContainer component", () => {
  expect(wrapped.find(TodoContainer).length).toEqual(1);
});

it("should render a FormInput component", () => {
  expect(wrapped.find(FormInput).length).toEqual(1);
});

it("should render a TodoList component", () => {
  expect(wrapped.find(TodoList).length).toEqual(1);
});
