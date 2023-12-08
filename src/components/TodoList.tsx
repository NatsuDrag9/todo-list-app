import React, { useState } from "react";
import './todoList.scss';
import { fetchTasks } from "../utils/apiCalls";
import { TaskInterface } from "../interfaces";


const TodoList = () => {
  const [tasks, setTasks] = useState<TaskInterface[] | null>(null);

  fetchTasks()
    .then((tasks) => {
      // console.log("Tasks:", tasks);
      setTasks(tasks);
    })
    .catch((error) => {
      console.error("Failed to fetch tasks:", error);
    });
  return (
    <div className="todo-list">
      <h3 className="heading">To Do List</h3>
      <div className="filter" role="filter">
        <a>Filter</a>
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
        <div className="left" role="left">
          Left
        </div>
        <div className="right" role="right">
          Right
        </div>
      </div>
    </div>
  );
};

export default TodoList;
