import React from "react";
import { Dropdown, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class PDFButton extends React.Component {
  handleClick = () => {
    const { todos, category } = this.props;

    const list = todos.map(todo => {
      const todoObject = { text: todo.text, style: "todo" };
      return todoObject;
    }); // get text only from the todos

    const today = new Date();
    const time = today.toLocaleTimeString("en-UK");
    const date = today.toLocaleDateString("en-UK");

    var docDefinition = {
      content: [
        { text: `My todos (${category})`, style: "header" },
        { ol: list },
      ],

      footer: {
        columns: [
          { text: "Created with TaskMaster", style: "footer" },
          { text: `Generated on: ${date} at ${time}`, alignment: "right", style: "footer" }
        ]
      },

      styles: {
        header: {
          fontSize: 30,
          bold: true
        },
        todo: {
          fontSize: 15,
          margin: [0, 10, 0, 0]
        },
        footer: {
          margin: [30, 0, 30, 0]
        }
      }
    };

    pdfMake.createPdf(docDefinition).download();
    return docDefinition;
  }

  render() {
    return (
      <Dropdown.Item compact onClick={this.handleClick}>
        <Icon name="file pdf"/>
        Export PDF
      </Dropdown.Item>
    )
  };
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    category: state.category
  };
};
export default connect(mapStateToProps) (PDFButton);
