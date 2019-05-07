import React from "react";
import { mount } from "enzyme";
import { Router, Route } from "react-router-dom";

import Root from "Root";
import App from "components/App";

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
      <App />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it("should have a Router component", () => {
  expect(wrapped.find(Router).length).toEqual(1);
});

it("should have two Routes", () => {
  expect(wrapped.find(Route).length).toEqual(2);
})
