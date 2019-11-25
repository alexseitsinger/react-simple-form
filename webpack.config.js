const path = require("path")
const nodeExternals = require("webpack-node-externals")
const TerserPlugin = require("terser-webpack-plugin")

module.exports = {
  entry: "./src/index.js",
  mode: "production",
  target: "node",
  devtool: false,
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve("./src")],
        use: "babel-loader",
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        sourceMap: false,
        extractComments: false,
        terserOptions: {
          warnings: false,
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  externals: [
    nodeExternals({
      modulesFromFile: {
        exclude: ["dependencies"],
        include: ["devDependencies", "peerDependencies"],
      },
    }),
  ],
  resolve: {
    alias: {
      "tests": path.resolve("./tests"),
      "src": path.resolve("./src"),
    },
  },
}
