const path = require("path")

module.exports = {
  root: true,
  parser: "babel-eslint",
  env: {
    browser: true,
    node: true,
    jest: true,
    "jest/globals": true,
  },
  globals: {
    document: true,
    window: true,
    mount: true,
    shallow: true,
    render: true,
    describe: true,
    it: true,
    test: true,
    expect: true,
  },
  settings: {
    "import/external-module-folders": [
      "node_modules",
    ],
    "import/resolver": {
      webpack: {
        config: path.resolve("./webpack.config.dev.js"),
      },
    },
  },
  plugins: [
    "jest",
  ],
  extends: [
    "@alexseitsinger/eslint-config-base",
    "@alexseitsinger/eslint-config-react",
    "plugin:jest/recommended",
  ],
  rules: {
    "jest/expect-expect": 0,
  }
}
