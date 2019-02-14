import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import moxios from "moxios";

import Root from "../../Root";
import DeleteButton from "../DeleteButton";

let wrapped;
beforeEach(() => {
  moxios.install();
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
        <DeleteButton target="todo" />
      </MemoryRouter>
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
  moxios.uninstall();
});

it("should have a button with an icon", () => {
  expect(wrapped.find("button").length).toEqual(1);
  expect(wrapped.find("i").length).toEqual(1);
});
