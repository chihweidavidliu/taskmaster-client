import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { addTodo } from "../actions";
import "./styles/FormInput.css";

class FormInput extends React.Component {
  renderInput = (formProps) => {
    return (
      <div className="field">
        <h4>{formProps.label}</h4>
        <input
          {...formProps.input}
          autoComplete="off"
          placeholder="Enter todo"
        />
      </div>
    );
  }

  onSubmit = (formValues) => {
    const todoText = formValues.todoInput; // get todo text
    this.props.addTodo(todoText); // dispatch action creator
    this.props.reset(); // reset value of input
  }

  render() {
    return (
      <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="todoInput" component={this.renderInput} />
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.category
  }
};
const wrapped = connect(mapStateToProps, { addTodo: addTodo }) (FormInput);
export default reduxForm({ form: "FormInput" }) (wrapped);
