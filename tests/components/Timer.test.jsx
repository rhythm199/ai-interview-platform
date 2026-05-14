import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QuestionTimer, ElapsedTimer } from "../../src/components/Timer";

describe("QuestionTimer", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("displays formatted time", () => { render(<QuestionTimer limitSec={90} running={false} />); expect(screen.getByText("01:30")).toBeInTheDocument(); expect(screen.getByText("Time left")).toBeInTheDocument(); });
  it("counts down", () => { render(<QuestionTimer limitSec={5} running={true} />); act(() => jest.advanceTimersByTime(2000)); expect(screen.getByText("00:03")).toBeInTheDocument(); });
  it("onExpire at zero", () => { const fn = jest.fn(); render(<QuestionTimer limitSec={2} running={true} onExpire={fn} />); act(() => jest.advanceTimersByTime(3000)); expect(fn).toHaveBeenCalled(); });
  it("no countdown when stopped", () => { render(<QuestionTimer limitSec={60} running={false} />); act(() => jest.advanceTimersByTime(5000)); expect(screen.getByText("01:00")).toBeInTheDocument(); });
  it("red below 30s", () => { render(<QuestionTimer limitSec={25} running={false} />); expect(screen.getByText("00:25").className).toContain("text-red-500"); });
  it("resets on prop change", () => { const { rerender } = render(<QuestionTimer limitSec={60} running={false} />); rerender(<QuestionTimer limitSec={120} running={false} />); expect(screen.getByText("02:00")).toBeInTheDocument(); });
});

describe("ElapsedTimer", () => {
  it("placeholder when null", () => { render(<ElapsedTimer startedAt={null} />); expect(screen.getByText("--:--")).toBeInTheDocument(); });
  it("shows elapsed", () => { render(<ElapsedTimer startedAt={Date.now() - 65000} />); expect(screen.getByText(/00:01:0/)).toBeInTheDocument(); });
});
