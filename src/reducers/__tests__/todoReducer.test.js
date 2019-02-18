import todoReducer from "../todoReducer";
import moxios from "moxios";

import {
  UPDATE_TODO_PROJECT,
  FETCH_TODOS,
  ADD_TODO,
  UPDATE_ORDER,
  DELETE_TODO,
  EDIT_TODO_TEXT
} from "../../actions/types";

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

describe("ADD_TODO", () => {
  it("should add a todo", (done) => {
    moxios.stubRequest("/api/todos/afalfje", {
      status: 200,
      response: { todo: { _id: "afalfje", text: "eat food", category: "Inbox", indexInList: 1 } }
    });

    const initialState = [{ _id: "afalfje", text: "eat food", category: "Inbox", indexInList: 0 }];
    const action = {
      type: ADD_TODO,
      payload: { _id: "ajabbrr", text: "hello", category: "Inbox", indexInList: 0 }
    };
    const newState = todoReducer(initialState, action);
    moxios.wait(() => {
      expect(newState[0].text).toBe("hello");
      expect(newState[1].text).toBe("eat food");
      expect(newState.length).toEqual(2);
      done();
    });
  });
});

describe("DELETE_TODO", () => {
  it("should delete a todo", () => {
    const initialState = [
      { _id: "afalfje", text: "eat food", category: "Inbox", indexInList: 0 },
      { _id: "ajabbrr", text: "hello", category: "Inbox", indexInList: 1 }
    ];
    const action = {
      type: DELETE_TODO,
      payload: { _id: "ajabbrr", text: "hello", category: "Inbox", indexInList: 1 }
    };

    const newState = todoReducer(initialState, action);
    expect(newState.length).toEqual(1);
    expect(newState[0].text).toBe("eat food");
  });
});

describe("FETCH_TODOS", () => {
  it("should fetch todos and order them", () => {
    const action = {
      type: FETCH_TODOS,
      payload: [
        { _id: "ajabbrr", text: "hello", category: "Inbox", indexInList: 1 },
        { _id: "ashegae", text: "Aneta", category: "Inbox", indexInList: 0 }
      ]
    };

    const newState = todoReducer([], action);
    expect(newState.length).toEqual(2);
    expect(newState[0].text).toBe("Aneta");
    expect(newState[1].text).toBe("hello");
  });
});

describe("EDIT_TODO_TEXT", () => {
  it("should update todo text", () => {
      const initialState = [{ _id: "ashegae", text: "Aneta", category: "Inbox", indexInList: 0 }];
      const action = {
        type: EDIT_TODO_TEXT,
        payload: { _id: "ashegae", text: "Aneta loves Goat", category: "Inbox", indexInList: 0 }
      }
      const newState = todoReducer(initialState, action);
      expect(newState[0].text).toBe("Aneta loves Goat");
  });
});

describe("UPDATE_ORDER", () => {
  it("should update todo order", () => {
    const initialState = [
      { _id: "afalfje", text: "eat food", category: "Inbox", indexInList: 0 },
      { _id: "ajabbrr", text: "hello", category: "Inbox", indexInList: 1 }
    ];

    const action = {
      type: UPDATE_ORDER,
      payload: { oldIndex: 0, newIndex: 1 }
    }
    const newState = todoReducer(initialState, action);
    expect(newState[0].text).toBe("hello");
    expect(newState[0].indexInList).toEqual(0);
  })
})

describe("UPDATE_TODO_PROJECT", () => {
  it("should update todo project", () => {
    const initialState = [
      { _id: "afalfje", text: "eat food", category: "Inbox", indexInList: 0 },
      { _id: "ajabbrr", text: "hello", category: "Inbox", indexInList: 1 }
    ];

    const action = {
      type: UPDATE_TODO_PROJECT,
      payload: [{ _id: "ajabbrr", text: "hello", category: "Inbox", indexInList: 0 }]
    }

    const newState = todoReducer(initialState, action);
    expect(newState[0].text).toBe("hello");
    expect(newState.length).toEqual(1);
  });
});
