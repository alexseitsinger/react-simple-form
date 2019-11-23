const path = require("path")

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  target: "node",
  devtool: "source-map",
  output: {
    path: path.resolve("./dist"),
    filename: "[name].dev.js",
    sourceMapFilename: "[name].dev.js.map",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve("./src"),
        ],
        use: "babel-loader"
      }
    ]
  },
  resolve: {
    alias: {
      "@tests": path.resolve("./tests"),
      "@src": path.resolve("./src"),
    },
  }
}
