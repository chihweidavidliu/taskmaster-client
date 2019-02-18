import React from "react";
import { mount } from "enzyme";
import moxios from "moxios";
import Root from "Root";
import FormInput from "components/Dashboard/TodoList/FormInput";

let wrapped;
beforeEach(() => {
  wrapped = mount(
    <Root initialState={{ auth: { _id: "5c5c6a960a759e145f1e24b5" }}}>
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
  moxios.stubRequest("/api/todos", {
    status: 200,
    response: {
      data: { _id: "fajgakhgkehg33", text: "new todo", _creator: "5c5c6a960a759e145f1e24b5", category: "Inbox" }
    }
  });

  wrapped.find("form").simulate("submit");

  moxios.wait(() => {
    wrapped.update();
    expect(wrapped.find("input").prop("value")).toEqual("");
  })
});
