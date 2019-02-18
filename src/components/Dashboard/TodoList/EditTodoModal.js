import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Header, Modal, Menu, Label, Icon } from "semantic-ui-react";
import "components/styles/EditTodoModal.css";
import * as actions from "actions";

class EditTodoModal extends Component {
  state = { open: false };

  close = () => this.setState({ open: false });
  show = () => this.setState({ open: true });

  handleItemClick = async (newProject) => {
    await this.props.updateTodoProject(this.props.todoId, this.props.category, newProject, this.props.indexInList);
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

  render() {
    const { open } = this.state;
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
            <p>Choose a due date:</p>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, actions)(EditTodoModal);
