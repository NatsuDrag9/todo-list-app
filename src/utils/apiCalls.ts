import { TaskInterface, TasksResponseInterface } from "../interfaces";

export async function fetchTasks(): Promise<TaskInterface[]> {
    try {
        const response = await fetch('../../task_list.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: TasksResponseInterface = await response.json();
        return data.tasks;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
}
