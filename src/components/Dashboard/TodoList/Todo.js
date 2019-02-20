import React, { Component } from "react";
import { SortableElement } from "react-sortable-hoc";
import { Label } from "semantic-ui-react";
import { connect } from "react-redux";

import DeleteButton from "components/Dashboard/DeleteButton";
import TodoText from "components/Dashboard/TodoList/TodoText";
import DragHandle from "components/Dashboard/DragHandle";
import EditTodoModal from "components/Dashboard/TodoList/EditTodoModal";
import DueDate from "components/Dashboard/TodoList/DueDate";

// define a component that is a sortable element using react-sortables SortableElement function
// pass id to DeleteButton so that when delete butotn is clicked, it has the id of the todo and can delete the appropriate one from the state

class Todo extends Component {
  renderLabel() {
    if (this.props.auth) {
      if (this.props.todo.category === "Inbox" || this.props.currentCategory !== "Agenda") {
        return <i className="white right triangle icon" />;
      }
      const { projects } = this.props.auth;
      let color;
      projects.forEach((project) => {
        if (project.name === this.props.todo.category) {
          color = project.color;
        }
      });

      return <Label className="project-label" title={this.props.todo.category} empty={true} circular color={color} />;
    }
  }

  render() {
    const { _id, text, category, indexInList, dueDate } = this.props.todo;
    return (
      <div className="todo-item" id={_id}>
        <div className="content">
          {this.renderLabel()}
          <TodoText id={_id} todo={text} />
        </div>
        <div className="todo-tools">
          <DueDate dueDate={dueDate} />
          <EditTodoModal title={text} category={category} todoId={_id} indexInList={indexInList} dueDate={dueDate} />
          <DeleteButton id={_id} target={"todo"} />
          <DragHandle />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    currentCategory: state.category,
  };
};

const TodoWrapped = connect(mapStateToProps)(Todo);

// enhance with sortable hoc
const TodoSortable = SortableElement((props) => {
  return <TodoWrapped {...props} />;
});

export default TodoSortable;
