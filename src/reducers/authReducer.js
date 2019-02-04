import { FETCH_USER } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      // if no user is found, payload is empty string (which is falsy)
      // so return either action.payload or return false if the payload is false i.e. an empty string
      return action.payload || false;
    default:
      return state;
  }
};
