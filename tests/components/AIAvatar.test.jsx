import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AIAvatar from "../../src/components/AIAvatar";

describe("AIAvatar", () => {
  it("default label", () => { render(<AIAvatar />); expect(screen.getByText("Platform-Hire AI")).toBeInTheDocument(); });
  it("custom label", () => { render(<AIAvatar label="Bot" />); expect(screen.getByText("Bot")).toBeInTheDocument(); });
  it("subtitle", () => { render(<AIAvatar />); expect(screen.getByText("Your AI interviewer")).toBeInTheDocument(); });
  it("Live when speaking", () => { render(<AIAvatar speaking={true} />); expect(screen.getByText("Live")).toBeInTheDocument(); });
  it("Idle when silent", () => { render(<AIAvatar speaking={false} />); expect(screen.getByText("Idle")).toBeInTheDocument(); });
  it("3 pulse rings speaking", () => { const { container } = render(<AIAvatar speaking={true} />); expect(container.querySelectorAll(".ring-pulse")).toHaveLength(3); });
  it("0 pulse rings silent", () => { const { container } = render(<AIAvatar speaking={false} />); expect(container.querySelectorAll(".ring-pulse")).toHaveLength(0); });
  it("sm size", () => { const { container } = render(<AIAvatar size="sm" />); expect(container.innerHTML).toContain("h-24"); });
  it("md size", () => { const { container } = render(<AIAvatar size="md" />); expect(container.innerHTML).toContain("h-40"); });
  it("lg size", () => { const { container } = render(<AIAvatar size="lg" />); expect(container.innerHTML).toContain("h-56"); });
});
