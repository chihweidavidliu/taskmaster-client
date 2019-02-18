import React from "react";
import { connect } from "react-redux";

import { editTodoText } from "actions";

class TodoText extends React.Component {
  state = { contentEditable: false }

  handleClick = () => {
    this.setState({ contentEditable: true })
  }

  handleBlur = (e) => {
    const newText = e.target.innerText;
    this.props.editTodoText(this.props.id, newText); // send new text to state onBlur
    this.setState({ contentEditable: false });
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
        contentEditable={this.state.contentEditable}
        suppressContentEditableWarning={true}
        onBlur={this.handleBlur}
        onKeyPress={this.handleKeyPress}
        onClick={this.handleClick}
      >
        {this.props.todo}
      </div>
    );
  }
}

export default connect(null, { editTodoText: editTodoText }) (TodoText);
