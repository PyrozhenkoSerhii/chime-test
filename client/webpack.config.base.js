"use strict";
exports.__esModule = true;
var webpack_1 = require("webpack");
var Dotenv = require("dotenv-webpack");
var clean_webpack_plugin_1 = require("clean-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var config = {
    target: "web",
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"]
    },
    entry: "./index.tsx",
    output: {
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: "ts-loader"
            },
            {
                test: /\.(eot|ttf|woff2?|otf|png|jpe?g|gif|svg)$/,
                use: [
                    "file-loader",
                ]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader",
                ]
            },
        ]
    },
    plugins: [
        new Dotenv({
            path: "../server/.env"
        }),
        new webpack_1.ProgressPlugin(),
        new clean_webpack_plugin_1.CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./index.html"
        }),
    ]
};
exports["default"] = config;
