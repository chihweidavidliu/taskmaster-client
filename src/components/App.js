import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import history from "history.js";
import * as actions from "actions";
import LandingPage from "components/LandingPage";
import Dashboard from "components/Dashboard/Dashboard";

class App extends Component {
  async componentDidMount() {
    await this.props.fetchUser();
    // redirect to dashboard if logged in
    if(this.props.auth) {
      history.push("/dashboard")
    }
  }
  render() {
    return (
      <Router history={history}>
        <div>
          <Route path="/" exact component={LandingPage} />
          <Route path="/dashboard" exact component={Dashboard} />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps, actions) (App);
