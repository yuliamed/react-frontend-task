const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.export = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash].js"
    },
    resolve: {
        extentions: ["*", ".js", ".jsx", ".scss"],
    },
    plugins: [
        new HTMLWebpackPlugin({ template: "./public/index.html" }),
        new CleanWebpackPlugin()
    ]
}