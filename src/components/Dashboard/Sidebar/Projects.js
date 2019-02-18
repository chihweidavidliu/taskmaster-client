import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Menu, Input, Button } from "semantic-ui-react";
import { sortableContainer, sortableElement } from "react-sortable-hoc";

import "components/styles/Projects.css";
import CategoryLink from "components/Dashboard/Sidebar/CategoryLink";
import * as actions from "actions";

// Enhance components to make them sortable
const ProjectSortableItem = sortableElement((props) => (
  <CategoryLink {...props} />
));

const ProjectSortableContainer = sortableContainer(({ children }) => {
  return <div id="projects-list">{children}</div>;
});

// Projects component itself
class Projects extends Component {
  state = { editMode: false, accentColor: "", editButtonText: "Edit" };

  componentDidMount() {
    this.props.fetchTodoCount();
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.updateProjectOrder(oldIndex, newIndex);
  }

  renderProjects() {
    if(this.props.auth) {
      const { projects } = this.props.auth;
      return projects.map((project, index) => {
        if (this.state.editMode === true) {
          return (
            <ProjectSortableItem
              editMode={this.state.editMode}
              accentColor={this.state.accentColor}
              projectLabelColor={project.color}
              name={project.name}
              setting={this.props.setting}
              key={project._id}
              projectId={project._id}
              index={index}
            />
          )
        } else {
          return (
            <CategoryLink
              editMode={this.state.editMode}
              accentColor={this.state.accentColor}
              projectLabelColor={project.color}
              key={project._id}
              name={project.name}
              projectId={project._id}
              setting={this.props.setting}
            />
          )
        }
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
      return <p id="edit-instructions">Drag to reorder. Double-click to edit.</p>;
    }
  }

  handleEditClick = () => {
    if (this.state.editMode === false) {
      return this.setState({ editMode: true, accentColor: "teal", editButtonText: "Done" });
    }
    return this.setState({ editMode: false, accentColor: "", editButtonText: "Edit" });
  };

  onSubmit = async (formValues) => {
    const projectName = formValues.addProject;
    // get an array of project names only from the projects array
    const { projects } = this.props.auth;
    const projectNames = projects.map(project => {
      return project.name;
    })

    if (projectNames.includes(projectName) || projectName === "Inbox") {
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
          <Button className={`basic tiny compact ${this.state.accentColor}`} onClick={this.handleEditClick}>
            {this.state.editButtonText}
          </Button>
        </div>
        {this.renderEditInstructions()}
        <Menu.Menu id="project-menu">
          <ProjectSortableContainer onSortEnd={this.onSortEnd} useDragHandle>
            {this.renderProjects()}
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
