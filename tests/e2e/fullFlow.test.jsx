import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../../src/App";
import { mockMatchMedia } from "../helpers";

describe("E2E: Complete interview lifecycle", () => {
  beforeEach(() => mockMatchMedia());

  it("full flow: form → setup → answer → skip → code → summary → restart", () => {
    jest.useFakeTimers();
    render(<App />);

    // Landing → Details
    fireEvent.click(screen.getByRole("button", { name: /Start Interview/i }));
    fireEvent.change(screen.getByLabelText(/Full name/i), { target: { value: "E2E User" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "e2e@test.com" } });
    fireEvent.click(screen.getByRole("button", { name: /Continue/i }));

    // Setup → Start interview
    act(() => jest.advanceTimersByTime(1000));
    fireEvent.click(screen.getByRole("button", { name: /Start interview/i }));

    // Q1: Answer
    fireEvent.click(screen.getByRole("button", { name: /Start Answer/i }));
    act(() => jest.advanceTimersByTime(1500));
    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    // Q2-Q4: Skip (behavioral/technical questions)
    for (let i = 0; i < 3; i++) fireEvent.click(screen.getByRole("button", { name: /Skip/i }));

    // Q5: Coding screen — submit code directly
    expect(screen.getByText("Two Sum")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Submit Code/i }));

    // Q6: Also a coding question → lands on CodingScreen again — submit code
    fireEvent.click(screen.getByRole("button", { name: /Submit Code/i }));

    // Summary
    expect(screen.getByText(/Great job, E2E User!/i)).toBeInTheDocument();
    expect(screen.getByText("Overall score")).toBeInTheDocument();
    expect(screen.getByText("Submitted for review")).toBeInTheDocument();

    // Restart
    fireEvent.click(screen.getByRole("button", { name: /Start new interview/i }));
    expect(screen.getByText(/Interview smarter with/i)).toBeInTheDocument();

    jest.useRealTimers();
  });
});

describe("E2E: Header & theme", () => {
  beforeEach(() => mockMatchMedia());

  it("logo, nav steps, footer", () => {
    render(<App />);
    expect(screen.getByText("Platform-Hire")).toBeInTheDocument();
    expect(screen.getByText("Welcome")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Setup")).toBeInTheDocument();
    expect(screen.getByText("Interview")).toBeInTheDocument();
    expect(screen.getByText("Coding")).toBeInTheDocument();
    expect(screen.getByText("Summary")).toBeInTheDocument();
    expect(screen.getByText(/© 2026/i)).toBeInTheDocument();
  });

  it("theme toggle", () => {
    render(<App />);
    const btn = screen.getByRole("button", { name: /Toggle theme/i });
    const root = document.documentElement;
    const before = root.classList.contains("dark");
    fireEvent.click(btn);
    expect(root.classList.contains("dark")).not.toBe(before);
    fireEvent.click(btn);
    expect(root.classList.contains("dark")).toBe(before);
  });
});
