const path = require("path")

module.exports = {
  globals: {
    "process.env.NODE_ENV": "test",
  },
  setupFiles: ["./jest.setup.js"],
  moduleDirectories: [
    path.resolve("./src"),
    "node_modules",
  ],
  moduleFileExtensions: ["js", "jsx", "json",],
  moduleNameMapper: {
    "^tests(.*)$": "<rootDir>/tests$1",
    "^src(.*)$": "<rootDir>/src$1",
  },
  testRegex: "((/test/(integration/unit).js)|(test.js))$"
}
