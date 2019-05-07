import React, { Component } from "react";
import { Menu, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "components/styles/CategoryLink.css";
import DeleteButton from "components/Dashboard/DeleteButton";
import DragHandle from "components/Dashboard/DragHandle";
import EditProjectModal from "components/Dashboard/Sidebar/EditProjectModal";

import * as actions from "actions";

class CategoryLink extends Component {
  static propTypes = {
    currentProject: PropTypes.object, // from redux store
    numOfTodos: PropTypes.number,
    editMode: PropTypes.bool,
    accentColor: PropTypes.string,
    project: PropTypes.object.isRequired, // details of the project
    index: PropTypes.number
  };

  state = { contentEditable: false };

  handleItemClick = (e, { name }) => {
    const { editMode, project, currentProject } = this.props;
    if (editMode === false && currentProject._id !== project._id) {
      // only do this if editMode is off and the link is not that of the already selected project
      this.props.setCurrentProject(project);
      this.props.fetchTodos(project._id);
    } else if (this.props.editMode === true) {
      this.setState({ contentEditable: true });
    }
  };

  handleBlur = async (e) => {
    const { project } = this.props;
    const newName = e.target.innerText;
    await this.props.editProjectName(project._id, project.name, newName); // send new text to state onBlur
    await this.setState({ contentEditable: false });
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // if user hits enter, prevent new paragraph and deblur todo
      e.preventDefault();
      e.target.blur();
    }
  };

  renderEditTools() {
    const { project } = this.props;
    if (project.name !== "Inbox" && this.props.editMode === true) {
      return (
        <div className="project-edit-tools" style={{ color: this.props.accentColor }}>
          <EditProjectModal project={project} />
          <DeleteButton color={this.props.accentColor} id={project._id} target="project" />
          <DragHandle />
        </div>
      );
    }
  }

  renderName() {
    const { name } = this.props.project;
    return (
      <div
        contentEditable={this.state.contentEditable}
        suppressContentEditableWarning={true}
        onDoubleClick={this.handleDoubleClick}
        onBlur={this.handleBlur}
        onKeyPress={this.handleKeyPress}
        style={{ color: this.props.accentColor }}
      >
        {name}
      </div>
    );
  }

  renderCounter() {
    if (this.props.editMode === false) {
      let style;
      if (this.props.project.name === "Inbox") {
        style = { marginRight: "12px" };
      }
      return (
        <Label circular style={style}>
          {this.props.numOfTodos}
        </Label>
      );
    }
  }

  renderLabel() {
    if (this.props.name !== "Inbox") {
      return <Label empty={true} circular color={this.props.project.color} style={{ marginRight: "8px" }} />;
    }
  }

  render() {
    return (
      <Menu.Item
        name={this.props.project.name}
        active={this.props.currentProject._id === this.props.project._id}
        onClick={this.handleItemClick}
        className="project"
      >
        <div className="project-contents">
          <div className="group">
            {this.renderLabel()}
            {this.renderName()}
          </div>
          {this.renderCounter()}
          {this.renderEditTools()}
        </div>
      </Menu.Item>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentProject: state.currentProject,
    numOfTodos: state.projectCounts[ownProps.project._id]
  };
};

export default connect(
  mapStateToProps,
  actions
)(CategoryLink);
