import { QUESTIONS, CODING_PROBLEM } from "../../src/data/questions";

describe("QUESTIONS data", () => {
  it("exports exactly 6 questions", () => { expect(QUESTIONS).toHaveLength(6); });
  it("each question has required fields", () => { QUESTIONS.forEach((q) => { expect(q).toHaveProperty("id"); expect(q).toHaveProperty("type"); expect(q).toHaveProperty("difficulty"); expect(q).toHaveProperty("title"); expect(q).toHaveProperty("prompt"); expect(q).toHaveProperty("timeLimitSec"); }); });
  it("timeLimitSec is positive number", () => { QUESTIONS.forEach((q) => { expect(typeof q.timeLimitSec).toBe("number"); expect(q.timeLimitSec).toBeGreaterThan(0); }); });
  it("types are valid", () => { QUESTIONS.forEach((q) => expect(["behavioral","technical","coding"]).toContain(q.type)); });
  it("difficulties are valid", () => { QUESTIONS.forEach((q) => expect(["Easy","Medium","Hard"]).toContain(q.difficulty)); });
  it("unique IDs", () => { const ids = QUESTIONS.map((q)=>q.id); expect(new Set(ids).size).toBe(ids.length); });
  it("has behavioral questions", () => { expect(QUESTIONS.some((q) => q.type === "behavioral")).toBe(true); });
  it("has technical questions", () => { expect(QUESTIONS.some((q) => q.type === "technical")).toBe(true); });
  it("has coding questions", () => { expect(QUESTIONS.some((q) => q.type === "coding")).toBe(true); });
  it("prompts are non-empty", () => { QUESTIONS.forEach((q) => { expect(q.prompt.length).toBeGreaterThan(10); }); });
});

describe("CODING_PROBLEM data", () => {
  it("has title, difficulty, statement", () => { expect(CODING_PROBLEM).toHaveProperty("title"); expect(CODING_PROBLEM).toHaveProperty("difficulty"); expect(CODING_PROBLEM).toHaveProperty("statement"); });
  it("has examples", () => { expect(CODING_PROBLEM.examples.length).toBeGreaterThan(0); CODING_PROBLEM.examples.forEach((ex) => { expect(ex).toHaveProperty("input"); expect(ex).toHaveProperty("output"); expect(ex).toHaveProperty("explanation"); }); });
  it("has constraints", () => { expect(CODING_PROBLEM.constraints.length).toBeGreaterThan(0); });
  it("has test cases", () => { expect(CODING_PROBLEM.testCases.length).toBeGreaterThan(0); CODING_PROBLEM.testCases.forEach((tc) => { expect(tc).toHaveProperty("input"); expect(tc).toHaveProperty("expected"); }); });
  it("has starter code for all languages", () => { expect(CODING_PROBLEM.starterCode).toHaveProperty("JavaScript"); expect(CODING_PROBLEM.starterCode).toHaveProperty("TypeScript"); expect(CODING_PROBLEM.starterCode).toHaveProperty("Python"); Object.values(CODING_PROBLEM.starterCode).forEach((c) => expect(c.length).toBeGreaterThan(10)); });
});
