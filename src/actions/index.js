import axios from "axios";
import { ADD_PROJECT, FETCH_TODOS, SET_CATEGORY, FETCH_USER, ADD_TODO, UPDATE_ORDER, DELETE_TODO, EDIT_TODO_TEXT } from "./types";

export const fetchUser = () => async (dispatch, getState) => {
  try {
    const response = await axios.get("/api/current_user");
    dispatch({ type: FETCH_USER, payload: response.data });
  } catch (err) {
    dispatch({ type: FETCH_USER, payload: false});
  }
};

// set todo category to load
export const setCategory = (category) => {
  return {
    type: SET_CATEGORY,
    payload: category
  }
};

export const addProject = (project) => async (dispatch) => {
  const response = await axios.patch("/api/current_user/addProject", { project: project });
  dispatch({ type: ADD_PROJECT, payload: response.data });
};

// TODO actions

export const fetchTodos = (category) => async (dispatch) => {
  const response = await axios.get(`/api/todos/filter/${category}`);
  const todos = response.data.todos;
  dispatch({ type: FETCH_TODOS, payload: todos })
}

export const addTodo = (todo) => async (dispatch, getState) => {
  const response = await axios.post("/api/todos", todo);
  dispatch({ type: ADD_TODO, payload: response.data});
};

export const updateTodoOrder = (oldIndex, newIndex) => {
  return {
    type: UPDATE_ORDER,
    payload: { oldIndex: oldIndex, newIndex: newIndex }
  };
};

export const deleteTodo = (id) => async (dispatch) => {
  const response = await axios.delete(`/api/todos/${id}`);
  dispatch({ type: DELETE_TODO, payload: response.data.todo })
};

export const editTodoText = (idToEdit, newText) => async (dispatch) => {
  const response = await axios.patch(`api/todos/${idToEdit}`, { text: newText });
  dispatch({ type: EDIT_TODO_TEXT, payload: response.data.todo });
};
