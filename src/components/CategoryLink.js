import React, { Component } from "react";
import { Menu, Label } from "semantic-ui-react";
import { connect } from "react-redux";

import "./styles/CategoryLink.css";
import DeleteButton from "./DeleteButton";
import DragHandle from "./DragHandle";
import EditProjectModal from "./EditProjectModal";

import * as actions from "../actions";

class CategoryLink extends Component {
  state = { contentEditable: false };

  handleItemClick = (e, { name }) => {
    if (this.props.editMode === false) {
      this.props.setCategory(name);
      this.props.fetchTodos(name);
    } else if (this.props.editMode === true) {
      this.setState({ contentEditable: true });
    }
  };

  handleBlur = async (e) => {
    const newName = e.target.innerText;
    await this.props.editProjectName(this.props.name, newName); // send new text to state onBlur
    this.setState({ contentEditable: false });
    this.props.fetchTodoCount();
    this.props.setCategory(newName);
    this.props.fetchTodos(newName);
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // if user hits enter, prevent new paragraph and deblur todo
      e.preventDefault();
      e.target.blur();
    }
  };

  renderEditTools() {
    if (this.props.name !== "Inbox" && this.props.editMode === true) {
      return (
        <div className="project-edit-tools" style={{ color: this.props.color }}>
          <EditProjectModal title={this.props.name} color={this.props.projectLabelColor} />
          <DeleteButton color={this.props.color} name={this.props.name} target="project" />
          <DragHandle />
        </div>
      );
    }
  }

  renderName() {
    if (this.props.name !== "Inbox") {
      return (
        <div
          contentEditable={this.state.contentEditable}
          suppressContentEditableWarning={true}
          onDoubleClick={this.handleDoubleClick}
          onBlur={this.handleBlur}
          onKeyPress={this.handleKeyPress}
          style={{ color: this.props.color }}
        >
          {this.props.name}
        </div>
      );
    }

    return <div>{this.props.name}</div>;
  }

  renderCounter() {
    if (this.props.editMode === false) {
      let style;
      if (this.props.name === "Inbox") {
        style = { marginRight: "12px" };
      }
      return (
        <Label circular style={style}>
          {this.props.numOfTodos}
        </Label>
      );
    }
  }

  renderLabel() {
    if (this.props.name !== "Inbox") {
      return <Label empty={true} circular color={this.props.projectLabelColor} style={{ marginRight: "8px" }} />;
    }
  }

  render() {
    return (
      <Menu.Item
        name={this.props.name}
        active={this.props.activeItem === this.props.name}
        onClick={this.handleItemClick}
        className="project"
      >
        <div className="project-contents">
          <div className="group">
            {this.renderLabel()}
            {this.renderName()}
          </div>
          {this.renderCounter()}
          {this.renderEditTools()}
        </div>
      </Menu.Item>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    activeItem: state.category,
    numOfTodos: state.categoryCounts[ownProps.name]
  };
};

export default connect(
  mapStateToProps,
  actions
)(CategoryLink);
