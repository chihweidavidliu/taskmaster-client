import React from "react";
import { mount } from "enzyme";
import { Input } from "semantic-ui-react";

import Root from "../../Root";
import Projects from "../Projects";
import CategoryLink from "../CategoryLink";

let wrapped;
beforeEach(() => {
  wrapped = mount(
    <Root initialState={{ auth: { _id: "fgajsgjashgjhejge", projects: ["Misc"] }}}>
      <Projects />
    </Root>
  );
  // simulate change
  wrapped.find("input").simulate("change", { target: { value: "New Project" } });
});

afterEach(() => {
  wrapped.unmount();
});

it("should render a semantic-ui-react Input", () => {
  // check there is an input
  expect(wrapped.find(Input).length).toEqual(1);
});

it("should display a CategoryLink for each project in state", () => {
  expect(wrapped.find(CategoryLink).length).toEqual(1);
});

it("should add a CategoryLink on submit", () => {
  wrapped.find("form").simulate("submit");
  wrapped.update();
  setTimeout(() => { // not ideal to use setTimeout
      expect(wrapped.find(CategoryLink).length).toEqual(2);
  }, 100);
});

it("should clear itself on submit", () => {
  wrapped.find("form").simulate("submit");
  wrapped.update();
  expect(wrapped.find("input").prop("value")).toEqual("");
});
