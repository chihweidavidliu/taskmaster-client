import React, { Component } from "react";
import { Link } from "react-router-dom"
import { connect } from "react-redux";

import * as actions from "../actions";
import "./styles/Navbar.css"


class Navbar extends Component {
  renderUsername = () => {
    if(!this.props.auth) {
      return ""
    }
    return this.props.auth.name
  }

  render() {
    return (
      <div className="ui menu" style={{backgroundColor: "#05A89E"}}>
        <div className="item">
          <Link to="/dashboard"><h1>TaskMaster</h1></Link>
        </div>
        <div className="item">
          <p>Signed in as {this.renderUsername()}</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps, actions) (Navbar);
