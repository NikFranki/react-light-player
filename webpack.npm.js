const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'production',
    externals: ['react', 'react-dom'],
    optimization: {
        minimizer: [new UglifyJsPlugin({
            uglifyOptions: {
                warnings: false,
                compress: {
                    drop_debugger: true,
                    drop_console: true
                }
            }
        })],
    }
});