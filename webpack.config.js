const path = require("path");

module.exports = {
  mode: "development",
  entry: ["./src/index.js"],
  // devServer: {
  //   contentBase: path.join(__dirname, "src"),
  //   compress: true,
  //   port: 5500,
  // },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  watch: true,
};
