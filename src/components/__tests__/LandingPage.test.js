import React from "react";
import { mount } from "enzyme";
import { MemoryRouter, Link } from "react-router-dom";
import LandingPage from "../LandingPage";

let wrapped;
beforeEach(() => {
  wrapped = mount(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it("should render a navbar, landingMessage and bottombar", () => {
  expect(wrapped.find(".navbar").length).toEqual(1);
  expect(wrapped.find(".landingMessage").length).toEqual(1);
  expect(wrapped.find(".bottom-wave").length).toEqual(1);
});

describe("the navbar", () => {
  it("should contain homepage Link in logo", () => {
    expect(wrapped.find(Link).length).toEqual(1);
    expect(wrapped.find(Link).find("h1").length).toEqual(1);
  });

  it("should contain an anchor tag for login", () => {
    expect(wrapped.find(".navbar").children("a").length).toEqual(1);
  })
});

describe("the landingMessage", () => {
  it("should contain a grid with two columns", () => {
    expect(wrapped.find(".grid").children(".column").length).toEqual(2);
  });

  it("should contain a ul and a h3", () => {
    expect(wrapped.find(".message").children("ul").length).toEqual(1);
    expect(wrapped.find(".message").children("h3").length).toEqual(1);
  })

  it("should contain an image of the interface", () => {
    expect(wrapped.find(".interface-screenshot").length).toEqual(1);
  })
});

describe("the bottom bar", () => {
  it("should contain an h4 with a signature", () => {
    expect(wrapped.find(".bottom-wave").children("h4").length).toEqual(1);
  })
})
