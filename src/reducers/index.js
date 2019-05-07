import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { reducer as formReducer } from "redux-form";
import todoReducer from "./todoReducer";
import projectCountReducer from "./projectCountReducer";
import projectReducer from  "./projectReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  currentProject: projectReducer,
  projectCounts: projectCountReducer,
  todos: todoReducer
});
