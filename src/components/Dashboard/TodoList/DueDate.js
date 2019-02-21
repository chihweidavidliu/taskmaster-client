import React from "react";

const DueDate = (props) => {
  let dateMessage;
  let  style;
  if (props.dueDate !== null) {
    // due date by date and time
    const date = new Date(props.dueDate).toLocaleString([], {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit"
    });
    const time = new Date(props.dueDate).toLocaleString([], { hour: "2-digit", minute: "2-digit", hour12: false });

    // relative values
    const today = new Date().toLocaleString([], {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit"
    });
    const tomorrow = new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toLocaleString([], {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit"
    });;

    const yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000)).toLocaleString([], {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit"
    });;

    // check for overdue
    const currentTime = new Date();
    const dueDate = new Date(props.dueDate);

    if(currentTime > dueDate) {
      // if overdue
      style="red";
      if(date === today) {
        dateMessage = `Overdue (today at ${time})`
      } else if(date === yesterday) {
        dateMessage = `Overdue (yesterday at ${time})`
      } else {
        dateMessage = `Overdue (${date} at ${time})`
      }
    } else if(date === today) {
      dateMessage = `Due today at ${time}`
    } else if(date === tomorrow) {
      dateMessage = `Due tomorrow at ${time}`
    } else {
      dateMessage = `Due ${date} at ${time}`;
    }
  }
  return <div className="dueDate-indicator" style={{ color: style }}>{dateMessage}</div>;
};

export default DueDate;
