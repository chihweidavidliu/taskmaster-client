import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { connect } from "react-redux";

import "./styles/CategoryLink.css";
import DeleteButton from "./DeleteButton";
import * as actions from "../actions";

class CategoryLink extends Component {
  state = { contentEditable: false }

  handleItemClick = (e, { name }) => {
    this.props.setCategory(name);
    this.props.fetchTodos(name);
  };

  handleDoubleClick = (e) => {
    this.setState({ contentEditable: true })
  }

  handleBlur = (e) => {
    const newName = e.target.innerText;
    this.props.editProjectName(this.props.name, newName); // send new text to state onBlur
    this.setState({ contentEditable: false });
  }

  handleKeyPress = (e) => {
    if(e.key === "Enter") { // if user hits enter, prevent new paragraph and deblur todo
      e.preventDefault();
      e.target.blur();
    }
  }

  renderDelete() {
    if (this.props.name !== "Inbox") {
      return <DeleteButton name={this.props.name} target="project" />;
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
          {this.renderDelete()}
        </div>
      </Menu.Item>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeItem: state.category
  };
};
export default connect(
  mapStateToProps,
  actions
)(CategoryLink);
