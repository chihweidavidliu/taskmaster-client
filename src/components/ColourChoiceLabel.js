import React, { Component } from "react";
import { Label } from "semantic-ui-react";

class ColourChoiceLabel extends Component {
  handleClick = () => {
    console.log(this.props.color)

    // action creator that patches the colour of the project 
  }

  render() {
    return <Label className="color-choice" circular color={this.props.color} onClick={this.handleClick} />;
  }
}

export default ColourChoiceLabel;
