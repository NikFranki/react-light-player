const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        stats: {
            maxModules: 0,
            modules: false
        },
        host: '127.0.0.1',
        port: 8886,
        inline: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: 'src/lib/imgs/favicon.ico',
            template: 'src/index.html',
            filename: 'index.html',
            inject: true
        })
    ],
});