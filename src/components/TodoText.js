import React from "react";
import { connect } from "react-redux";

import { editTodo } from "../actions";

class TodoText extends React.Component {

  handleBlur = (e) => {
    const newText = e.target.innerText;
    this.props.editTodo(this.props.id, newText); // send new text to state onBlur
  }

  handleKeyPress = (e) => {
    if(e.key === "Enter") { // if user hits enter, prevent new paragraph and deblur todo
      e.preventDefault();
      e.target.blur();
    }
  }

  render() {
    return (
      <div
        className="header"
        contentEditable={true}
        onBlur={this.handleBlur}
        onKeyPress={this.handleKeyPress}
      >
        {this.props.todo}
      </div>
    );
  }
}

export default connect(null, { editTodo: editTodo }) (TodoText);
