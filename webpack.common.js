const path = require('path');
const webpack = require('webpack');

const getPath = (filePath) => path.resolve(__dirname, filePath);
const isNpmPublish = process.env.NODE_ENV === 'npm'; // npm 发布打包入一个文件里面
const basePath = process.env.NODE_ENV === 'production' ? 'build/prod/' : isNpmPublish ? 'dist/' : 'build/dev/';
console.log('current env: ', process.env.NODE_ENV);

const entry = isNpmPublish ? './src/index.js' : {
    'lib': [
        'react',
        'react-dom',
    ],
    'index': ['./src/index.jsx']
};
const output = isNpmPublish ? {
    filename: 'ReactLightPlayer.js',
    path: getPath(basePath),
    library: 'ReactLightPlayer',
    libraryTarget: 'commonjs2',
    libraryExport: 'default'
} : {
    path: getPath(basePath),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
};

const optimization = {
    splitChunks: {
        cacheGroups: {
            'lib': {
                name: 'lib',
                chunks: 'initial',
                priority: 2,
                minChunks: 2,
            },
        }
    }
};

const config = {
    // Plugins
    plugins: [
        new webpack.DefinePlugin({
            'process.browser': true
        })
    ],
    optimization,
    // Entry
    entry,
    // Output
    output,
    // Loaders
    module: {
        rules: [
            {
                test : /\.jsx?$/,
                include : path.resolve(__dirname, 'src'),
                use:['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name(file) {
                                return path.relative(path.join(__dirname, 'src'), file);
                            }
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: [{ loader: 'style-loader' }, { loader: 'postcss-loader' }, { loader: 'less-loader', options: { javascriptEnabled: true } }]
            }
        ]
    },
    // Resolve
    resolve: {
        extensions: ['.jsx', '.js', '.json']
    },
    performance: { hints: false }
};

module.exports = config;

