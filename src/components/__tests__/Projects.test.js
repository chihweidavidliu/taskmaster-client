import React from "react";
import { mount } from "enzyme";
import { Input } from "semantic-ui-react";
import moxios from "moxios";

import Root from "../../Root";
import Projects from "../Projects";
import CategoryLink from "../CategoryLink";

let wrapped;
beforeEach(() => {
  moxios.install();

  wrapped = mount(
    <Root
      initialState={{
        auth: {
          _id: "5c5c6a960a759e145f1e24b5",
          email: "chihweiliu1993@gmail.com",
          googleID: "105278708793854655515",
          name: "Chih-Wei Liu",
          __v: 0,
          projects: ["Misc"]
        }
      }}
    >
      <Projects />
    </Root>
  );
  // simulate change
  wrapped.find("input").simulate("change", { target: { value: "New Project" } });
});

afterEach(() => {
  moxios.uninstall();
  wrapped.unmount();
});

it("should render a semantic-ui-react Input", () => {
  // check there is an input
  expect(wrapped.find(Input).length).toEqual(1);
});

it("should display a CategoryLink for each project in state", () => {
  expect(wrapped.find(CategoryLink).length).toEqual(1);
});

it("should clear itself on submit", () => {
  wrapped.find("form").simulate("submit");
  wrapped.update();
  expect(wrapped.find("input").prop("value")).toEqual("");
});

it("should add a project on submit", (done) => {
  moxios.stubRequest("/api/current_user/addProject", {
    status: 200,
    response: {
      _id: "5c5c6a960a759e145f1e24b5",
      email: "chihweiliu1993@gmail.com",
      googleID: "105278708793854655515",
      name: "Chih-Wei Liu",
      __v: 0,
      projects: ["Misc", "New Project"]
    }
  });

  wrapped.find("form").simulate("submit");
  moxios.wait(() => {
    wrapped.update();
    expect(wrapped.find(CategoryLink).length).toEqual(2);
    done();
  });
});
