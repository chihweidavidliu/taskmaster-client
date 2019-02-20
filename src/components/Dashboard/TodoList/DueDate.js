import React from "react";

const DueDate = (props) => {
  let dateMessage;
  if (props.dueDate !== null) {
    const date = new Date(props.dueDate).toLocaleString([], {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit"
    });
    const time = new Date(props.dueDate).toLocaleString([], { hour: "2-digit", minute: "2-digit", hour12: false });
    dateMessage = `Due ${date} at ${time}`;
  }
  return <div className="dueDate-indicator">{dateMessage}</div>;
};

export default DueDate;
