import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import * as actions from "../actions";
import "./styles/FormInput.css";

class FormInput extends React.Component {
  renderInput = (formProps) => {
    return (
      <div className="field">
        <h4>{formProps.label}</h4>
        <input
          {...formProps.input}
          autoComplete="off"
          placeholder="Add a todo"
        />
      </div>
    );
  }

  onSubmit = async (formValues) => {
    const todoText = formValues.todoInput; // get todo text
    await this.props.addTodo({text: todoText, category: this.props.category, _creator: this.props.auth._id }); // dispatch action creator
    this.props.reset(); // reset value of input
    this.props.fetchTodoCount(); // update number of todos for each category
  }

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
    category: state.category,
    auth: state.auth
  }
};
const wrapped = connect(mapStateToProps, actions) (FormInput);
export default reduxForm({ form: "todoForm" }) (wrapped);
