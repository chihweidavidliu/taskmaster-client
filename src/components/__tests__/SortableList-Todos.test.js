import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

import Root from "Root";
import SortableList from "components/Dashboard/TodoList/SortableList";
import Todo from "components/Dashboard/TodoList/Todo";
import DeleteButton from "components/Dashboard/DeleteButton";
import TodoText from "components/Dashboard/TodoList/TodoText";

let wrapped;
beforeEach(() => {
  const initialState = {
    auth: {
      _id: "5c5c6a960a759e145f1e24b5",
      projects: [],
      name: "Chih-Wei"
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
        <SortableList />
      </MemoryRouter>
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it("should render a DeleteButton", () => {
  expect(wrapped.find(Todo).length).toEqual(1);
});

describe("the Todo component", () => {
  it("should render a DeleteButton", () => {
    expect(wrapped.find(Todo).find(DeleteButton).length).toEqual(1);
  });

  it("should render TodoText", () => {
    expect(wrapped.find(TodoText).length).toEqual(1);
  });
});
