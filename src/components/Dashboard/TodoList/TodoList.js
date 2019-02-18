import React from "react";
import { connect } from "react-redux";

import * as actions from "actions";
import SortableList from "components/Dashboard/TodoList/SortableList";
import "components/styles/TodoList.css";

class TodoList extends React.Component {
  componentDidMount() {
    // When user first logs in, show their inbox
    this.props.fetchTodos("Inbox");
  }

  // event handler from react-sortable - pass the oldIndex and newIndex
  // to the updateTodoOrder action creator, once it reaches the todoReducer call the arrayMove react-sortable function to update state
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.updateTodoOrder(oldIndex, newIndex);
  };

  render() {
    return <SortableList onSortEnd={this.onSortEnd} useDragHandle />;
  }
}

export default connect(null, actions) (TodoList);
