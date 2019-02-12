import { FETCH_TODOS, ADD_TODO, UPDATE_ORDER, DELETE_TODO, EDIT_TODO_TEXT } from "../actions/types";
import axios from "axios";
import { arrayMove } from "../arrayMove";

// define a function to save store to localStorage
export default (state = [], action) => {
  switch(action.type) {
    case FETCH_TODOS:
      const sortedTodos = action.payload.sort((a, b) => a.indexInList - b.indexInList);
      return sortedTodos; // returns an array of todos sent by the server
    case ADD_TODO:
      const todo = action.payload;
      const updatedState = [ todo, ...state ];
      updatedState.forEach(async (todo, index) => {
        todo.indexInList = index;
        await axios.patch(`/api/todos/${todo._id}`, { indexInList: index });
      })
      return updatedState;
    case UPDATE_ORDER:
      const stateCopy = [ ...state ];
      const { oldIndex, newIndex } = action.payload;
      const newState = arrayMove(stateCopy, oldIndex, newIndex);

      // update index of each todo item
      newState.forEach( async (todo, index) => {
        todo.indexInList = index;
        await axios.patch(`/api/todos/${todo._id}`, { indexInList: index });
      });

      return newState;
    case DELETE_TODO:
      const deletedTodoId = action.payload._id;
      const filteredState = state.filter(todo => todo._id !== deletedTodoId);
      return filteredState;
    case EDIT_TODO_TEXT:
        const updatedTodo = action.payload;
        // make new state array, changing the todo text where appropriate
        const updatedTodos = state.map(todo => {
          if(todo._id === updatedTodo._id) {
            todo.text = updatedTodo.text;
            return todo;
          } else {
            return todo;
          }
        });
        return updatedTodos;
    default:
      return state;
    }
};
