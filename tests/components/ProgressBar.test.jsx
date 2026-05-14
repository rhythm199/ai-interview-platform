import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProgressBar from "../../src/components/ProgressBar";

describe("ProgressBar", () => {
  it("renders without label", () => { const { container } = render(<ProgressBar value={50} />); expect(container.querySelector(".h-2")).toBeInTheDocument(); });
  it("renders label and %", () => { render(<ProgressBar value={72.6} label="Prog" />); expect(screen.getByText("Prog")).toBeInTheDocument(); expect(screen.getByText("73%")).toBeInTheDocument(); });
  it("clamps >100", () => { const { container } = render(<ProgressBar value={150} />); expect(container.querySelector(".h-full").style.width).toBe("100%"); });
  it("clamps <0", () => { const { container } = render(<ProgressBar value={-20} />); expect(container.querySelector(".h-full").style.width).toBe("0%"); });
  it("indigo default", () => { const { container } = render(<ProgressBar value={50} />); expect(container.querySelector(".h-full").className).toContain("from-indigo-500"); });
  it("emerald", () => { const { container } = render(<ProgressBar value={50} color="emerald" />); expect(container.querySelector(".h-full").className).toContain("from-emerald-500"); });
  it("amber", () => { const { container } = render(<ProgressBar value={50} color="amber" />); expect(container.querySelector(".h-full").className).toContain("from-amber-500"); });
  it("violet", () => { const { container } = render(<ProgressBar value={50} color="violet" />); expect(container.querySelector(".h-full").className).toContain("from-violet-500"); });
});
