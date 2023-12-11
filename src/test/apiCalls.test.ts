import { beforeEach, describe, expect, test } from "vitest";
import { fetchTasks } from "../utils/apiCalls.ts";
import MockAdapter from "axios-mock-adapter";
import axios from "./axiosTestConfig.ts";

describe("Test API Call", () => {
  let mock: MockAdapter;
  beforeEach(() => {
    // Create an instance of axios-mock-adapter
    mock = new MockAdapter(axios);
  });

  test("fetchTasks returns a list of tasks on successful fetch", async () => {
    // Mock the Axios request to return a predefined response
    mock.onGet("/task_list.json").reply(200, {
      tasks: [{ name: "Task 1", tag: "Tag1", status: "Incomplete" }],
    });

    const tasks = await fetchTasks();
    expect(tasks).toEqual([
      { name: "Task 1", tag: "Tag1", status: "Incomplete" },
    ]);
  });

  test("fetchTasks handles fetch failure", async () => {
    // Mock the Axios request to return an error response
    mock.onGet("/task_list.json").reply(500);

    try {
      await fetchTasks();
    } catch (error) {
      expect((error as Error).message).toBeFalsy();
    }
  });

  afterEach(() => {
    // Restore the original Axios behavior
    mock.restore();
  });
});