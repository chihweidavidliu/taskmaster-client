import React, { Component } from "react";
import { Button, Header, Icon, Image, Modal, Label } from "semantic-ui-react";
import { connect } from "react-redux";

import ColourChoiceLabel from "./ColourChoiceLabel";
import "./styles/EditProjectModal.css";

class EditProjectModal extends Component {
  state = { open: false };

  close = () => this.setState({ open: false });
  show = () => this.setState({ open: true });

  renderColorChoices() {
    const colors = ["teal", "red", "orange", "yellow", "olive", "green", "blue", "violet", "purple", "pink", "brown", "grey", "black"];
    return colors.map(color => {
      // if the current color is the same as the label being rendered, set it as active
      if(this.props.color === color) {
        return <ColourChoiceLabel key={color} active={true} color={color} projectId={this.props.projectId} />
      }
      return <ColourChoiceLabel key={color} active={false} color={color} projectId={this.props.projectId} />
    });
  }
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
              {this.renderColorChoices()}
            </div>
            <Header>Assign a Background Image</Header>
            <p>Choose a background image:</p>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    projects: state.auth.projects
  }
}
export default connect(mapStateToProps) (EditProjectModal);
