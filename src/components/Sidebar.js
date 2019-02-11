import React, { Component } from "react";
import { Dropdown, Menu } from "semantic-ui-react";
import { connect } from "react-redux";

import * as actions from "../actions";
import "./styles/Sidebar.css";
import CategoryLink from "./CategoryLink";
import Projects from "./Projects";
import PDFButton from "./PDFButton";

class SideBar extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.props.setCategory(name);


  render() {
    return (
      <div className="three wide column sidebar-container">
        <Menu fluid secondary vertical id="sidebar">
          <CategoryLink name="Inbox" editMode={false} />
          <Projects setting="sidebar" />

        <Dropdown text='Tools' floating style={{ marginLeft: "17px"}}>
          <Dropdown.Menu>
            <PDFButton />
          </Dropdown.Menu>
        </Dropdown>

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
