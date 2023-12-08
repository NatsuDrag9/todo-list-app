export interface TaskInterface {
    name: string;
    tag: string;
    status: string;
}

export interface TasksResponseInterface {
    tasks: TaskInterface[];
}