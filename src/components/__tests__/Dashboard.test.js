import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

import Root from "Root";
import Dashboard from "components/Dashboard/Dashboard";
import Navbar from "components/Dashboard/Navbar";
import Sidebar from "components/Dashboard/Sidebar/Sidebar";
import TodoContainer from "components/Dashboard/TodoList/TodoContainer";
import FormInput from "components/Dashboard/TodoList/FormInput";
import TodoList from "components/Dashboard/TodoList/TodoList";
import Todo from "components/Dashboard/TodoList/Todo";

let wrapped;

beforeEach(() => {
  const initialState = {
    auth: {
      _id: "5c5c6a960a759e145f1e24b5",
      projects: []
    },
    todos: [
      {
        _id: "5c5c6fc4c5467114da5d2e19",
        text: "Hello",
        _creator: "5c5c6a960a759e145f1e24b5",
        indexInList: 0,
        project: "Inbox"
      }
    ],
    currentProject: { _id: "Inbox", name: "Inbox", color: "teal", image: "background6" }
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
