import { useEffect, useState } from "react";
import "./todoList.scss";
import { fetchTasks } from "../utils/apiCalls";
import { TaskInterface } from "../interfaces";
import { act } from "react-dom/test-utils";

const TodoList = () => {
  const [tasks, setTasks] = useState<TaskInterface[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterClicked, setIsFilterClicked] = useState<boolean>(false);
  const tasksPerPage = 3;

  useEffect(() => {
    act(() => {
      fetchTasks()
        .then((tasks) => {
          // console.log("Tasks:", tasks);
          setTasks(tasks);
        })
        .catch((error) => {
          console.error("Failed to fetch tasks:", error);
        });
    });
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedTasks = tasks
    ? tasks.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage)
    : [];

  return (
    <div className="todo-list">
      <h3 className="heading">To Do List</h3>
      <div
        className={`filter ${isFilterClicked ? "clicked" : ""}`}
        role="filter"
      >
        <a onClick={() => setIsFilterClicked(!isFilterClicked)}>Filter</a>
        <div
          className={`filter-elements ${isFilterClicked ? "" : "hide"}`}
          data-testid="filter-elements"
        >
          <label>
            <input type="checkbox" value="Incomplete" checked={false} />
            Incomplete
          </label>
          <label>
            <input type="checkbox" value="Complete" checked={false} />
            Complete
          </label>
        </div>
      </div>
      <div className="task-wrapper" role="display-tasks">
        {paginatedTasks.map((task, index) => {
          return (
            <div className="task" key={index} data-testid={`task${index + 1}`}>
              <p className="name">{task.name}</p>
              <p className="tag">Tag: {task.tag}</p>
              <p className="status">Status: {task.status}</p>
            </div>
          );
        })}
      </div>
      <div className="arrow-wrapper" role="navigation">
        <button
          className="previous"
          role="previous"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="next"
          role="next"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * tasksPerPage >= (tasks?.length || 0)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TodoList;
