import React from "react";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";

import Root from "../../Root";
import Dashboard from "../Dashboard";
import Sidebar from "../Sidebar";
import TodoContainer from "../TodoContainer";
import FormInput from "../FormInput";
import TodoList from "../TodoList";
import Todo from "../Todo";

let wrapped;
beforeEach(() => {
  const initialState = {
    auth: {
      _id: "5c5c6a960a759e145f1e24b5",
      projects: ["Misc"]
    },
    todos: [
      {
        _id: "5c5c6fc4c5467114da5d2e19",
        text: "Hello",
        _creator: "5c5c6a960a759e145f1e24b5",
        indexInList: 0,
        category: "Inbox"
      }
    ],
    category: "Inbox"
  };

  wrapped = mount(
    <Root initialState={initialState}>
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it("should display todos in state", () => {
  expect(wrapped.find(Todo).length).toEqual(1);
});

it("should display a Sidebar", () => {
  expect(wrapped.find(Sidebar).length).toEqual(1);
});

it("should display a TodoContainer", () => {
  expect(wrapped.find(TodoContainer).length).toEqual(1);
});

it("should display a FormInput", () => {
  expect(wrapped.find(FormInput).length).toEqual(1);
});

it("should display a TodoList", () => {
  expect(wrapped.find(TodoList).length).toEqual(1);
});
