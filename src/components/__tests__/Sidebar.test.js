import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import Root from "Root";
import Sidebar from "components/Dashboard/Sidebar/Sidebar";
import Projects from "components/Dashboard/Sidebar/Projects";

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
        project: "Inbox"
      }
    ],
    currentProject: { _id: "Inbox", name: "Inbox", color: "teal", background: "background6" }
  };

  wrapped = mount(
    <Root initialState={initialState}>
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it("should render a Menu", () => {
  expect(wrapped.find(Menu).length).toEqual(1);
});

it("should render Projects component", () => {
  expect(wrapped.find(Projects).length).toEqual(1);
});
