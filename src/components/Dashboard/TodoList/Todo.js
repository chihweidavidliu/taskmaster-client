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
      if (this.props.currentProject._id !== "Agenda") {
        return <i className="white right triangle icon" />;
      }
      const { projects } = this.props.auth;
      let color;
      let name;
      projects.forEach((project) => {
        if (project._id === this.props.todo.project) {
          color = project.color;
          name = project.name;
        }
      });

      return <Label className="project-label" title={name} empty={true} circular color={color} />;
    }
  }

  renderDragHandle() {
    if(this.props.currentProject._id !== "Agenda") {
      return <DragHandle />;
    }
  }

  render() {
    const { _id, text, project, indexInList, dueDate } = this.props.todo;
    return (
      <div className="todo-item" id={_id}>
        <div className="content">
          {this.renderLabel()}
          <TodoText id={_id} todo={text} />
        </div>
        <div className="todo-tools">
          <DueDate dueDate={dueDate} />
          <EditTodoModal title={text} projectId={project} todoId={_id} indexInList={indexInList} dueDate={dueDate} />
          <DeleteButton id={_id} target={"todo"} />
          {this.renderDragHandle()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    currentProject: state.currentProject
  };
};

const TodoWrapped = connect(mapStateToProps)(Todo);

// enhance with sortable hoc
const TodoSortable = SortableElement((props) => {
  return <TodoWrapped {...props} />;
});

export default TodoSortable;
