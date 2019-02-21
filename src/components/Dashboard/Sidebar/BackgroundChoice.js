import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "actions";
import background1 from "images/thumbnails/background1.jpg";
import background2 from "images/thumbnails/background2.jpg";
import background3 from "images/thumbnails/background3.jpg";
import background4 from "images/thumbnails/background4.jpg";
import background5 from "images/thumbnails/background5.jpg";
import background6 from "images/thumbnails/background6.jpg";

class BackgroundChoice extends Component {
  handleClick = () => {
    const { projectId, backgroundName } = this.props;
    this.props.editProjectImage(projectId, backgroundName);
  };

  render() {
    const map = { background1, background2, background3, background4, background5, background6 }
    if(this.props.active === true) {
      return (
          <img alt={this.props.alt} className="active-image" src={map[this.props.backgroundName]} onClick={this.handleClick} />
      );
    }
    return (
        <img alt={this.props.alt} src={map[this.props.backgroundName]} onClick={this.handleClick} />
    );
  }
}

export default connect(null, actions) (BackgroundChoice);
