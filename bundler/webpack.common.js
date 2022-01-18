const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "../src/index.js"),
  resolve: {
    extensions: [".js"],
    alias: {
      "@components": path.resolve(__dirname, "../src/components"),
      "@pages": path.resolve(__dirname, "../src/pages"),
      "@assets": path.resolve(__dirname, "../src/assets"),
      "@router": path.resolve(__dirname, "../src/router"),
    },
  },
  output: {
    hashFunction: "xxhash64",
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "../dist"),
  },
  devtool: "source-map",
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve(__dirname, "../static") }],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html"),
      minify: true,
    }),
    new MiniCSSExtractPlugin(),
  ],
  module: {
    rules: [
      // HTML
      {
        test: /\.(html)$/,
        use: ["html-loader"],
      },

      // JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },

      // CSS
      {
        test: /\.s?css$/i,
        use: [
          MiniCSSExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },

      // Images
      {
        test: /\.(jpg|png|gif|svg|glb|gltf)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[hash][ext]",
        },
      },

      // Fonts
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[hash][ext]",
        },
      },
    ],
  },
};
