const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');


const reactAppName = (process.env.REACT_APP_NAME || 'core');

const manifestConfig={
    fileName: 'asset-manifest.json',
    publicPath: '/',
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
  }

module.exports = {
devtool:'eval-source-map',
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
    ],
  },
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../build"),
  },
  devServer: {
    hot: true,
    port: 3000,
    open: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new WebpackManifestPlugin(manifestConfig),
  ],
};
