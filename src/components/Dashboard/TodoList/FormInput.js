import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import * as actions from "actions";
import "components/styles/FormInput.css";

class FormInput extends React.Component {
  renderInput = (formProps) => {
    return (
      <div className="field">
        <h4>{formProps.label}</h4>
        <input {...formProps.input} autoComplete="off" placeholder="Add a todo" />
      </div>
    );
  };

  onSubmit = async (formValues) => {
    const todoText = formValues.todoInput; // get todo text
    if (this.props.currentProject.id === "Agenda") {
      await this.props.addTodo({
        text: todoText,
        project: "Inbox",
        _creator: this.props.auth._id,
        dueDate: new Date(new Date().getTime() + 1 * 60 * 60 * 1000)
      }); // dispatch action creator
      await this.props.fetchTodosByDueDate();
    } else {
      await this.props.addTodo({
        text: todoText,
        project: this.props.currentProject._id,
        _creator: this.props.auth._id
      }); // dispatch action creator
    }
    this.props.reset(); // reset value of input
    this.props.fetchTodoCount(); // update number of todos for each project
  };

  render() {
    return (
      <form id="todoForm" className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="todoInput" component={this.renderInput} />
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentProject: state.currentProject,
    auth: state.auth
  };
};
const wrapped = connect(
  mapStateToProps,
  actions
)(FormInput);
export default reduxForm({ form: "todoForm" })(wrapped);
