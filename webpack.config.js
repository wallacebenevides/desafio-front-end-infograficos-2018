const path = require('path');
const babiliPlugin = require('babili-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const HtmlWepackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

let plugins = [];

plugins.push(new HtmlWepackPlugin({


    hash: true,
    minify: {
        html5: true,
        collapseWhitespace: true,
        removeComments: true
    },
    filename: 'index.html',
    template: __dirname + '/src/main.html'

}));

plugins.push(
    new CopyWebpackPlugin([
        { from: 'src/assets/', to: 'assets/' }
    ])
)

plugins.push(new extractTextPlugin('styles.css'))

plugins.push(new webpack.optimize.CommonsChunkPlugin({

    name: 'vendor',
    filename: 'vendor.bundle.js'

}));
const ENV = process.env.NODE_ENV;

const { api } = require(`./config/config-${ENV}.json`);

plugins.push(new webpack.DefinePlugin({ SERVICE_URL: JSON.stringify(api) }));

if (ENV == 'prod') {

    plugins.push(new webpack.optimize.ModuleConcatenationPlugin());

    plugins.push(new babiliPlugin());

    plugins.push(new optimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
            autoprefixer: true,
            discardUnused: true,
            discardComments: {
                removeAll: true
            }
        },
        canPrint: true
    }));
}


module.exports = {
    entry: {
        app: './src/main.js',
        vendor: ['reflect-metadata']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: [
        './src/assets/img'
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: extractTextPlugin
                    .extract({
                        fallback: 'style-loader',
                        use: [
                            { loader: 'css-loader' },
                            { loader: 'sass-loader' }
                        ]
                    })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                exclude: /node_modules/,
                loader: 'file-loader'
            }
        ]
    },
    plugins
}
