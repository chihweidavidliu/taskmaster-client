import axios from "axios";
import { FETCH_TODOS, SET_CATEGORY, FETCH_USER, ADD_TODO, UPDATE_ORDER, DELETE_TODO, CLEAR_ALL, EDIT_TODO, TRIGGER_SCALE, REVERSE_SCALE } from "./types";

export const fetchUser = () => async (dispatch, getState) => {
  try {
    const response = await axios.get("/api/current_user");
    dispatch({ type: FETCH_USER, payload: response.data });
  } catch (err) {
    dispatch({ type: FETCH_USER, payload: false});
  }
};

// TODO actions

export const fetchTodos = (category) => async (dispatch) => {
  const response = await axios.get(`/api/todos/filter/${category}`);
  console.log(response)
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

export const clearAll = () => {
  return {
    type: CLEAR_ALL,
  };
};

export const editTodo = (idToEdit, newText) => {
  return {
    type: EDIT_TODO,
    payload: { idToEdit: idToEdit, newText: newText }
  };
};

export const triggerScale = () => {
  return {
    type: TRIGGER_SCALE
  };
};

export const reverseScale = () => {
  return {
    type: REVERSE_SCALE
  };
};

export const setCategory = (category) => {
  return {
    type: SET_CATEGORY,
    payload: category
  }
};
