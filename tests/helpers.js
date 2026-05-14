import { render, screen, fireEvent, act } from "@testing-library/react";
import { InterviewProvider } from "../src/context/InterviewContext";
import App from "../src/App";

export function mockMatchMedia() {
  window.matchMedia = jest.fn().mockImplementation((q) => ({
    matches: false, media: q, onchange: null,
    addListener: jest.fn(), removeListener: jest.fn(),
    addEventListener: jest.fn(), removeEventListener: jest.fn(), dispatchEvent: jest.fn(),
  }));
}

export function Wrapper({ children }) {
  return <InterviewProvider>{children}</InterviewProvider>;
}

export function goToDetails() {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: /Start Interview/i }));
}

export function goToSetup() {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: /Start Interview/i }));
  fireEvent.change(screen.getByLabelText(/Full name/i), { target: { value: "Alex" } });
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "a@b.com" } });
  fireEvent.click(screen.getByRole("button", { name: /Continue/i }));
}

export function goToInterview() {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: /Start Interview/i }));
  fireEvent.change(screen.getByLabelText(/Full name/i), { target: { value: "Alex Dev" } });
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "a@b.com" } });
  fireEvent.click(screen.getByRole("button", { name: /Continue/i }));
  act(() => { jest.advanceTimersByTime(1000); });
  fireEvent.click(screen.getByRole("button", { name: /Start interview/i }));
}

export function goToCoding() {
  goToInterview();
  for (let i = 0; i < 4; i++) fireEvent.click(screen.getByRole("button", { name: /Skip/i }));
}

export function goToSummary(name = "TestUser", email = "t@t.com") {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: /Start Interview/i }));
  fireEvent.change(screen.getByLabelText(/Full name/i), { target: { value: name } });
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: email } });
  fireEvent.click(screen.getByRole("button", { name: /Continue/i }));
  act(() => { jest.advanceTimersByTime(1000); });
  fireEvent.click(screen.getByRole("button", { name: /Start interview/i }));
  fireEvent.click(screen.getByRole("button", { name: /End Interview/i }));
  fireEvent.click(screen.getByRole("button", { name: /Yes, end/i }));
}
