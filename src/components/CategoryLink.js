import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { connect } from "react-redux";

import "./styles/CategoryLink.css";
import DeleteButton from "./DeleteButton";
import * as actions from "../actions";

class CategoryLink extends Component {
  state = { contentEditable: false }

  handleItemClick = (e, { name }) => {
    // editMode passed down from Projects component state
    if(this.props.editMode === false || !this.props.editMode) {
      this.props.setCategory(name);
      this.props.fetchTodos(name);
    } else {
      this.setState({ contentEditable: true });
    }
  };

  handleBlur = (e) => {
    const newName = e.target.innerText;
    this.props.editProjectName(this.props.name, newName); // send new text to state onBlur
    this.setState({ contentEditable: false });
    this.props.setCategory(newName);
    this.props.fetchTodos(newName);
  }

  handleKeyPress = (e) => {
    if(e.key === "Enter") { // if user hits enter, prevent new paragraph and deblur todo
      e.preventDefault();
      e.target.blur();
    }
  }

  renderDelete() {
    if (this.props.name !== "Inbox" && this.props.editMode === true) {
      return <DeleteButton colour={this.props.colour} name={this.props.name} target="project" />;
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
          style={{ color: this.props.colour }}
        >
          {this.props.name}
        </div>
      )
    }

    return <div>{this.props.name}</div>
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
          {this.renderName()}
          {this.props.numOfTodos}
          {this.renderDelete()}
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
