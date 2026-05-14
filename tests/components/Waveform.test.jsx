import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Waveform from "../../src/components/Waveform";

describe("Waveform", () => {
  it("renders 32 bars by default", () => { const { container } = render(<Waveform />); expect(container.querySelectorAll(".wave-bar")).toHaveLength(32); });
  it("renders custom count", () => { const { container } = render(<Waveform bars={10} />); expect(container.querySelectorAll(".wave-bar")).toHaveLength(10); });
  it("running when active", () => { const { container } = render(<Waveform active={true} />); expect(container.querySelector(".wave-bar").style.animationPlayState).toBe("running"); });
  it("paused when inactive", () => { const { container } = render(<Waveform active={false} />); const b = container.querySelector(".wave-bar"); expect(b.style.animationPlayState).toBe("paused"); expect(b.style.transform).toBe("scaleY(0.25)"); });
});
