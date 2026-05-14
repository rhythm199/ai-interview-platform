import { screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockMatchMedia, goToSetup } from "../helpers";

describe("SetupScreen", () => {
  beforeEach(() => { mockMatchMedia(); jest.useFakeTimers(); });
  afterEach(() => jest.useRealTimers());
  it("step indicator", () => { goToSetup(); expect(screen.getByText("Step 2 of 3")).toBeInTheDocument(); });
  it("internet loading → ok", () => { goToSetup(); expect(screen.getByText("Checking…")).toBeInTheDocument(); act(() => jest.advanceTimersByTime(1000)); expect(screen.getByText("Connection is stable")).toBeInTheDocument(); });
  it("camera item", () => { goToSetup(); expect(screen.getByText("Camera")).toBeInTheDocument(); });
  it("mic item", () => { goToSetup(); expect(screen.getByText("Microphone")).toBeInTheDocument(); });
  it("guidelines", () => { goToSetup(); expect(screen.getByText("Interview guidelines")).toBeInTheDocument(); });
  it("back → details", () => { goToSetup(); fireEvent.click(screen.getByRole("button", { name: /Back/i })); expect(screen.getByText(/Tell us about yourself/i)).toBeInTheDocument(); });

  // Cover all guideline items (lines 62-103)
  it("renders all guideline items", () => {
    goToSetup();
    expect(screen.getByText(/Find a quiet/i)).toBeInTheDocument();
    expect(screen.getByText(/Keep your camera on/i)).toBeInTheDocument();
    expect(screen.getByText(/Speak clearly/i)).toBeInTheDocument();
    expect(screen.getByText(/skip or revisit/i)).toBeInTheDocument();
    expect(screen.getByText(/Stay on the tab/i)).toBeInTheDocument();
  });

  // Cover CheckItem statuses
  it("camera shows ok status when on", () => {
    goToSetup();
    expect(screen.getByText("Camera is on and working")).toBeInTheDocument();
  });

  it("mic shows ok status when on", () => {
    goToSetup();
    expect(screen.getByText("Audio input detected")).toBeInTheDocument();
  });

  // Cover camera toggle via checklist action button
  it("toggles camera off via checklist button", () => {
    goToSetup();
    fireEvent.click(screen.getByRole("button", { name: /Turn off/i }));
    expect(screen.getByText("Camera is disabled")).toBeInTheDocument();
  });

  // Cover mic toggle via checklist action button
  it("toggles mic via checklist button", () => {
    goToSetup();
    fireEvent.click(screen.getByRole("button", { name: /Mute/i }));
    expect(screen.getByText("Microphone is muted")).toBeInTheDocument();
  });
});
