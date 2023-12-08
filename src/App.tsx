import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h3 className="heading">To Do List</h3>
      <div className="filter" role="filter">
        <p>Filter</p>
        <div
          className="filter-elements"
          style={{ display: "none" }}
          data-testid="filter-elements"
        ></div>
      </div>
      <div className="task-wrapper" role="display-tasks">
        <div className="task" data-testid="task"></div>
      </div>
      <div className="arrow-wrapper" role="navigation">
        <div className="left" role="left">Left</div>
        <div className="right" role="right">Right</div>
      </div>
    </div>
  );
}

export default App;
