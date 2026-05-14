export const QUESTIONS = [
  {
    id: 1,
    type: "behavioral",
    difficulty: "Easy",
    title: "Tell me about yourself",
    prompt:
      "Could you briefly walk me through your background, what you're currently working on, and what excites you about this role?",
    timeLimitSec: 120,
  },
  {
    id: 2,
    type: "behavioral",
    difficulty: "Medium",
    title: "A challenging project",
    prompt:
      "Describe a technically challenging project you led. What made it difficult, how did you approach it, and what was the outcome?",
    timeLimitSec: 180,
  },
  {
    id: 3,
    type: "technical",
    difficulty: "Medium",
    title: "React rendering behavior",
    prompt:
      "Explain the difference between useMemo, useCallback, and React.memo. When would you choose one over another, and what are the tradeoffs?",
    timeLimitSec: 180,
  },
  {
    id: 4,
    type: "technical",
    difficulty: "Hard",
    title: "Designing a scalable component",
    prompt:
      "How would you design a reusable DataTable component that supports sorting, filtering, pagination, and virtualized rows for 100k+ rows?",
    timeLimitSec: 240,
  },
  {
    id: 5,
    type: "coding",
    difficulty: "Medium",
    title: "Two Sum",
    prompt:
      "Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target.",
    timeLimitSec: 900,
  },
  {
    id: 6,
    type: "coding",
    difficulty: "Hard",
    title: "Debounce implementation",
    prompt:
      "Implement a generic debounce function in JavaScript that supports cancellation and a leading-edge option.",
    timeLimitSec: 900,
  },
];

export const CODING_PROBLEM = {
  title: "Two Sum",
  difficulty: "Medium",
  statement:
    "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume each input has exactly one solution, and you may not use the same element twice.",
  examples: [
    { input: "nums = [2, 7, 11, 15], target = 9", output: "[0, 1]", explanation: "nums[0] + nums[1] == 9" },
    { input: "nums = [3, 2, 4], target = 6", output: "[1, 2]", explanation: "nums[1] + nums[2] == 6" },
  ],
  constraints: [
    "2 ≤ nums.length ≤ 10⁴",
    "-10⁹ ≤ nums[i] ≤ 10⁹",
    "Only one valid answer exists.",
  ],
  starterCode: {
    JavaScript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Write your code here
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  
  return [];
  
}

// Example
console.log(twoSum([2, 7, 11, 15], 9));`,
    TypeScript: `function twoSum(nums: number[], target: number): number[] {
  // Write your code here
  
}

// Example
console.log(twoSum([2, 7, 11, 15], 9));`,
    Python: `def twoSum(nums, target):
    # Write your code here
    pass

# Example
print(twoSum([2, 7, 11, 15], 9))`,
  },
  testCases: [
    { input: "[2,7,11,15], 9", expected: "[0,1]" },
    { input: "[3,2,4], 6", expected: "[1,2]" },
    { input: "[3,3], 6", expected: "[0,1]" },
  ],
};
