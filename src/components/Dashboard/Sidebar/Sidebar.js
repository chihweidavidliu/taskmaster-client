import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { connect } from "react-redux";

import * as actions from "actions";
import "components/styles/Sidebar.css";
import Projects from "components/Dashboard/Sidebar/Projects";
import PDFButton from "components/Dashboard/Sidebar/PDFButton";
import Agenda from "components/Dashboard/Sidebar/Agenda";
import Inbox from "components/Dashboard/Sidebar/Inbox";

class SideBar extends Component {
  render() {
    return (
      <div className="four wide column sidebar-container">
        <Menu fluid secondary vertical id="sidebar">
          <Inbox name="Inbox" _id="Inbox" currentProject={this.props.currentProject} />
          <Agenda name="Agenda" _id="Agenda" currentProject={this.props.currentProject} />
          <Projects setting="sidebar" />
          <Menu.Item>
            Tools
            <Menu.Menu id="tools-submenu">
              <PDFButton />
            </Menu.Menu>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentProject: state.currentProject
  };
};
export default connect(
  mapStateToProps,
  actions
)(SideBar);
