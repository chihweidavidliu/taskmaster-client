import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form"
import { Menu, Input, Button } from "semantic-ui-react";

import "./styles/Projects.css";
import CategoryLink from "./CategoryLink";
import * as actions from "../actions";

class Projects extends Component {
  state = { editMode: false, colour: "", editButtonText: "Edit" }

  renderProjects() {
    if(this.props.auth) {
      const { projects } = this.props.auth;
      return projects.map(project => {
        return (
          <CategoryLink editMode={this.state.editMode} key={project} name={project} setting={this.props.setting}>
          </CategoryLink>
        )
      })
    }
  }

  renderInput(formProps) {
    return(
      <Input
        {...formProps.input}
        maxLength="20"
        size="mini"
        autoComplete="off"
        className='icon'
        icon='plus'
        placeholder='Add project...'
      />
    )
  }

  renderEditInstructions() {
    if(this.state.editMode === true) {
      return <p id="edit-instructions">Double-click to edit name</p>
    }
  }

  handleEditClick = () => {
    if(this.state.editMode === false) {
      return this.setState({ editMode: true, colour: "teal", editButtonText: "Done" });
    }
    return this.setState({ editMode: false, colour: "", editButtonText: "Edit" });
  }

  onSubmit = (formValues) => {
    const projectName = formValues.addProject;
    this.props.addProject(projectName);
    this.props.reset();
  }

  render() {
    return (
      <Menu.Item>
      <div className="projects-header">
        Projects
        <Button
          className = {`basic tiny compact ${this.state.colour}`}
          onClick={this.handleEditClick}
        >
          {this.state.editButtonText}
        </Button>
      </div>
        {this.renderEditInstructions()}
        <Menu.Menu id="project-menu">
          {this.renderProjects()}
          <Menu.Item>
            <form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <Field name="addProject" component={this.renderInput} />
            </form>
          </Menu.Item>
        </Menu.Menu>
      </Menu.Item>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
};

const wrapped = connect(mapStateToProps, actions) (Projects);
export default reduxForm({ form: "projectForm" }) (wrapped);
