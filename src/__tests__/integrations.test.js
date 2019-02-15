import React from "react";
import moxios from "moxios";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";

import Root from "../Root";
import Dashboard from "../components/Dashboard";
import Todo from "../components/Todo";

let wrapped;
beforeEach(() => {
  moxios.install();

  const initialState = {
    auth: {
      _id: "5c5c6a960a759e145f1e24b5",
      projects: [{ name: "Misc", color: "teal", image: null, _id: "dashfakjhfkahef"}]
    },
    todos: [
      {
        _id: "5c5c6fc4c5467114da5d2e19",
        text: "Go to park",
        _creator: "5c5c6a960a759e145f1e24b5",
        indexInList: 0,
        category: "Inbox"
      }
    ],
    category: "Inbox",
    categoryCounts: { Inbox: 1, Misc: 0 }
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
  moxios.uninstall();
  wrapped.unmount();
});

it("should display todos in state", () => {
  expect(wrapped.find(Todo).length).toEqual(1);
});

it("should display a todo when FormInput is submitted", (done) => {
  moxios.stubRequest("/api/todos", {
    status: 200,
    response: {
      data: { _id: "fajgakhgkehg33", text: "new todo", _creator: "5c5c6a960a759e145f1e24b5", category: "Inbox" }
    }
  });

  wrapped.find("[placeholder='Add a todo']").simulate("change", { target: { value: "new todo" } });
  wrapped.find("#todoForm").simulate("submit");
  // wait for the stub response
  moxios.wait(() => {
    wrapped.update();
    expect(wrapped.find(Todo).length).toEqual(2);
    done();
  });
});

it("should delete a todo when delete button is clicked", (done) => {
  moxios.stubRequest("/api/todos/5c5c6fc4c5467114da5d2e19", {
    status: 200,
    response: {
      todo: {
        _id: "5c5c6fc4c5467114da5d2e19",
        text: "Go to Park",
        _creator: "5c5c6a960a759e145f1e24b5",
        __v: 0,
        dueDate: null,
        completedAt: null,
        completed: false,
        indexInList: 0,
        category: "Inbox"
      }
    }
  });
  wrapped.find(".check").simulate("click");
  moxios.wait(() => {
    wrapped.update();
    expect(wrapped.find(Todo).length).toEqual(0);
    done();
  });
});

it("should display a list of appropriate todos when project folder is clicked", (done) => {
  moxios.stubRequest("/api/todos/filter/Misc", {
    status: 200,
    response: {
      todos: [
        {
          _id: "5c5ef7fd2a49f22478f1da22",
          text: "Yes",
          _creator: "5c5c6a960a759e145f1e24b5",
          __v: 0,
          dueDate: null,
          completedAt: null,
          completed: false,
          indexInList: 1,
          category: "Misc"
        },
        {
          _id: "5c5f2b2a2a49f22478f1da24",
          text: "Prepare for PHD",
          _creator: "5c5c6a960a759e145f1e24b5",
          __v: 0,
          dueDate: null,
          completedAt: null,
          completed: false,
          indexInList: 0,
          category: "Misc"
        }
      ]
    }
  });

  wrapped.find({ name: "Misc", activeItem: "Inbox" }).simulate("click");
  moxios.wait(() => {
    wrapped.update();
    expect(wrapped.find(Todo).length).toEqual(2);
    expect(wrapped.find({ className: "todo-item", id: "5c5f2b2a2a49f22478f1da24" }).length).toEqual(1);
    done();
  });
});
