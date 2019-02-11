import React from "react";
import { mount } from "enzyme";
import { Dropdown } from "semantic-ui-react";

import PDFButton from "../PDFButton";
import Root from "../../Root";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const initialState = {
  todos: [ { id: "knvzqzWHZ", text: "Do tests" } ]
};

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root initialState={initialState}>
      <PDFButton />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it("should render a button", () => {
  expect(wrapped.find(Dropdown.Item).length).toEqual(1);
});

it("should create a pdf on click", () => {
  // create a spy on the pdfMake object and the createPdf method
  const createPdf = jest.spyOn(pdfMake, "createPdf");
  // simulate click on pdf button
  wrapped.find(Dropdown.Item).simulate("click");
  wrapped.update();

  // expect the spy to say that the method has been called
  expect(createPdf).toHaveBeenCalled();

  // reset the mock function
  createPdf.mockRestore();
});
