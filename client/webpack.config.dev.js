"use strict";
exports.__esModule = true;
var webpack_merge_1 = require("webpack-merge");
var webpack_config_base_1 = require("./webpack.config.base");
var devConfiguration = {
    entry: "./index.tsx",
    devServer: {
        historyApiFallback: true,
        hot: true,
        open: true,
        host: "localhost",
        port: 4000
    },
    devtool: "source-map"
};
var config = webpack_merge_1["default"](webpack_config_base_1["default"], devConfiguration);
exports["default"] = config;
