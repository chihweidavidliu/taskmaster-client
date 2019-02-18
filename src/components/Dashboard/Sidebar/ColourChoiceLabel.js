import React, { Component } from "react";
import { Label } from "semantic-ui-react";
import { connect } from "react-redux"
import * as actions from "actions";

class ColourChoiceLabel extends Component {
  handleClick = () => {
    this.props.editProjectColor(this.props.projectId, this.props.color);
  }

  render() {
    if(this.props.active === true) {
      return <Label id="active" className="color-choice" circular color={this.props.color} onClick={this.handleClick} />
    }
    return <Label className="color-choice" circular color={this.props.color} onClick={this.handleClick} />;
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.auth.projects
  }
};
export default connect(mapStateToProps, actions) (ColourChoiceLabel);
