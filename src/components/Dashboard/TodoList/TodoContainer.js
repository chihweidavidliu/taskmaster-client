import React, { Component } from "react";
import { connect } from "react-redux";

import "components/styles/TodoContainer.css";
import background1 from "images/background1.jpg";
import background2 from "images/background2.jpg";
import background3 from "images/background3.jpg";
import background4 from "images/background4.jpg";
import background5 from "images/background5.jpg";
import background6 from "images/background6.jpg";

class TodoContainer extends Component {
  render() {
    let styles;
    // determine background
    if (this.props.auth && this.props.currentProject) {
      // get current project and identify background image
      const { currentProject } = this.props;
      const backgroundImage = currentProject.image;
      const map = { background1, background2, background3, background4, background5, background6 };
      // map the string backgroundImage to the variable for the background  import
      const background = map[backgroundImage];
      styles = { backgroundImage: `url(${background})`, backgroundSize: "cover" };
    } else {
      // fallback styles
      styles = { backgroundImage: `url(${background6})`, backgroundSize: "cover" };
    }

    return (
      <div className="twelve wide column todoContainer" style={styles}>
        <div className="ui container">{this.props.children}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    currentProject: state.currentProject
  };
};
export default connect(mapStateToProps)(TodoContainer);
