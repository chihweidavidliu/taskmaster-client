import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Menu, Input, Button } from "semantic-ui-react";
import { sortableContainer, sortableElement } from "react-sortable-hoc";

import "./styles/Projects.css";
import CategoryLink from "./CategoryLink";
import * as actions from "../actions";

const ProjectSortableItem = sortableElement(({ editMode, colour, name, setting }) => (
  <CategoryLink editMode={editMode} colour={colour} name={name} setting={setting} />
));

const ProjectSortableContainer = sortableContainer(({ children }) => {
  return <div id="projects-list">{children}</div>;
});

class Projects extends Component {
  state = { editMode: false, colour: "", editButtonText: "Edit" };

  componentDidMount() {
    this.props.fetchTodoCount();
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    console.log("Sort ended");
    this.props.updateProjectOrder(oldIndex, newIndex);
  }

  renderSortableProjects() {
    if(this.props.auth) {
      const { projects } = this.props.auth;
      return projects.map((project, index) => {
        return (
          <ProjectSortableItem
            editMode={this.state.editMode}
            colour={this.state.colour}
            name={project}
            setting={this.props.setting}
            key={project}
            index={index}
          />
        )
      });
    }
  }
  renderProjects() {
    if (this.props.auth) {
      const { projects } = this.props.auth;
      return projects.map((project) => {
        return (
          <CategoryLink
            editMode={this.state.editMode}
            colour={this.state.colour}
            key={project}
            name={project}
            setting={this.props.setting}
          />
        );
      });
    }
  }

  renderInput(formProps) {
    return (
      <Input
        {...formProps.input}
        maxLength="20"
        size="mini"
        autoComplete="off"
        className="icon"
        icon="plus"
        placeholder="Add project..."
      />
    );
  }

  renderEditInstructions() {
    if (this.state.editMode === true) {
      return <p id="edit-instructions">Double-click to edit name</p>;
    }
  }

  handleEditClick = () => {
    if (this.state.editMode === false) {
      return this.setState({ editMode: true, colour: "teal", editButtonText: "Done" });
    }
    return this.setState({ editMode: false, colour: "", editButtonText: "Edit" });
  };

  onSubmit = async (formValues) => {
    const projectName = formValues.addProject;
    if (this.props.auth.projects.includes(projectName) || projectName === "Inbox") {
      return alert("You already have a project with this name. Please choose a different name.");
    }
    await this.props.addProject(projectName);
    this.props.reset();
    this.props.fetchTodoCount();
  };

  render() {
    return (
      <Menu.Item>
        <div className="projects-header">
          Projects
          <Button className={`basic tiny compact ${this.state.colour}`} onClick={this.handleEditClick}>
            {this.state.editButtonText}
          </Button>
        </div>
        {this.renderEditInstructions()}
        <Menu.Menu id="project-menu">
          <ProjectSortableContainer onSortEnd={this.onSortEnd}>
            {this.renderSortableProjects()}
          </ProjectSortableContainer>
          <Menu.Item>
            <form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <Field name="addProject" component={this.renderInput} />
            </form>
          </Menu.Item>
        </Menu.Menu>
      </Menu.Item>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

const wrapped = connect(
  mapStateToProps,
  actions
)(Projects);

export default reduxForm({ form: "projectForm" })(wrapped);
