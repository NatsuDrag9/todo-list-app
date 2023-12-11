// import axios from '../test/axiosTestConfig';  // Uncomment this for testing
import axios from "axios"; // Uncomment this for production
import { TaskInterface, TasksResponseInterface } from "../interfaces";

export async function fetchTasks(): Promise<TaskInterface[]> {
  try {
    const response = await axios.get('../../task_list.json');

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    const data: TasksResponseInterface = response.data;
    return data.tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
}

