import React, { Component } from "react";
import { Label } from "semantic-ui-react";
import { connect } from "react-redux"
import * as actions from "../actions";

class ColourChoiceLabel extends Component {
  handleClick = () => {
    this.props.editProjectColor(this.props.projectId, this.props.color);
  }

  render() {
    return <Label className="color-choice" circular color={this.props.color} onClick={this.handleClick} />;
  }
}

export default connect(null, actions) (ColourChoiceLabel);
