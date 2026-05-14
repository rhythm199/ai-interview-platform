import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../../src/App";
import { mockMatchMedia } from "../helpers";

describe("LandingScreen", () => {
  beforeEach(() => mockMatchMedia());
  it("hero heading", () => { render(<App />); expect(screen.getByText(/Interview smarter with/i)).toBeInTheDocument(); });
  it("AI demo", () => { render(<App />); expect(screen.getAllByText("Platform-Hire AI").length).toBeGreaterThanOrEqual(1); });
  it("stats", () => { render(<App />); expect(screen.getByText("~25 min")).toBeInTheDocument(); expect(screen.getAllByText("6").length).toBeGreaterThanOrEqual(1); expect(screen.getByText("98%")).toBeInTheDocument(); });
  it("features", () => { render(<App />); expect(screen.getByText("Adaptive Questions")).toBeInTheDocument(); expect(screen.getByText("Live Coding")).toBeInTheDocument(); expect(screen.getByText("Instant Insights")).toBeInTheDocument(); expect(screen.getByText("Fair & Unbiased")).toBeInTheDocument(); });
  it("how it works", () => { render(<App />); expect(screen.getByText("How it works")).toBeInTheDocument(); });
  it("Start Interview → details", () => { render(<App />); fireEvent.click(screen.getByRole("button", { name: /Start Interview/i })); expect(screen.getByText(/Tell us about yourself/i)).toBeInTheDocument(); });
  it("Learn how it works → details", () => { render(<App />); fireEvent.click(screen.getByRole("button", { name: /Learn how it works/i })); expect(screen.getByText(/Tell us about yourself/i)).toBeInTheDocument(); });
});

