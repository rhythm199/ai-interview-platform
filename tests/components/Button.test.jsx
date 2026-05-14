import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "../../src/components/Button";

describe("Button", () => {
  it("renders children", () => { render(<Button>Click</Button>); expect(screen.getByText("Click")).toBeInTheDocument(); });
  it("renders icon", () => { render(<Button icon={<span data-testid="i">★</span>}>Go</Button>); expect(screen.getByTestId("i")).toBeInTheDocument(); });
  it("primary by default", () => { render(<Button>T</Button>); expect(screen.getByText("T").closest("button").className).toContain("from-indigo-500"); });
  it("secondary", () => { render(<Button variant="secondary">T</Button>); expect(screen.getByText("T").closest("button").className).toContain("border"); });
  it("ghost", () => { render(<Button variant="ghost">T</Button>); expect(screen.getByText("T").closest("button").className).toContain("text-[var(--muted)]"); });
  it("danger", () => { render(<Button variant="danger">T</Button>); expect(screen.getByText("T").closest("button").className).toContain("bg-red-500"); });
  it("success", () => { render(<Button variant="success">T</Button>); expect(screen.getByText("T").closest("button").className).toContain("bg-emerald-500"); });
  it("disabled", () => { render(<Button disabled>T</Button>); expect(screen.getByText("T").closest("button")).toBeDisabled(); });
  it("onClick fires", () => { const fn = jest.fn(); render(<Button onClick={fn}>Go</Button>); fireEvent.click(screen.getByText("Go")); expect(fn).toHaveBeenCalledTimes(1); });
  it("custom className", () => { render(<Button className="my-c">T</Button>); expect(screen.getByText("T").closest("button").className).toContain("my-c"); });
});
