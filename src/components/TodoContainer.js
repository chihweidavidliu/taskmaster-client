import React from "react";

import "./styles/TodoContainer.css";

const TodoContainer = (props) => {
  return (
    <div className="thirteen wide column todoContainer">
      <div className="ui container">
        {props.children}
      </div>
    </div>
  )
};

export default TodoContainer;
