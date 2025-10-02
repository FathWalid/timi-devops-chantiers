export default {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/tests/setupTest.js"],
  transform: {}, // on désactive Babel, on reste en pur Node ESM
};
