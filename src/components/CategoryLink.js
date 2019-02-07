import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { connect } from "react-redux";

import * as actions from "../actions";

class CategoryLink extends Component {
  handleItemClick = (e , { name }) => {
    this.props.setCategory(name);
    this.props.fetchTodos(name);
  }

  render() {
    return (
      <Menu.Item name={this.props.name} active={this.props.activeItem === this.props.name} onClick={this.handleItemClick}>
        {this.props.name}
      </Menu.Item>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    activeItem: state.category
  }
};
export default connect(mapStateToProps, actions) (CategoryLink);
