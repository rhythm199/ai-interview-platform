import { screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockMatchMedia, goToCoding } from "../helpers";

describe("CodingScreen", () => {
  beforeEach(() => { mockMatchMedia(); jest.useFakeTimers(); });
  afterEach(() => jest.useRealTimers());
  it("coding header", () => { goToCoding(); expect(screen.getByText(/Coding challenge/i)).toBeInTheDocument(); });
  it("Two Sum problem", () => { goToCoding(); expect(screen.getByText("Two Sum")).toBeInTheDocument(); });
  it("examples", () => { goToCoding(); expect(screen.getByText(/nums\[0\] \+ nums\[1\]/i)).toBeInTheDocument(); });
  it("constraints", () => { goToCoding(); expect(screen.getByText(/Only one valid answer/i)).toBeInTheDocument(); });
  it("hint toggle", () => { goToCoding(); expect(screen.getByText(/Show hint/i)).toBeInTheDocument(); });
  it("line numbers", () => { goToCoding(); expect(screen.getAllByText("1").length).toBeGreaterThanOrEqual(1); });
  it("autosave", () => { goToCoding(); act(() => jest.advanceTimersByTime(1000)); expect(screen.getByText("Autosaved")).toBeInTheDocument(); });
  it("run code output", () => { goToCoding(); fireEvent.click(screen.getByRole("button", { name: /Run Code/i })); act(() => jest.advanceTimersByTime(1500)); expect(screen.getByText(/✓ Passed/i)).toBeInTheDocument(); });
  it("submit advances to next question", () => { goToCoding(); fireEvent.click(screen.getByRole("button", { name: /Submit Code/i })); expect(screen.getByText(/Question 6 of 6/i)).toBeInTheDocument(); });
  it("back button goes to interview", () => { goToCoding(); fireEvent.click(screen.getByRole("button", { name: /← Back/i })); expect(screen.getByText(/Question 5 of 6/i)).toBeInTheDocument(); });

  // Cover language change (lines 183-188)
  it("changes language via selector", () => {
    goToCoding();
    const langSelect = screen.getByRole("combobox");
    fireEvent.change(langSelect, { target: { value: "Python" } });
    expect(screen.getByText(/\.py/i)).toBeInTheDocument();
  });

  // Cover reset button (line 203)
  it("reset button restores starter code", () => {
    goToCoding();
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "// modified" } });
    fireEvent.click(screen.getByRole("button", { name: /Reset/i }));
    expect(textarea.value).not.toBe("// modified");
  });

  // Cover code editing
  it("typing in editor updates code", () => {
    goToCoding();
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "console.log('hello')" } });
    expect(textarea.value).toBe("console.log('hello')");
  });

  // Cover saving indicator transition
  it("shows Saving then Autosaved after code change", () => {
    goToCoding();
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "new code" } });
    expect(screen.getByText("Saving…")).toBeInTheDocument();
    act(() => jest.advanceTimersByTime(1000));
    expect(screen.getByText("Autosaved")).toBeInTheDocument();
  });
});
