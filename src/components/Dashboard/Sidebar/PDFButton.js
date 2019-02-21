import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class PDFButton extends React.Component {
  handleClick = () => {
    const { todos, category } = this.props;

    const list = todos.map((todo) => {
      let todoObject;
      if(todo.dueDate !== null) {
        const date = new Date(todo.dueDate).toLocaleString([], {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit"
        });
        const time = new Date(todo.dueDate).toLocaleString([], { hour: "2-digit", minute: "2-digit", hour12: false });

        todoObject = { text: [{ text: `${todo.text}`, style: "todo"}, { text: `   (due on ${date} at ${time})`, style: "dueDate" }]};
        return todoObject
      }
      todoObject = { text: todo.text, style: "todo" };
      return todoObject;
    }); // get text only from the todos

    const today = new Date();
    const time = today.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
    const date = today.toLocaleDateString("en-GB");

    var docDefinition = {
      content: [{ text: `My todos (${category})`, style: "header" }, { ol: list }],

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
        dueDate: {
          fontSize: 10,
          margin: [0, 10, 0, 0]
        },
        footer: {
          margin: [30, 0, 30, 0]
        }
      }
    };

    pdfMake.createPdf(docDefinition).download();
    return docDefinition;
  };

  render() {
    return (
      <Menu.Item onClick={this.handleClick}>
        <div className="tool-group">
          <Icon name="file pdf" />
          Export "{this.props.category}" as PDF
        </div>
      </Menu.Item>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    category: state.category
  };
};
export default connect(mapStateToProps)(PDFButton);
