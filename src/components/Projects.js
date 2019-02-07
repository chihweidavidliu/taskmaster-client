import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form"
import { Menu, Input } from "semantic-ui-react";
import CategoryLink from "./CategoryLink";
import * as actions from "../actions";

class Projects extends Component {
  renderProjects() {
    if(this.props.auth) {
      const { projects } = this.props.auth;
      return projects.map(project => {
        return <CategoryLink name={project} />
      })
    }
  }

  renderInput(formProps) {
    return(
      <Input
        {...formProps.input}
        size="mini"
        autoComplete="off"
        className='icon'
        icon='plus'
        placeholder='Add...'
      />
    )
  }

  onSubmit = (formValues) => {
    const projectName = formValues.addProject;
    console.log(projectName);
    this.props.addProject(projectName);
    this.props.reset();
  }

  render() {
    return (
      <Menu.Item>
        Projects
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
