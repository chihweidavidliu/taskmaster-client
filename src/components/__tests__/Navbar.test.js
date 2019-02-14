import React from "react";
import { mount } from "enzyme";
import { MemoryRouter, Link } from "react-router-dom";

import Root from "../../Root";
import Navbar from "../Navbar";

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
        <Navbar />
      </MemoryRouter>
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it("should contain a Link component as logo", () => {
  expect(wrapped.find(Link).length).toBe(1);
  expect(wrapped.find(Link).prop("to")).toContain("/dashboard");
});

it("should contain a link to signout", () => {
  expect(wrapped.find("[href='/api/logout']").length).toBe(1);
});

it("should contain a message with the user's name", () => {
  expect(wrapped.find("p").length).toBe(1);
  expect(wrapped.find("p").text()).toBe("Signed in as Chih-Wei");
});
