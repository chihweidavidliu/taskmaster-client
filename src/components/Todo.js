import React from "react";
import { SortableElement } from "react-sortable-hoc";

import DeleteButton from "./DeleteButton";
import TodoText from "./TodoText";

// define a component that is a sortable element using react-sortables SortableElement function
// pass id to DeleteButton so that when delete butotn is clicked, it has the id of the todo and can delete the appropriate one from the state
const Todo = SortableElement(props => {
  const { id, todo } = props.todo;
  return (
    <div className="todo-item" data-id={id}>
      <div className="content">
        <i className="white right triangle icon"></i>
        <TodoText id={id} todo={todo} />
      </div>
      <div>
        <DeleteButton id={id}/>
      </div>
    </div>
  );
});

export default Todo;
