import React, { Component } from "react";
import { Button, Header, Icon, Image, Modal, Label } from "semantic-ui-react";

import ColourChoiceLabel from "./ColourChoiceLabel";
import "./styles/EditProjectModal.css";

class EditProjectModal extends Component {
  state = { open: false };

  close = () => this.setState({ open: false });
  show = () => this.setState({ open: true });

  render() {
    const { open } = this.state;

    return (
      <Modal trigger={<Icon name="options" title="More options" onClick={this.show} />} open={open} onClose={this.close}>
        <Modal.Header className="modal-header">
          <div>
          <Label empty={true} circular color={this.props.color} style={{ marginRight: "10px" }} />
          {this.props.name}
          </div>
          <Modal.Actions>
            <Button color="green" onClick={this.close} >
              <Icon name="checkmark" /> Done
            </Button>
          </Modal.Actions>
        </Modal.Header>

        <Modal.Content>
          <Modal.Description>
            <Header>Assign Colour</Header>
            <p>Choose a colour:</p>
            <div className="label-picker">
              <ColourChoiceLabel color="teal" projectId={this.props.projectId} />
              <ColourChoiceLabel color="red" projectId={this.props.projectId} />
              <ColourChoiceLabel color="orange" projectId={this.props.projectId} />
              <ColourChoiceLabel color="yellow" projectId={this.props.projectId} />
              <ColourChoiceLabel color="olive" projectId={this.props.projectId} />
              <ColourChoiceLabel color="green" projectId={this.props.projectId} />
              <ColourChoiceLabel color="blue" projectId={this.props.projectId} />
              <ColourChoiceLabel color="violet" projectId={this.props.projectId} />
              <ColourChoiceLabel color="purple" projectId={this.props.projectId} />
              <ColourChoiceLabel color="pink" projectId={this.props.projectId} />
              <ColourChoiceLabel color="brown" projectId={this.props.projectId} />
              <ColourChoiceLabel color="grey" projectId={this.props.projectId} />
              <ColourChoiceLabel color="black" projectId={this.props.projectId} />
            </div>
            <Header>Assign a Background Image</Header>
            <p>Choose a background image:</p>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}
export default EditProjectModal;
