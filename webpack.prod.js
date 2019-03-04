const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');

const htmlminify = {
    removeAttributeQuotes: true,
    minifyCSS: true,
    minifyJS: true,
    collapseWhitespace: true,
    removeComments: true
};

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimizer: [new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false,
                    drop_debugger: true,
                    drop_console: true
                }
            }
        })],
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: 'src/lib/imgs/favicon.ico',
            template: 'src/index.html',
            filename: 'index.html',
            inject: true,
            minify: htmlminify
        })
    ]
});