import { FETCH_USER, ADD_PROJECT, DELETE_PROJECT } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload;
    case ADD_PROJECT:
      return action.payload;
    case DELETE_PROJECT:
      return action.payload;
    default:
      return state;
  }
};
