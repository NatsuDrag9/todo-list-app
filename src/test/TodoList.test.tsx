import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import TodoList from "../components/TodoList.tsx";
import { fetchTasks } from "../utils/apiCalls.ts";
import { act } from "react-dom/test-utils";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("Initial render", () => {
  beforeEach(() => {
    render(<TodoList />);
  });

  test("Header must exist", () => {
    const hElement = screen.getByRole("heading", {
      name: /To Do List/,
      level: 3,
    });
    expect(hElement).toBeDefined();
  });

  test('div with role="filter" must exist and only first <p> element must be displayed', () => {
    const fElement = screen.getByRole("filter");
    expect(fElement).toBeDefined();

    const pElement = screen.getByText("Filter");
    expect(pElement).toBeDefined();

    expect(screen.getByTestId("filter-elements")).toHaveClass("hide");
  });

  // Ensure that the task wrapper exists in the DOM in both cases
  test("Task wrapper must exist", () => {
    const taskWrapperElement = screen.getByRole("display-tasks");
    expect(taskWrapperElement).toBeDefined();
  });

  test("Task should not exist when tasks is null", async () => {

    // Create an instance of axios-mock-adapter
    const mock = new MockAdapter(axios);

    // Mock the Axios request to return a response with null
    mock.onGet("../../task_list.json").reply(200, { tasks: null });

    await act(async () => {
      await fetchTasks();
    });
    // fetchTasks();
    const taskElement = screen.queryByTestId("task");
    expect(taskElement).toBeNull();

    // Restore the original Axios behavior
    mock.restore();
  });

  test("Arrow wrapper and arrows must exist", () => {
    act(() => {
      const arrowWrapperElement = screen.getByRole("navigation");
      expect(arrowWrapperElement).toBeDefined();

      const leftArrowElement = screen.getByRole("previous");
      expect(leftArrowElement).toBeDefined();

      const rightArrowElement = screen.getByRole("next");
      expect(rightArrowElement).toBeDefined();
    });
  });
});

describe("Test API Call", () => {

  test("fetchTasks returns a list of tasks on successful fetch", async () => {
    // Create an instance of axios-mock-adapter
    const mock = new MockAdapter(axios);

    // Mock the Axios request to return a predefined response
    mock.onGet("../../task_list.json").reply(200, {
      tasks: [{ name: "Task 1", tag: "Tag1", status: "Incomplete" }],
    });

    const tasks = await fetchTasks();
    expect(tasks).toEqual([
      { name: "Task 1", tag: "Tag1", status: "Incomplete" },
    ]);

    // Restore the original Axios behavior
    mock.restore();
  });

  test("fetchTasks handles fetch failure", async () => {
    // Create an instance of axios-mock-adapter
    const mock = new MockAdapter(axios);

    // Mock the Axios request to return an error response
    mock.onGet("../../task_list.json").reply(500);

    try {
      await fetchTasks();
    } catch (error) {
      expect(error.message).toEqual("Network Error");
    }

    // Restore the original Axios behavior
    mock.restore();
  });
});

describe("User interaction and functionality", () => {
  let mock:MockAdapter; 
  beforeEach(async () => {
    mock = new MockAdapter(axios);

    const mockTasks = [
      { name: "Task 1", tag: "Tag1", status: "Incomplete" },
      { name: "Task 2", tag: "Tag2", status: "Incomplete" },
      { name: "Task 3", tag: "Tag3", status: "Incomplete" },
      { name: "Task 4", tag: "Tag4", status: "Incomplete" },
      { name: "Task 5", tag: "Tag5", status: "Incomplete" },
      { name: "Task 6", tag: "Tag6", status: "Incomplete" },
    ];

    // Mock the Axios request to return a response with new tasks
    mock.onGet("../../task_list.json").reply(200, {
      tasks: mockTasks
    });

    // Render the component
    render(<TodoList />);

    // Wait for the tasks to be loaded (you can use findByTestId for the first task)
    await screen.findByTestId("task1");
  });

  test("Clicking filter should increase height and display filter elements", () => {
    fireEvent.click(screen.getByText("Filter"));
    expect(screen.getByRole("filter")).toHaveClass("filter clicked");
    expect(screen.getByTestId("filter-elements")).toHaveClass("filter-elements");
  })

  test("Checkboxes are unselected initially", () => {
    // Check the status checkboxes
    const incompleteCheckbox = screen.getByRole("checkbox", { name: "Incomplete" });
    const completeCheckbox = screen.getByRole("checkbox", { name: "Complete" });
    expect(incompleteCheckbox).not.toBeChecked();
    expect(completeCheckbox).not.toBeChecked();
  
    // Check the tag checkboxes (assuming there are some tags)
    const tagCheckboxes = screen.getAllByTestId("tag-checkbox");
    tagCheckboxes.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });
  });

  test("Clicking filter should display all filter elements", () => {
    
  })

  test("Clicking pagination buttons should display the correct tasks", async () => {
  
    // Initial page (page 1)
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.getByText("Task 3")).toBeInTheDocument();
    expect(screen.queryByText("Task 4")).toBeNull(); // Task 4 should not be visible
  
    // Click the "Next" button to go to page 2
    fireEvent.click(screen.getByText("Next"));
  
    // Wait for the component to update
    await waitFor(() => screen.getAllByTestId(/^task\d+$/));
  
    // Page 2
    expect(screen.getByText("Task 4")).toBeInTheDocument();
    expect(screen.getByText("Task 5")).toBeInTheDocument();
    expect(screen.getByText("Task 6")).toBeInTheDocument();
    expect(screen.queryByText("Task 1")).toBeNull(); // Task 1 should not be visible
  
    // Click the "Previous" button to go back to page 1
    fireEvent.click(screen.getByText("Previous"));
  
    // Wait for the component to update
    await waitFor(() => screen.getAllByTestId(/^task\d+$/));
  
    // Back to page 1
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.getByText("Task 3")).toBeInTheDocument();
    expect(screen.queryByText("Task 4")).toBeNull(); // Task 4 should not be visible
  });

  afterEach(async () => {
    // Restore the original Axios behavior
    mock.restore();
  })
});
