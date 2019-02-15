import React from "react";
import { mount } from "enzyme";
import moxios from "moxios";
import { Modal } from "semantic-ui-react";

import Root from "../../Root";
import EditProjectModal from "../EditProjectModal";

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
          projects: [{ name: "Misc", color: "teal", image: null, _id: "kjhfakjhfjfed" }]
        },
        categoryCounts: { Inbox: 0, Misc: 0 }
      }}
    >
      <EditProjectModal name="Misc" color="teal" projectId="kjhfakjhfjfed"/>
    </Root>
  );
});

afterEach(() => {
  moxios.uninstall();
  wrapped.unmount();
});

it("should render a Modal", () => {
  expect(wrapped.find(Modal).length).toEqual(1);
});
