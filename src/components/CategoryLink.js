import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { connect } from "react-redux";

import "./styles/CategoryLink.css";
import DeleteButton from "./DeleteButton";
import * as actions from "../actions";

class CategoryLink extends Component {
  handleItemClick = (e, { name }) => {
    this.props.setCategory(name);
    this.props.fetchTodos(name);
  };

  renderDelete() {
    if (this.props.name !== "Inbox") {
      return <DeleteButton name={this.props.name} target="project" />;
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
          {this.props.name}
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
