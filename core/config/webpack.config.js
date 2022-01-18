require("dotenv").config();
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const reactAppName = process.env.REACT_APP_NAME || "core";

const manifestConfig = {
  fileName: "asset-manifest.json",
  publicPath: "/",
  generate: (seed, files, entrypoints) => {
    const manifestFiles = files.reduce((manifest, file) => {
      manifest[file.name] = file.path;
      return manifest;
    }, seed);
    //   const entrypointFiles = entrypoints.main.filter(
    //     fileName => !fileName.endsWith('.map')
    //   );

    return {
      files: manifestFiles,
      id: reactAppName,
    };
  },
};

module.exports = {
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "esbuild-loader",
        options: {
          loader: "jsx",
          target: "es2015",
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  mode: "development",
  entry: "./src/index.js",
  output: {
    publicPath: "/",
    filename: "bundle.js",
    path: path.resolve(__dirname, "../build"),
  },
  devServer: {
    hot: true,
    port: 3000,
    open: false,
    historyApiFallback: true,
    allowedHosts: "all",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new MiniCssExtractPlugin(),
    new WebpackManifestPlugin(manifestConfig),
  ],
};
