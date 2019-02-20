import React, { Component } from "react";
import { Menu, Label } from "semantic-ui-react";
import { connect } from "react-redux";

import * as actions from "actions";

class Agenda extends Component {
  handleClick = () => {
    this.props.setCategory(this.props.name);
    // action creator that gets todos that have a duedate
    this.props.fetchTodosByDueDate();
  }

  render() {
    return (
      <Menu.Item
        name={this.props.name}
        active={this.props.activeItem === this.props.name}
        onClick={this.handleClick}
      >
        <div className="project-contents">
        {this.props.name}
        <Label circular color={false} style={{ marginRight: "12px" }}>
          {this.props.numOfTodos}
        </Label>
        </div>
      </Menu.Item>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    numOfTodos: state.categoryCounts[ownProps.name]
  }
};
export default connect(mapStateToProps, actions) (Agenda);
