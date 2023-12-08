import { useEffect, useState } from "react";
import "./todoList.scss";
import { fetchTasks } from "../utils/apiCalls";
import { TaskInterface } from "../interfaces";

const TodoList = () => {
  const [tasks, setTasks] = useState<TaskInterface[] | null>(null);

  useEffect(() => {
    fetchTasks()
    .then((tasks) => {
      // console.log("Tasks:", tasks);
      setTasks(tasks);
    })
    .catch((error) => {
      console.error("Failed to fetch tasks:", error);
    });
  }, []);

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
        {tasks?.map((task, index) => {
          return (
            <div className="task" key={index} data-testid="task">
              <p className="name">{task.name}</p>
              <p className="tag">{task.tag}</p>
              <p className="status">{task.status}</p>
            </div>
          );
        })}
      </div>
      <div className="arrow-wrapper" role="navigation">
        <button className="left" role="left">
          Left
        </button>
        <button className="right" role="right">
          Right
        </button>
      </div>
    </div>
  );
};

export default TodoList;
