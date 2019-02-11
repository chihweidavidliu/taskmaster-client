import React, { Component } from "react";
import { connect } from "react-redux";

import requireAuth from "../requireAuth";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import TodoContainer from "./TodoContainer";
import FormInput from "./FormInput"
import TodoList from "./TodoList";
import "./styles/Dashboard.css";


class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard-wrapper">
        <Navbar />
        <div className = "ui stackable grid">
          <Sidebar />
          <TodoContainer>
              <h3>{this.props.category}</h3>
              <FormInput />
              <p id="instructions">Drag to reorder. Double-click text to edit</p>
              <TodoList />
          </TodoContainer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.category
  }
};
export default connect(mapStateToProps) (requireAuth(Dashboard));
