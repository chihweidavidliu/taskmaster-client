import React, { Component } from "react";
import { Menu, Label } from "semantic-ui-react";
import { connect } from "react-redux";

import "./styles/CategoryLink.css";
import DeleteButton from "./DeleteButton";
import * as actions from "../actions";

class CategoryLink extends Component {
  state = { contentEditable: false }

  handleItemClick = (e, { name }) => {
    if(this.props.editMode === false) {
      this.props.setCategory(name);
      this.props.fetchTodos(name);
    } else if(this.props.editMode === true){
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
  }

  handleKeyPress = (e) => {
    if(e.key === "Enter") { // if user hits enter, prevent new paragraph and deblur todo
      e.preventDefault();
      e.target.blur();
    }
  }

  renderEditTools() {
    if (this.props.name !== "Inbox" && this.props.editMode === true) {
      return (
        <div className="project-edit-tools" style={{ color: this.props.colour }}>
          <DeleteButton colour={this.props.colour} name={this.props.name} target="project" />
          <i className="fas fa-grip-vertical" aria-label="Drag to reorder" title="Drag to reorder"></i>
        </div>
      )
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

  renderCounter() {
    if(this.props.editMode === false) {
      let style;
      if(this.props.name === "Inbox") {
        style = { marginRight: "12px" };
      }
      return (
        <Label circular style={style} >{this.props.numOfTodos}</Label>
      )
    }
  }

  renderLabel() {
    if(this.props.name !== "Inbox") {
      return <Label empty={true} circular color="teal" style={{ marginRight: "8px" }} />
    }
  }

  render() {
    console.log(this.props)
    return (
      <Menu.Item
        name={this.props.name}
        active={this.props.activeItem === this.props.name}
        onClick={this.handleItemClick}
        className="project"
      >
        <div className="project-contents" style={{ transition: "0.5s" /* stops sortable behaviour interfering with click */ }}>
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
