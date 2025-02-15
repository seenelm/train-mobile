module.exports = {
  preset: "react-native",
  testEnvironment: "jest-fixed-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  // testEnvironmentOptions: {
  //   customExportConditions: [""],
  // },
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1", // Match tsconfig paths
  },
  testMatch: [
    "<rootDir>/__tests__/**/*.{js,jsx,ts,tsx}", // Find tests in __tests__ folder
    "<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}", // Find tests anywhere in src/
  ],
  globals: {
    Request,
    Response,
    TextEncoder,
    TextDecoder,
  },
};
