import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockMatchMedia, goToSummary } from "../helpers";

describe("SummaryScreen", () => {
  beforeEach(() => { mockMatchMedia(); jest.useFakeTimers(); });
  afterEach(() => jest.useRealTimers());
  it("candidate greeting", () => { goToSummary("Alice"); expect(screen.getByText(/Great job, Alice!/i)).toBeInTheDocument(); });
  it("submitted badge", () => { goToSummary(); expect(screen.getByText("Submitted for review")).toBeInTheDocument(); });
  it("score cards", () => { goToSummary(); expect(screen.getByText("Overall score")).toBeInTheDocument(); expect(screen.getByText("Questions attempted")).toBeInTheDocument(); expect(screen.getByText("Time taken")).toBeInTheDocument(); });
  it("AI evaluation", () => { goToSummary(); expect(screen.getByText("AI Evaluation")).toBeInTheDocument(); expect(screen.getByText("Technical knowledge")).toBeInTheDocument(); });
  it("strengths", () => { goToSummary(); expect(screen.getByText(/Clear and structured/i)).toBeInTheDocument(); });
  it("improvements", () => { goToSummary(); expect(screen.getByText(/Could elaborate more/i)).toBeInTheDocument(); });
  it("candidate info", () => { goToSummary("Bob","bob@x.com"); expect(screen.getAllByText("Bob").length).toBeGreaterThanOrEqual(1); expect(screen.getByText("bob@x.com")).toBeInTheDocument(); });
  it("next steps", () => { goToSummary(); expect(screen.getByText("What's next?")).toBeInTheDocument(); });
  it("restart → landing", () => { goToSummary(); fireEvent.click(screen.getByRole("button", { name: /Start new interview/i })); expect(screen.getByText(/Interview smarter with/i)).toBeInTheDocument(); });

  // Cover Download button (line 191 — window.print)
  it("download button calls window.print", () => {
    goToSummary();
    window.print = jest.fn();
    fireEvent.click(screen.getByRole("button", { name: /Download/i }));
    expect(window.print).toHaveBeenCalled();
  });

  // Cover all breakdown bars
  it("shows all performance breakdown bars", () => {
    goToSummary();
    expect(screen.getByText("Communication clarity")).toBeInTheDocument();
    expect(screen.getByText("Problem solving")).toBeInTheDocument();
    expect(screen.getByText("Coding proficiency")).toBeInTheDocument();
    expect(screen.getByText("Cultural fit signals")).toBeInTheDocument();
  });

  // Cover question tracker grid
  it("shows question tracker grid", () => {
    goToSummary();
    // All 6 questions should have grid items
    const gridItems = document.querySelectorAll('[title^="Q"]');
    expect(gridItems.length).toBe(6);
  });

  // Cover candidate role and skills display
  it("shows candidate role and skills", () => {
    goToSummary();
    expect(screen.getByText("Frontend Engineer")).toBeInTheDocument();
  });
});
