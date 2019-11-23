module.exports = {
  presets: [
    ["@babel/preset-env", {
      corejs: 3,
      useBuiltIns: "entry",
    }],
    "@babel/preset-react",
    "@emotion/babel-preset-css-prop",
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-syntax-export-namespace-from",
  ],
  env: {
    development: {
      presets: [],
      plugins: [],
    },
    production: {
      presets: [],
      plugins: [
        "babel-plugin-transform-react-remove-prop-types",
      ]
    },
  },
}
