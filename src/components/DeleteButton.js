import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteTodo } from "../actions";

class DeleteButton extends Component {
  handleClick = () => {
    const { id, deleteTodo } = this.props;
    deleteTodo(id);
  }

  render() {
    return (
      <button aria-label="deleteTodo" title="delete">
        <i className="white close icon deleteButton" onClick={this.handleClick} onTransitionEnd={this.handleTransitionEnd}></i>
      </button>
    );
  }
}
// define a new action creator to pass to this component
export default connect(null, {
   deleteTodo: deleteTodo,
 }) (DeleteButton);
