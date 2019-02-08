import React from "react";
import { mount } from "enzyme";
import Root from "../../Root";
import FormInput from "../FormInput";

let wrapped;
beforeEach(() => {
  wrapped = mount(
    <Root initialState={{ auth: { _id: "fgajsgjashgjhejge" }}}>
      <FormInput />
    </Root>
  );
  // simulate change
  wrapped.find("input").simulate("change", { target: { value: "new todo" } });
});

afterEach(() => {
  wrapped.unmount();
});

it("should render an input that users can type in", () => {
  // check there is an input
  expect(wrapped.find("input").length).toEqual(1);

  // check that the user updates the value prop of the input onChange
  expect(wrapped.find("input").prop("value")).toEqual("new todo");
});

it("should clear itself on submit", () => {
  wrapped.find("form").simulate("submit");
  // needded to set initial state above in Root because the form will only clear after it tries to send the todo to action _creator
  // can't do so without creator id property from redux store
  wrapped.update();
  expect(wrapped.find("input").prop("value")).toEqual("");
});
