import React from "react";
import AddTask from "../components/AddTask";
import TasktList from "../components/TasktList";

export default function Board() {
  return (
    <div className="board">
      <AddTask />
      <TasktList />
    </div>
  );
}
