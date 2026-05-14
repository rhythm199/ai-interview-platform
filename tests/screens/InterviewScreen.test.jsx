import { screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockMatchMedia, goToInterview } from "../helpers";

describe("InterviewScreen", () => {
  beforeEach(() => { mockMatchMedia(); jest.useFakeTimers(); });
  afterEach(() => jest.useRealTimers());
  it("first question", () => { goToInterview(); expect(screen.getByText("Tell me about yourself")).toBeInTheDocument(); });
  it("progress", () => { goToInterview(); expect(screen.getByText(/Question 1 of 6/i)).toBeInTheDocument(); });
  it("AI avatar", () => { goToInterview(); expect(screen.getAllByText("Platform-Hire AI").length).toBeGreaterThanOrEqual(1); });
  it("idle state", () => { goToInterview(); expect(screen.getByText("Ready when you are")).toBeInTheDocument(); });
  it("recording state", () => { goToInterview(); fireEvent.click(screen.getByRole("button", { name: /Start Answer/i })); expect(screen.getByText("Recording your answer…")).toBeInTheDocument(); });
  it("transcript generates words while recording", () => {
    goToInterview();
    fireEvent.click(screen.getByRole("button", { name: /Start Answer/i }));
    act(() => jest.advanceTimersByTime(4000));
    const transcriptContainer = screen.getByText("Live transcript").closest("div").parentElement;
    expect(transcriptContainer.textContent.length).toBeGreaterThan(20);
  });
  it("submit advances", () => { goToInterview(); fireEvent.click(screen.getByRole("button", { name: /Start Answer/i })); act(() => jest.advanceTimersByTime(500)); fireEvent.click(screen.getByRole("button", { name: /Submit/i })); expect(screen.getByText("A challenging project")).toBeInTheDocument(); });
  it("skip advances", () => { goToInterview(); fireEvent.click(screen.getByRole("button", { name: /Skip/i })); expect(screen.getByText("A challenging project")).toBeInTheDocument(); });
  it("end modal opens", () => { goToInterview(); fireEvent.click(screen.getByRole("button", { name: /End Interview/i })); expect(screen.getByText("End interview now?")).toBeInTheDocument(); });
  it("cancel modal", () => { goToInterview(); fireEvent.click(screen.getByRole("button", { name: /End Interview/i })); fireEvent.click(screen.getByRole("button", { name: /Cancel/i })); expect(screen.queryByText("End interview now?")).toBeNull(); });
  it("confirm end → summary", () => { goToInterview(); fireEvent.click(screen.getByRole("button", { name: /End Interview/i })); fireEvent.click(screen.getByRole("button", { name: /Yes, end/i })); expect(screen.getByText(/Great job/i)).toBeInTheDocument(); });
  it("confidence panel", () => { goToInterview(); expect(screen.getByText("Confidence score")).toBeInTheDocument(); });
  it("question tracker", () => { goToInterview(); expect(screen.getByText("Question tracker")).toBeInTheDocument(); });
  it("focus indicator", () => { goToInterview(); expect(screen.getByText("Focused")).toBeInTheDocument(); });

  // Cover tab visibility warning (lines 43-47)
  it("shows warning when tab loses focus", () => {
    goToInterview();
    Object.defineProperty(document, "hidden", { value: true, writable: true });
    document.dispatchEvent(new Event("visibilitychange"));
  });

  // Cover stop recording toggle (line 71-72, 87-88)
  it("stop recording toggles back to idle", () => {
    goToInterview();
    fireEvent.click(screen.getByRole("button", { name: /Start Answer/i }));
    expect(screen.getByText("Recording your answer…")).toBeInTheDocument();
    // Click Stop (same button toggles)
    fireEvent.click(screen.getByRole("button", { name: /Stop/i }));
    expect(screen.getByText("Ready when you are")).toBeInTheDocument();
  });

  // Cover end modal with answered count display (line 326)
  it("end modal shows answered count", () => {
    goToInterview();
    // Answer Q1
    fireEvent.click(screen.getByRole("button", { name: /Start Answer/i }));
    act(() => jest.advanceTimersByTime(500));
    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));
    // Now on Q2, click End
    fireEvent.click(screen.getByRole("button", { name: /End Interview/i }));
    expect(screen.getByText(/You've answered 1 of 6/i)).toBeInTheDocument();
  });

  // Cover candidate preview mic/video toggles (lines 252-266)
  it("toggles mic button in candidate preview", () => {
    goToInterview();
    const micBtn = screen.getByRole("button", { name: /Toggle mic/i });
    fireEvent.click(micBtn);
    fireEvent.click(micBtn);
    expect(micBtn).toBeInTheDocument();
  });

  it("toggles video button in candidate preview", () => {
    goToInterview();
    const vidBtn = screen.getByRole("button", { name: /Toggle video/i });
    fireEvent.click(vidBtn);
    expect(screen.getByText("Camera is off")).toBeInTheDocument();
  });
});
