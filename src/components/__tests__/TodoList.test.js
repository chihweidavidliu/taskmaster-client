import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

import Root from "Root";
import TodoList from "components/Dashboard/TodoList/TodoList";
import Todo from "components/Dashboard/TodoList/Todo";
import SortableList from "components/Dashboard/TodoList/SortableList";

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
        category: "Inbox"
      }
    ],
    category: "Inbox"
  };

  wrapped = mount(
    <Root initialState={initialState}>
      <MemoryRouter>
        <TodoList />
      </MemoryRouter>
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it("should render SortableList", () => {
  expect(wrapped.find(SortableList).length).toEqual(1);
});

it("should render Todos", () => {
  expect(wrapped.find(Todo).length).toEqual(1);
});
