import { useState } from "react";
import "./App.css";
import { fetchTasks } from "./utils/apiCalls";
import { TaskInterface } from "./interfaces";
import TodoList from "./components/TodoList";

function App() {
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
    <div className="app" role="application">
     <TodoList />
    </div>
  );
}

export default App;
