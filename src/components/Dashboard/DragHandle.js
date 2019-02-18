import React from "react";
import { sortableHandle } from "react-sortable-hoc";

const DragHandle = sortableHandle(() => (
  <i className="fas fa-grip-vertical" aria-label="Drag to reorder" title="Drag to reorder" />
));

export default DragHandle;
