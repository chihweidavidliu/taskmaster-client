import authReducer from "../authReducer";
import { FETCH_USER } from "../../actions/types";

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
