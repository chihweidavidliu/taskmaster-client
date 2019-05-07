import { SET_CURRENT_PROJECT } from "../actions/types";

export default (state = { _id: "Inbox", name: "Inbox", image: "background6", color: "teal" }, action) => {
  switch (action.type) {
    case SET_CURRENT_PROJECT:
      return action.payload;
    default:
      return state;
  }
};
