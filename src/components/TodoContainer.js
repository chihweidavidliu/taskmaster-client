import React, { Component } from "react";
import { connect } from "react-redux";

import "./styles/TodoContainer.css";
import background1 from "../images/background1.jpg";
import background2 from "../images/background2.jpg";
import background3 from "../images/background3.jpg";
import background4 from "../images/background4.jpg";
import background5 from "../images/background5.jpg";
import background6 from "../images/background6.jpg";

class TodoContainer extends Component {
  state = { styles: {} }

  // componentDidMount() {
  //   if (this.props.auth && this.props.category && this.props.category !== "Inbox") {
  //     const project = this.props.auth.projects.filter((project) => project.name === this.props.category);
  //     const backgroundImage = project[0].image;
  //     if (backgroundImage === null) {
  //       this.setState({ styles: { backgroundColor: "teal" } });
  //     } else {
  //       const map = { background1, background2, background3, background4, background5, background6 };
  //       // map the string backgroundImage to the variable for the background  import
  //       const background = map[backgroundImage];
  //       this.setState({ styles: { backgroundImage: `url(${background})`, backgroundSize: "cover" } });
  //     }
  //   } else {
  //     this.setState({ styles: { backgroundColor: "teal" } });
  //   }
  // }

  render() {
    let styles;
    // determine background
    if (this.props.auth && this.props.category && this.props.category !== "Inbox") {
      const project = this.props.auth.projects.filter((project) => project.name === this.props.category);
      if (!project[0]) {
        styles = { backgroundColor: "teal" };
      } else {
        if(project[0].image === null) {
          styles = { backgroundColor: "teal" };
        } else {
          const backgroundImage = project[0].image;
          const map = { background1, background2, background3, background4, background5, background6 };
          // map the string backgroundImage to the variable for the background  import
          const background = map[backgroundImage];
          styles = { backgroundImage: `url(${background})`, backgroundSize: "cover" };
        }
      }
    } else {
      styles = { backgroundColor: "teal" };
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
    category: state.category
  };
};
export default connect(mapStateToProps)(TodoContainer);
