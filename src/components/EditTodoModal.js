import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

const EditTodoModal = (props) => (
  <Modal trigger={<Button basic compact size="mini" >Tools</Button>}>
    <Modal.Header>{props.title}</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Header>Assign to Project</Header>
        <p>Choose a Project:</p>
        <Header>Assign due date</Header>
        <p>Choose a due date:</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default EditTodoModal;
