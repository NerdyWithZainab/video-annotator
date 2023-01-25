const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/pages/(.*)$": "<rootDir>/pages/$1",
    // "^firebase/app$": "<rootDir>/node_modules/firebase/lib/app/index.js",
    // "^firebase/auth$": "<rootDir>/node_modules/firebase/lib/auth/index.js",
    // "^firebase/app$": "<rootDir>/node_modules/firebase/firebase-app.js",
    // "^firebase/auth$": "<rootDir>/node_modules/firebase/firebase-auth.js",
  },
  testEnvironment: "jest-environment-jsdom",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
