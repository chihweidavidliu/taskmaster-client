import authReducer from "../authReducer";
import { FETCH_USER, ADD_PROJECT, DELETE_PROJECT } from "../../actions/types";

describe("FETCH_USER", () => {
  it("handles failed fetch", () => {
    const action = {
      type: FETCH_USER,
      payload: false
    };

    const newState = authReducer(null, action);
    expect(newState).toEqual(false);
  });

  it("handles successful fetch", () => {
    const action = {
      type: FETCH_USER,
      payload: {
        _id: "agsgkasjgljljeg",
        email: "test@example.com",
        googleID: "afjali3jt3f3f3f"
      }
    };

    const newState = authReducer(null, action);
    expect(newState).toEqual({
      _id: "agsgkasjgljljeg",
      email: "test@example.com",
      googleID: "afjali3jt3f3f3f"
    });
  });
});

describe("ADD_PROJECT", () => {
  it("Updates state with new project", () => {
    const initialState = {
      _id: "agsgkasjgljljeg",
      email: "test@example.com",
      googleID: "afjali3jt3f3f3f",
      projects: []
    };
    const action = {
      type: ADD_PROJECT,
      payload: {
        _id: "agsgkasjgljljeg",
        email: "test@example.com",
        googleID: "afjali3jt3f3f3f",
        projects: ["Misc"]
      }
    };

    const newState = authReducer(initialState, action);
    expect(newState.projects[0]).toBe("Misc");
  });
});

describe("DELETE_PROJECT", () => {
  it("Deletes project from state", () => {
    const initialState = {
      _id: "agsgkasjgljljeg",
      email: "test@example.com",
      googleID: "afjali3jt3f3f3f",
      projects: ["Misc"]
    };
    const action = {
      type: DELETE_PROJECT,
      payload: {
        _id: "agsgkasjgljljeg",
        email: "test@example.com",
        googleID: "afjali3jt3f3f3f",
        projects: []
      }
    };
    const newState = authReducer(initialState, action);
    expect(newState.projects.length).toBe(0);
  });
});
