import axios from "axios";
import {
  SET_CATEGORY,
  FETCH_USER,
  SET_CURRENT_PROJECT,
} from "./types";

export const fetchUser = () => async (dispatch, getState) => {
  try {
    const response = await axios.get("/api/current_user");
    dispatch({ type: FETCH_USER, payload: response.data });
  } catch (err) {
    dispatch({ type: FETCH_USER, payload: false });
  }
};

// set todo category to load
export const setCategory = (category) => {
  return {
    type: SET_CATEGORY,
    payload: category
  };
};

export const setCurrentProject = (projectId) => {
  return {
    type: SET_CURRENT_PROJECT,
    payload: projectId
  };
};

// Project actions
export * from "./projectActions";

// TODO actions
export * from "./todoActions";
