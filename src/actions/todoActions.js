import axios from "axios";
import {
  FETCH_TODOS_BY_DUEDATE,
  EDIT_DUEDATE,
  FETCH_TODO_COUNT,
  FETCH_TODOS,
  ADD_TODO,
  UPDATE_ORDER,
  DELETE_TODO,
  EDIT_TODO_TEXT,
  UPDATE_TODO_PROJECT
} from "./types";

export const fetchTodos = (id) => async (dispatch) => {
  const response = await axios.get(`/api/todos/filter/?project=${id}`);
  const todos = response.data.todos;
  dispatch({ type: FETCH_TODOS, payload: todos });
};

export const fetchTodosByDueDate = () => async (dispatch) => {
  const response = await axios.get(`/api/todos/filter/?dueDate!=${null}`);
  const { todos } = response.data;
  dispatch({ type: FETCH_TODOS_BY_DUEDATE, payload: todos });
};

export const fetchTodoCount = () => async (dispatch) => {
  const response = await axios.get("/api/todos/count");
  dispatch({ type: FETCH_TODO_COUNT, payload: response.data });
};

export const addTodo = (todo) => async (dispatch, getState) => {
  const response = await axios.post("/api/todos", todo);
  dispatch({ type: ADD_TODO, payload: response.data });
};

export const updateTodoOrder = (oldIndex, newIndex) => {
  return {
    type: UPDATE_ORDER,
    payload: { oldIndex: oldIndex, newIndex: newIndex }
  };
};

export const updateTodoProject = (id, oldProject, newProject, indexInList) => async (dispatch) => {
  const response = await axios.patch(`/api/todos/updateProject/${id}`, {
    oldProject: oldProject,
    newProject: newProject,
    indexInList: indexInList
  });
  dispatch({ type: UPDATE_TODO_PROJECT, payload: response.data.todos });
};

export const deleteTodo = (id) => async (dispatch) => {
  const response = await axios.delete(`/api/todos/${id}`);
  dispatch({ type: DELETE_TODO, payload: response.data.todo });
};

export const editTodoText = (idToEdit, newText) => async (dispatch) => {
  const response = await axios.patch(`api/todos/${idToEdit}`, { text: newText });
  dispatch({ type: EDIT_TODO_TEXT, payload: response.data.todo });
};

export const editDueDate = (idToEdit, dueDate) => async (dispatch) => {
  const response = await axios.patch(`api/todos/${idToEdit}`, { dueDate: dueDate });
  dispatch({ type: EDIT_DUEDATE, payload: response.data.todo });
};
