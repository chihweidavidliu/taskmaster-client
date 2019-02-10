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
import Todo from "../Todo";

let wrapped;

beforeEach(() => {
  const initialState = {
    auth: {
      _id: "5c5c6a960a759e145f1e24b5",
      projects: ["Inbox"]
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

it("should render todos of current category", () => {
  expect(wrapped.find(Todo).length).toEqual(1);
});
