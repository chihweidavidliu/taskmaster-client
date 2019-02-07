import { SET_CATEGORY } from "../actions/types";

export default (state = "Inbox", action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return action.payload
    default:
      return state;
  }
};
