import { useEffect, useState } from "react";
import "./todoList.scss";
import { fetchTasks } from "../utils/apiCalls";
import { TaskInterface } from "../interfaces";
import { act } from "react-dom/test-utils";
import { statusData } from "../misc/data";

const TodoList = () => {
  const [tasks, setTasks] = useState<TaskInterface[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterClicked, setIsFilterClicked] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
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

  const toggleStatusFilter = (status: string) => {
    // Toggle the selected status
    if (selectedStatus.includes(status)) {
      setSelectedStatus(selectedStatus.filter((s) => s !== status));
    } else {
      setSelectedStatus([...selectedStatus, status]);
    }
  };

  const toggleTagFilter = (tag: string) => {
    // Toggle the selected tag
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Filter tasks based on selected status and tags
  const filteredTasks = tasks
    ? tasks.filter(
        (task) =>
          (selectedStatus.length === 0 ||
            selectedStatus.includes(task.status)) &&
          (selectedTags.length === 0 || selectedTags.includes(task.tag))
      )
    : [];

  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  // const paginatedTasks = tasks
  //   ? tasks.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage)
  //   : [];

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
          <div className="status-wrapper">
            <h4>Status: </h4>
            <div className="checkbox-wrapper">
              {statusData.map((status) => {
                return (
                  <label>
                    <input
                      type="checkbox"
                      value={status}
                      checked={selectedStatus.includes(status)}
                      onChange={() => toggleStatusFilter(status)}
                    />
                    {status}
                  </label>
                );
              })}
            </div>
          </div>
          <div className="tags-wrapper">
            <h4>Tags: </h4>
            <div className="checkbox-wrapper">
              {tasks &&
                Array.from(new Set(tasks.map((task) => task.tag))).map(
                  (tag) => (
                    <label key={tag}>
                      <input
                        type="checkbox"
                        value={tag}
                        checked={selectedTags.includes(tag)}
                        onChange={() => toggleTagFilter(tag)}
                        // data-testid="tag-checkbox"
                      />
                      {tag}
                    </label>
                  )
                )}
            </div>
          </div>
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
