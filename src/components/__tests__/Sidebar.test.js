import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import Root from "../../Root";
import Sidebar from "../Sidebar";
import Projects from "../Projects";

let wrapped;
beforeEach(() => {
  const initialState = {
    auth: {
      _id: "5c5c6a960a759e145f1e24b5",
      projects: ["Inbox"],
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
