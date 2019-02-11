import { FETCH_TODO_COUNT } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_TODO_COUNT:
      return action.payload;
    default:
      return state;
  }
};
