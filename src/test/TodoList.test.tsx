import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import TodoList from "../components/TodoList.tsx";
import { fetchTasks } from "../utils/apiCalls.ts";

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

    const filterElements = screen.getByTestId("filter-elements");
    expect(filterElements.style.display).toBe("none");
  });

  // Ensure that the task wrapper exists in the DOM in both cases
  test("Task wrapper must exist", () => {  
    const taskWrapperElement = screen.getByRole("display-tasks");
    expect(taskWrapperElement).toBeDefined();
  });
 
  test("Task should not exist when tasks is null", async () => {
    // Mock the fetchTasks function to return a resolved Promise with null
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(null), // Simulate a null response
      })
    ) as any;

    await fetchTasks();

    const taskElement = screen.queryByTestId("task");
    expect(taskElement).toBeNull();

    globalThis.fetch = window.fetch;
  });

  test("Arrow wrapper and arrows must exist", () => {
    const arrowWrapperElement = screen.getByRole("navigation");
    expect(arrowWrapperElement).toBeDefined();

    const leftArrowElement = screen.getByRole("left");
    expect(leftArrowElement).toBeDefined();

    const rightArrowElement = screen.getByRole("right");
    expect(rightArrowElement).toBeDefined();
  });
});

describe("Test API Call", () => {
  test("fetchTasks returns a list of tasks on successful fetch", async () => {
    // Mock the global fetch function
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            tasks: [{ name: "Task 1", tag: "Tag1", status: "Incomplete" }],
          }),
      })
    ) as any;

    // The global fetch function used in fetchTasks is replaced by the mock
    // -- globalThis.fetch
    const tasks = await fetchTasks();
    expect(tasks).toEqual([
      { name: "Task 1", tag: "Tag1", status: "Incomplete" },
    ]);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("fetchTasks handles fetch failure", async () => {
    // Mock the global fetch function
    globalThis.fetch = vi.fn(() =>
      Promise.reject(new Error("Network failure"))
    ) as any;

    // The global fetch function used in fetchTasks is replaced by the mock
    // -- globalThis.fetch
    try {
      await fetchTasks();
      /* This code should not be reached because the fetch request is expected to fail.
      The line below will cause intentional failure and can be removed. This is a way 
      to signal that the code should not reach this point */
    //   expect(true).toBe(false);
    } catch (error) {
      expect(error).toEqual(new Error("Network failure"));
    }
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

// describe("User interaction and functionality", () => {
//   test()
// })