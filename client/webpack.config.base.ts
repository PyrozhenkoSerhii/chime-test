import { Configuration as WebpackConfiguration, ProgressPlugin } from "webpack";
import * as Dotenv from "dotenv-webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import * as HtmlWebpackPlugin from "html-webpack-plugin";

const config: WebpackConfiguration = {
  target: "web",
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  entry: "./index.tsx",
  output: {
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
      },
      {
        test: /\.(eot|ttf|woff2?|otf|png|jpe?g|gif|svg)$/,
        use: [
          "file-loader",
        ],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: "../server/.env",
    }),
    new ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};

export default config;
