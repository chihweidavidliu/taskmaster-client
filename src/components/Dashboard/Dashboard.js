import React, { Component } from "react";
import { connect } from "react-redux";

import requireAuth from "requireAuth";
import Navbar from "components/Dashboard/Navbar";
import Sidebar from "components/Dashboard/Sidebar/Sidebar";
import TodoContainer from "components/Dashboard/TodoList/TodoContainer";
import FormInput from "components/Dashboard/TodoList/FormInput";
import TodoList from "components/Dashboard/TodoList/TodoList";
import "components/styles/Dashboard.css";

class Dashboard extends Component {
  renderInstructions() {
    if(this.props.category === "Agenda") {
      return <p id="instructions">Todos added from the agenda are sent to the Inbox and given a default due date (one hour from now)</p>
    }
    return <p id="instructions">Drag to reorder. Double-click text to edit</p>;
  }
  render() {
    return (
      <div className="dashboard-wrapper">
        <Navbar />
        <div className="ui stackable grid">
          <Sidebar />
          <TodoContainer>
            <h3>{this.props.category}</h3>
            <FormInput />
            {this.renderInstructions()}
            <TodoList />
          </TodoContainer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.category,
    auth: state.auth
  };
};
export default connect(mapStateToProps)(requireAuth(Dashboard));
