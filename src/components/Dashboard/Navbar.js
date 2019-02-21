import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "actions";
import "components/styles/Navbar.css";

class Navbar extends Component {
  renderUsername = () => {
    if (!this.props.auth) {
      return "";
    }
    return this.props.auth.name;
  };

  render() {
    return (
      <div className="ui menu fluid stackable" style={{ backgroundColor: "#05A89E" }}>
        <div className="item">
          <Link to="/dashboard">
            <h1>TaskMaster</h1>
          </Link>
        </div>
        <div className="item">
          <p>
            {new Date().toLocaleString([], {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false
            })}
          </p>
        </div>
        <div className="item">
          <p>Signed in as {this.renderUsername()}</p>
        </div>
        <div className="item right">
          <a href="/api/logout">Sign-out</a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};
export default connect(
  mapStateToProps,
  actions
)(Navbar);
