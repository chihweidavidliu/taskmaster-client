import React, { Component } from "react";
import { connect } from "react-redux";
import { Popup, Button } from "semantic-ui-react";

import requireAuth from "requireAuth";
import Navbar from "components/Dashboard/Navbar";
import Sidebar from "components/Dashboard/Sidebar/Sidebar";
import TodoContainer from "components/Dashboard/TodoList/TodoContainer";
import FormInput from "components/Dashboard/TodoList/FormInput";
import TodoList from "components/Dashboard/TodoList/TodoList";
import "components/styles/Dashboard.css";

class Dashboard extends Component {
  renderPopupMessage() {
    if (this.props.currentProject.id === "Inbox") {
      return (
        <React.Fragment>
          <p>
            Use the Inbox to add incoming todos to be sorted later into their relevant projects. You should make it a
            habit to sort through your inbox for maximum productivity.
          </p>
          <p>Drag the todo handle :: to reorder. Double-click todo text to edit content.</p>
        </React.Fragment>
      );
    } else if (this.props.currentProject.id === "Agenda") {
      return (
        <p>
          The Agenda gathers all todos with a due date and sorts them by imminence. Todos added from the agenda view are
          by default sent to the Inbox and given a due date of one hour from now.
        </p>
      );
    } else {
      return <p>Drag the todo handle :: to reorder. Double-click todo text to edit content.</p>;
    }
  }

  render() {
    return (
      <div className="dashboard-wrapper">
        <Navbar />
        <div className="ui stackable grid">
          <Sidebar />
          <TodoContainer>
            <div className="todolist-header">
              <h3>{this.props.currentProject.name}</h3>
              <Popup trigger={<Button size="mini" compact basic circular inverted icon="info" />} on="hover">
                {this.renderPopupMessage()}
              </Popup>
            </div>
            <FormInput />
            <p id="instructions">Drag the todo handle to reorder. Double-click text to edit content.</p>
            <TodoList />
          </TodoContainer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentProject: state.currentProject,
    auth: state.auth
  };
};
export default connect(mapStateToProps)(requireAuth(Dashboard));
