export default {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.jsx?$": "babel-jest",
    },
    moduleFileExtensions: ["js", "jsx", "json"],
    moduleNameMapper: {
      "\\.(css|less|scss)$": "identity-obj-proxy",
    },
    setupFilesAfterSetup: ["<rootDir>/tests/setupTests.js"],
    testMatch: ["<rootDir>/tests/**/*.test.jsx"],
  };
  