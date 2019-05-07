import axios from "axios";
import {
  EDIT_PROJECT_IMAGE,
  EDIT_PROJECT_COLOR,
  UPDATE_PROJECT_ORDER,
  EDIT_PROJECT_NAME,
  DELETE_PROJECT,
  ADD_PROJECT,
} from "./types";

export const addProject = (projectName) => async (dispatch) => {
  const response = await axios.patch("/api/current_user/addProject", { projectName: projectName });
  dispatch({ type: ADD_PROJECT, payload: response.data });
};

export const deleteProject = (id) => async (dispatch) => {
  const response = await axios.delete(`/api/current_user/deleteProject/${id}`);
  dispatch({ type: DELETE_PROJECT, payload: response.data });
};

export const editProjectName = (id, oldName, newName) => async (dispatch) => {
  const response = await axios.patch(`/api/current_user/editProjectName/${id}`, { oldName: oldName, newName: newName });
  dispatch({ type: EDIT_PROJECT_NAME, payload: response.data });
};

export const editProjectColor = (id, color) => async (dispatch) => {
  const response = await axios.patch(`/api/current_user/editProjectColor/${id}`, { color: color });
  dispatch({ type: EDIT_PROJECT_COLOR, payload: response.data });
};

export const editProjectImage = (id, image) => async (dispatch) => {
  const response = await axios.patch(`/api/current_user/editProjectImage/${id}`, { image: image });
  dispatch({ type: EDIT_PROJECT_IMAGE, payload: response.data });
};

export const updateProjectOrder = (oldIndex, newIndex) => async (dispatch) => {
  const response = await axios.patch("/api/current_user/updateProjectOrder", {
    oldIndex: oldIndex,
    newIndex: newIndex
  });
  dispatch({ type: UPDATE_PROJECT_ORDER, payload: response.data });
};
