import * as path from "path";
import MiniCSSExtractPlugin from "mini-css-extract-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { Configuration, ProgressPlugin } from "webpack";

const outputPath: string = path.resolve(__dirname, "dist");

const config: Configuration = {
  // https://webpack.js.org/configuration/mode/
  mode: "development",

  // https://webpack.js.org/configuration/entry-context/
  entry: "./src/index",

  // https://webpack.js.org/configuration/watch/#watch
  watch: true,

  // https://webpack.js.org/configuration/output/
  output: {
    library: {
      type: "umd",
      name: "sample_package",
    },
    publicPath: "./",
    path: outputPath,
    filename: "[name].bundle.js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".css"],
  },

  // https://webpack.js.org/configuration/target/
  target: "node",

  // https://webpack.js.org/plugins/
  plugins: [new ProgressPlugin(), new MiniCSSExtractPlugin()],

  // https://webpack.js.org/guides/development/#using-source-maps
  devtool: "eval-cheap-module-source-map",

  // https://webpack.js.org/loaders/
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            ["@babel/plugin-proposal-class-properties", { loose: true }],
          ],
        },
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/i,
        use: [MiniCSSExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: ["file-loader"],
      },
    ],
  },

  // https://webpack.js.org/configuration/optimization/
  optimization: {
    minimize: false,
    emitOnErrors: true,
    moduleIds: "natural",
    chunkIds: "natural",
    nodeEnv: "development",
    removeAvailableModules: false,
    removeEmptyChunks: false,
    mangleExports: false,
    innerGraph: false,
  },

  // https://webpack.js.org/configuration/performance/
  performance: {
    hints: false,
  },
};

export default config;
