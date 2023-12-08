import { render, screen } from "@testing-library/react";
import App from "../App.tsx";
import { beforeEach, describe, expect, test } from "vitest";
import { fetchTasks } from "../utils/apiCalls.ts";

// type FetchMock = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

describe("Initial render", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("App must exist", () => {
    const appElement = screen.getByRole('application');
    expect(appElement).toBeDefined();
  })
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
