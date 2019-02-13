import React from 'react'
import { Button, Header, Icon, Image, Modal, Label } from 'semantic-ui-react'

const EditProjectModal = (props) => (
  <Modal trigger={<Icon name="options" />}>
      <Modal.Header>
        <Label empty={true} circular color={props.colour} style={{ marginRight: "10px" }}/>
        {props.title}
      </Modal.Header>

    <Modal.Content>
      <Modal.Description>
        <Header>Assign Colour</Header>
        <p>Choose a colour:</p>
        <Header>Assign a Background Image</Header>
        <p>Choose a background image:</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default EditProjectModal;
