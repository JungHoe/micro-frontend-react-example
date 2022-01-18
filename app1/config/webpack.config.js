require("dotenv").config();
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const reactAppName = process.env.REACT_APP_NAME || "core";

const manifestConfig = {
  fileName: "asset-manifest.json",
  publicPath: "/",
  generate: (seed, files) => {
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

const entryObject = {};
entryObject[reactAppName] = "./src/App";

module.exports = {
  devtool: "source-map",
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
  entry: entryObject,
  output: {
    publicPath: "/",
    filename: "js/[name].[contenthash:8].js",
    path: path.resolve(__dirname, "../build"),
    library: "[name]",
    libraryTarget: "window",
    libraryExport: "default",
  },
  devServer: {
    hot: true,
    port: 3001,
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
  externals: {
    react: ["common-lib", "React"],
    "react-router-dom": ["common-lib", "ReactRouterDom"],
  },
};
