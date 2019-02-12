import { UPDATE_PROJECT_ORDER, EDIT_PROJECT_NAME, FETCH_USER, ADD_PROJECT, DELETE_PROJECT } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload;
    case ADD_PROJECT:
      return action.payload;
    case DELETE_PROJECT:
      return action.payload;
    case EDIT_PROJECT_NAME:
      return action.payload;
    case UPDATE_PROJECT_ORDER:
      return action.payload;
    default:
      return state;
  }
};
