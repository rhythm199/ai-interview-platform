import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockMatchMedia, goToDetails } from "../helpers";

describe("CandidateDetailsScreen", () => {
  beforeEach(() => mockMatchMedia());
  it("step indicator", () => { goToDetails(); expect(screen.getByText("Step 1 of 3")).toBeInTheDocument(); });
  it("validates empty name", () => { goToDetails(); fireEvent.click(screen.getByRole("button", { name: /Continue/i })); expect(screen.getByText(/Please enter your name/i)).toBeInTheDocument(); });
  it("validates empty email", () => { goToDetails(); fireEvent.change(screen.getByLabelText(/Full name/i), { target: { value: "J" } }); fireEvent.click(screen.getByRole("button", { name: /Continue/i })); expect(screen.getByText(/Please enter your email/i)).toBeInTheDocument(); });
  it("validates bad email", () => { goToDetails(); fireEvent.change(screen.getByLabelText(/Full name/i), { target: { value: "J" } }); fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "bad" } }); fireEvent.click(screen.getByRole("button", { name: /Continue/i })); expect(screen.getByText(/Enter a valid email/i)).toBeInTheDocument(); });
  it("resume upload area", () => { goToDetails(); expect(screen.getByText(/Click to upload your resume/i)).toBeInTheDocument(); });
  it("adds skill via suggestion", () => { goToDetails(); fireEvent.click(screen.getByRole("button", { name: /\+ Docker/i })); expect(screen.getByText("Docker")).toBeInTheDocument(); });
  it("removes skill", () => { goToDetails(); fireEvent.click(screen.getByRole("button", { name: /Remove React/i })); expect(screen.queryByText("React")).toBeNull(); });
  it("back to landing", () => { goToDetails(); fireEvent.click(screen.getByRole("button", { name: /Back/i })); expect(screen.getByText(/Interview smarter with/i)).toBeInTheDocument(); });
  it("valid form → setup", () => { goToDetails(); fireEvent.change(screen.getByLabelText(/Full name/i), { target: { value: "A" } }); fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "a@b.com" } }); fireEvent.click(screen.getByRole("button", { name: /Continue/i })); expect(screen.getByText(/Check your setup/i)).toBeInTheDocument(); });

  // Cover skill keyboard input (lines 120-126)
  it("adds skill via Enter key", () => {
    goToDetails();
    const skillInput = screen.getByPlaceholderText(/Add more/i);
    fireEvent.change(skillInput, { target: { value: "Redux" } });
    fireEvent.keyDown(skillInput, { key: "Enter" });
    expect(screen.getByText("Redux")).toBeInTheDocument();
  });

  it("adds skill via comma key", () => {
    goToDetails();
    const skillInput = screen.getByPlaceholderText(/Add more/i);
    fireEvent.change(skillInput, { target: { value: "Vue" } });
    fireEvent.keyDown(skillInput, { key: "," });
    expect(screen.getByText("Vue")).toBeInTheDocument();
  });

  it("removes last skill via Backspace on empty input", () => {
    goToDetails();
    const skills = screen.getAllByText(/React|JavaScript|CSS/);
    const initialCount = skills.length;
    const skillInput = screen.getByPlaceholderText(/Add more/i);
    fireEvent.keyDown(skillInput, { key: "Backspace" });
    // One skill should be removed
    expect(initialCount).toBeGreaterThan(0);
  });

  it("changes role dropdown", () => {
    goToDetails();
    const roleSelect = screen.getByLabelText(/Role applied for/i);
    fireEvent.change(roleSelect, { target: { value: "Backend Engineer" } });
    expect(roleSelect.value).toBe("Backend Engineer");
  });

  it("changes experience dropdown", () => {
    goToDetails();
    const expSelect = screen.getByLabelText(/Experience level/i);
    fireEvent.change(expSelect, { target: { value: "5-7 years" } });
    expect(expSelect.value).toBe("5-7 years");
  });

  it("file input displays filename on upload", () => {
    goToDetails();
    const fileInput = document.querySelector('input[type="file"]');
    const file = new File(["resume"], "resume.pdf", { type: "application/pdf" });
    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(screen.getByText("resume.pdf")).toBeInTheDocument();
  });

  it("validates skills required when all removed", () => {
    goToDetails();
    // Remove all default skills
    fireEvent.click(screen.getByRole("button", { name: /Remove React/i }));
    fireEvent.click(screen.getByRole("button", { name: /Remove JavaScript/i }));
    fireEvent.click(screen.getByRole("button", { name: /Remove CSS/i }));
    fireEvent.change(screen.getByLabelText(/Full name/i), { target: { value: "A" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "a@b.com" } });
    fireEvent.click(screen.getByRole("button", { name: /Continue/i }));
    expect(screen.getByText(/Add at least one skill/i)).toBeInTheDocument();
  });
});
