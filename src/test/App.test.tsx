import { render, screen } from "@testing-library/react";
import App from "../App.tsx";
import { beforeEach, describe, expect, test } from "vitest";

describe("Initial render", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("App must exist", () => {
    const appElement = screen.getByRole('application');
    expect(appElement).toBeDefined();
  })
});


