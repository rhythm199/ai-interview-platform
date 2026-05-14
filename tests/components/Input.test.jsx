import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input, { Select } from "../../src/components/Input";

describe("Input", () => {
  it("renders label", () => { render(<Input label="Name" />); expect(screen.getByText("Name")).toBeInTheDocument(); });
  it("renders without label", () => { const { container } = render(<Input placeholder="x" />); expect(container.querySelector("input")).toBeInTheDocument(); });
  it("renders hint", () => { render(<Input hint="Help" />); expect(screen.getByText("Help")).toBeInTheDocument(); });
  it("error replaces hint", () => { render(<Input hint="h" error="Required" />); expect(screen.getByText("Required")).toBeInTheDocument(); expect(screen.queryByText("h")).toBeNull(); });
  it("renders icon", () => { render(<Input icon={<span data-testid="i">@</span>} />); expect(screen.getByTestId("i")).toBeInTheDocument(); });
  it("error border", () => { const { container } = render(<Input error="e" />); expect(container.querySelector("input").className).toContain("border-red-400"); });
  it("onChange fires", () => { const fn = jest.fn(); render(<Input onChange={fn} />); fireEvent.change(screen.getByRole("textbox"), { target: { value: "x" } }); expect(fn).toHaveBeenCalled(); });
});

describe("Select", () => {
  const opts = [{ value: "a", label: "Alpha" }, { value: "b", label: "Beta" }];
  it("renders label", () => { render(<Select label="Pick" options={opts} />); expect(screen.getByText("Pick")).toBeInTheDocument(); });
  it("renders options", () => { render(<Select options={opts} />); expect(screen.getByText("Alpha")).toBeInTheDocument(); expect(screen.getByText("Beta")).toBeInTheDocument(); });
  it("onChange fires", () => { const fn = jest.fn(); render(<Select options={opts} onChange={fn} />); fireEvent.change(screen.getByRole("combobox"), { target: { value: "b" } }); expect(fn).toHaveBeenCalled(); });
});
