import authReducer from "../authReducer";
import {
  FETCH_USER,
  ADD_PROJECT,
  DELETE_PROJECT,
  EDIT_PROJECT_NAME,
  UPDATE_PROJECT_ORDER,
  EDIT_PROJECT_COLOR,
  EDIT_PROJECT_IMAGE
} from "../../actions/types";

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

describe("EDIT_PROJECT_NAME", () => {
  it("Changes project name in state", () => {
    const initialState = {
      type: EDIT_PROJECT_NAME,
      payload: {
        _id: "agsgkasjgljljeg",
        email: "test@example.com",
        googleID: "afjali3jt3f3f3f",
        projects: ["Misc"]
      }
    };
    const action = {
      type: EDIT_PROJECT_NAME,
      payload: {
        _id: "agsgkasjgljljeg",
        email: "test@example.com",
        googleID: "afjali3jt3f3f3f",
        projects: ["Work"]
      }
    };

    const newState = authReducer(initialState, action);
    expect(newState.projects[0]).toBe("Work");
  });
});

describe("UPDATE_PROJECT_ORDER", () => {
  it("changes order of projects in state", () => {
    const initialState = {
      type: UPDATE_PROJECT_ORDER,
      payload: {
        _id: "agsgkasjgljljeg",
        email: "test@example.com",
        googleID: "afjali3jt3f3f3f",
        projects: [
          { name: "Misc", color: "teal", image: "background1" },
          { name: "Work", color: "red", image: "background2" }
        ]
      }
    };
    const action = {
      type: UPDATE_PROJECT_ORDER,
      payload: {
        _id: "agsgkasjgljljeg",
        email: "test@example.com",
        googleID: "afjali3jt3f3f3f",
        projects: [
          { name: "Work", color: "red", image: "background2" },
          { name: "Misc", color: "teal", image: "background1" }
        ]
      }
    };

    const newState = authReducer(initialState, action);
    expect(newState.projects[0].name).toBe("Work");
    expect(newState.projects[1].name).toBe("Misc");
  });
});

describe("EDIT_PROJECT_COLOR", () => {
  it("changes color of project in state", () => {
    const initialState = {
      type: EDIT_PROJECT_COLOR,
      payload: {
        _id: "agsgkasjgljljeg",
        email: "test@example.com",
        googleID: "afjali3jt3f3f3f",
        projects: [
          { name: "Misc", color: "teal", image: "background1" },
          { name: "Work", color: "red", image: "background2" }
        ]
      }
    };
    const action = {
      type: EDIT_PROJECT_COLOR,
      payload: {
        _id: "agsgkasjgljljeg",
        email: "test@example.com",
        googleID: "afjali3jt3f3f3f",
        projects: [
          { name: "Misc", color: "red", image: "background1" },
          { name: "Work", color: "red", image: "background2" }
        ]
      }
    };

    const newState = authReducer(initialState, action);
    expect(newState.projects[0].color).toBe("red");
  });
});


describe("EDIT_PROJECT_IMAGE", () => {
  it("changes image of project in state", () => {
    const initialState = {
      type: EDIT_PROJECT_IMAGE,
      payload: {
        _id: "agsgkasjgljljeg",
        email: "test@example.com",
        googleID: "afjali3jt3f3f3f",
        projects: [
          { name: "Misc", color: "teal", image: "background1" },
          { name: "Work", color: "red", image: "background2" }
        ]
      }
    };
    const action = {
      type: EDIT_PROJECT_IMAGE,
      payload: {
        _id: "agsgkasjgljljeg",
        email: "test@example.com",
        googleID: "afjali3jt3f3f3f",
        projects: [
          { name: "Misc", color: "teal", image: "background2" },
          { name: "Work", color: "red", image: "background2" }
        ]
      }
    };

    const newState = authReducer(initialState, action);
    expect(newState.projects[0].image).toBe("background2");
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
