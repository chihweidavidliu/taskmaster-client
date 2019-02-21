import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Header, Modal, Menu, Label, Icon } from "semantic-ui-react";
import DateTimePicker from 'react-datetime-picker';

import "components/styles/EditTodoModal.css";
import * as actions from "actions";

class EditTodoModal extends Component {
  state = { open: false };

  close = () => this.setState({ open: false });
  show = () => {
    this.setState({ open: true })
  };

  onDateChange = async date => {
    await this.props.editDueDate(this.props.todoId, date);
    // update order if in Agenda view
    if(this.props.currentView === "Agenda") {
      await this.props.fetchTodosByDueDate();
    }
    this.props.fetchTodoCount();
  }

  handleClearDate = () => {
    this.props.editDueDate(this.props.todoId, null);
  }

  handleItemClick = async (newProject) => {
    await this.props.updateTodoProject(this.props.todoId, this.props.category, newProject, this.props.indexInList);
    if(this.props.currentView === "Agenda") {
      await this.props.fetchTodosByDueDate();
    }
    // update todo count
    this.props.fetchTodoCount();
  }

  renderProjects() {
    if (this.props.auth) {
      return this.props.auth.projects.map((project) => {
        return (
          <Menu.Item
            key={project._id}
            name={project.name}
            active={project.name === this.props.category}
            onClick={() => {
              if(project.name !== this.props.category) {
                this.handleItemClick(project.name)
              }
            }}
            >
            <Label empty={true} circular color={project.color} style={{ marginRight: "8px" }} />
            {project.name}
          </Menu.Item>
        );
      });
    }
  }

  renderDateMessage() {
    if(this.props.dueDate !== null) {
      return <p>Currently selected due date (click to change): </p>
    }
    return <p>No due date selected. Choose a due date: </p>
  }

  renderClearDueDate() {
    if(this.props.dueDate !== null) {
      return <button className="ui mini compact button clear-dueDate" onClick={this.handleClearDate}>Clear due date</button>
    }
  }

  render() {
    const { open } = this.state;
    let determineDateStyle;
    let date;
    if(this.props.dueDate !== null) {
      determineDateStyle = "dueDate-active"
      date = new Date(this.props.dueDate);
    } else {
      determineDateStyle = "dueDate-inactive"
      date = new Date();
    }


    return (
      <Modal
        trigger={
          <Button basic compact size="mini" onClick={this.show}>
            Tools
          </Button>
        }
        open={open}
        onClose={this.close}
      >
        <Modal.Header className="modal-header">
          {this.props.title}
          <Modal.Actions>
            <Button color="green" onClick={this.close} >
              <Icon name="checkmark" /> Done
            </Button>
          </Modal.Actions>
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Assign to Project</Header>
            <p>Choose a Project:</p>
            <Menu stackable text id="project-picker">
              {this.renderProjects()}
            </Menu>
            <Header>Assign due date</Header>
            {this.renderDateMessage()}
            <div className="date-picker">
              <DateTimePicker
                disableClock={true}
                calendarIcon={null}
                minDate={new Date()}
                clearIcon={null}
                onChange={this.onDateChange}
                value={date}
                className={determineDateStyle}
              />
              {this.renderClearDueDate()}
            </div>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    currentView: state.category
  };
};

export default connect(mapStateToProps, actions)(EditTodoModal);
