import { FETCH_TODOS, ADD_TODO, UPDATE_ORDER, DELETE_TODO, EDIT_TODO_TEXT } from "../actions/types";

export function arrayMove(arr, previousIndex, newIndex) {
  // make copy of original array
  const array = arr.slice(0);

  // if the newIndex is greater than array length - fill in the gap between what is in the array
  // and the newIndex of the element in question with underfined
  if (newIndex >= array.length) {
    let k = newIndex - array.length;
    while (k-- + 1) {
      array.push(undefined);
    }
  }
  // take the array and add an element at the new index with splice. The element to be added is itself
  // defined by splicing from the previousIndex (giving us the moved element in a new array at position 0)
  array.splice(newIndex, 0, array.splice(previousIndex, 1)[0]);
  return array;
}

// define a function to save store to localStorage
export default (state = [], action) => {
  switch(action.type) {
    case FETCH_TODOS:
      return action.payload; // returns an array of todos sent by the server
    case ADD_TODO:
      const todo = action.payload;
      return [ todo, ...state ];
    case UPDATE_ORDER:
      const stateCopy = [ ...state ];
      const { oldIndex, newIndex } = action.payload;

      const newState = arrayMove(stateCopy, oldIndex, newIndex);
      localStorage.setItem("state", JSON.stringify(newState)); // persist state of todos in local storage
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
