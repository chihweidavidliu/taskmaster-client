import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class DeleteButton extends Component {
   handleClick = async (e) => {
    const { id, deleteTodo } = this.props;
    if(this.props.target === "todo") {
      return deleteTodo(id);
    } else if (this.props.target === "project") {
      e.stopPropagation(); // prevent the click bubbling up to the main project link (else this would set category state to the project about to be deleted)
      await this.props.deleteProject(this.props.name);
      // redirect to inbox
      await this.props.setCategory("Inbox");
      await this.props.fetchTodos("Inbox");
    }

  }

  render() {
    return (
      <button aria-label="deleteTodo" title="delete" className="deleteButton">
        <i className="white close icon deleteIcon" onClick={this.handleClick} onTransitionEnd={this.handleTransitionEnd}></i>
      </button>
    );
  }
}
// define a new action creator to pass to this component
export default connect(null, actions) (DeleteButton);
