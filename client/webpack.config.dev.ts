import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import merge from "webpack-merge";

import baseConfig from "./webpack.config.base";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const devConfiguration: Configuration = {
  entry: "./index.tsx",
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true,
    host: "localhost",
    port: 4000,
  },
  devtool: "source-map",
};

const config: Configuration = merge(baseConfig, devConfiguration);

export default config;
