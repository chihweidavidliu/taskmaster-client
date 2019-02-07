import React, { Component } from "react";
import { Dropdown, Menu, Input, Icon } from "semantic-ui-react";
import { connect } from "react-redux";

import * as actions from "../actions";
import "./styles/Sidebar.css";

class SideBar extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.props.setCategory(name);

  render() {
    const { activeItem } = this.state;

    return (
      <div className="three wide column">
        <Menu fluid secondary vertical id="sidebar">
          <Menu.Item name="Inbox" active={this.props.activeItem === "Inbox"} onClick={this.handleItemClick} />
          <Menu.Item>
            Projects
            <Menu.Menu id="project-menu">
              <Menu.Item name='Misc' active={this.props.activeItem === 'Misc'} onClick={this.handleItemClick}>
                Misc
              </Menu.Item>
              <Menu.Item name='Work' active={this.props.activeItem === 'Work'} onClick={this.handleItemClick}>
                Work
              </Menu.Item>
              <Menu.Item>
                <Input size="mini" className='icon' icon='plus' placeholder='Add...' />
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>
          <Dropdown item text="Projects">
            <Dropdown.Menu>
              <Dropdown.Item>Misc</Dropdown.Item>
              <Dropdown.Item>Work</Dropdown.Item>
              <Dropdown.Item>Shopping</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
