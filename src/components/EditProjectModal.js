import React from "react";
import { Button, Header, Icon, Image, Modal, Label } from "semantic-ui-react";

import ColourChoiceLabel from "./ColourChoiceLabel";
import "./styles/EditProjectModal.css";

const EditProjectModal = (props) => (
  <Modal trigger={<Icon name="options" />}>
    <Modal.Header>
      <Label empty={true} circular color={props.colour} style={{ marginRight: "10px" }} />
      {props.title}
    </Modal.Header>

    <Modal.Content>
      <Modal.Description>
        <Header>Assign Colour</Header>
        <p>Choose a colour:</p>
        <div className="label-picker">
          <ColourChoiceLabel color="teal" />
          <ColourChoiceLabel color="red" />
          <ColourChoiceLabel color="orange" />
          <ColourChoiceLabel color="yellow" />
          <ColourChoiceLabel color="olive" />
          <ColourChoiceLabel color="green" />
          <ColourChoiceLabel color="blue" />
          <ColourChoiceLabel color="violet" />
          <ColourChoiceLabel color="purple" />
          <ColourChoiceLabel color="pink" />
          <ColourChoiceLabel color="brown" />
          <ColourChoiceLabel color="grey" />
          <ColourChoiceLabel color="black" />
        </div>
        <Header>Assign a Background Image</Header>
        <p>Choose a background image:</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default EditProjectModal;
