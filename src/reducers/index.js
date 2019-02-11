import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { reducer as formReducer } from "redux-form";
import todoReducer from "./todoReducer";
import categoryReducer from "./categoryReducer";
import categoryCountReducer from "./categoryCountReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  category: categoryReducer,
  categoryCounts: categoryCountReducer,
  todos: todoReducer
});
