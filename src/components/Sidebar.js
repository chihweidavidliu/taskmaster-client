import React, { Component } from "react";
import { Dropdown, Menu, Icon } from "semantic-ui-react";
import { connect } from "react-redux";

import * as actions from "../actions";
import "./styles/Sidebar.css";
import CategoryLink from "./CategoryLink";
import Projects from "./Projects";

class SideBar extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.props.setCategory(name);

  render() {
    const { activeItem } = this.state;

    return (
      <div className="three wide column">
        <Menu fluid secondary vertical id="sidebar">
          <CategoryLink name="Inbox" />
          <Projects />
          <Dropdown item text="Filter Posts">
            <Dropdown.Menu>
              <Dropdown.Header icon="folder" content="Project" />
              <Dropdown.Menu scrolling />
              <Dropdown.Divider />
              <Dropdown.Header icon="tags" content="Tag Label" />
              <Dropdown.Menu scrolling />
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown item text="Tools">
            <Dropdown.Menu>
              <Dropdown.Item>
                <Icon name="file pdf"/>
                Export PDF
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item as="a" href="/api/logout" name="Sign-out" active={activeItem === "signout"} />
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeItem: state.category
  }
}
export default connect(mapStateToProps, actions) (SideBar);
