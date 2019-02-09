import React from "react";
import moxios from "moxios";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import { Menu } from "semantic-ui-react";
import { waitForElement } from 'enzyme-async-helpers';

import Root from "../Root";
import Dashboard from "../components/Dashboard";
import CategoryLink from "../components/Dashboard";
import Todo from "../components/Todo";
import FormInput from "../components/FormInput";

let wrapped;
beforeEach(() => {

  moxios.install();

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
  moxios.uninstall();
  wrapped.unmount();
});

it("should display todos in state", () => {
  expect(wrapped.find(Todo).length).toEqual(1);
});

it("should, display a todo when FormInput is submitted", (done) => {
  // stub the request with moxios
  moxios.stubRequest("/api/todos", {
    status: 200,
    response: { data: { _id: "fajgakhgkehg33", text: "new todo", _creator: "5c5c6a960a759e145f1e24b5", category: "Inbox"  }},
  });
  // simulate the entry of a new todo
  wrapped.find("[placeholder='Enter todo']").simulate("change", { target: { value: "new todo" } });
  wrapped.find("#todoForm").simulate("submit");
  // wait for the stub response
  moxios.wait(() => {
    wrapped.update();
    expect(wrapped.find(Todo).length).toEqual(2);
    done();
  })
});
