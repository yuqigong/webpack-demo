var Path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var ROOT_PATH = Path.resolve(__dirname);
var ASSETS_PATH = Path.resolve(ROOT_PATH, 'assets');
var DIST_PATH = Path.resolve(ROOT_PATH, 'dist');

module.exports = {
    //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
    entry: {
        index: './src/index.js'
    },
    //输出的文件名 合并以后的js会命名为bundle.js
    output: {
        path: DIST_PATH,
        filename: '[name].[hash].js'
    },
    module: {
        loaders: [{
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
        }, {
            test: /\.(jpg|png|svg)$/,
            loader: 'url?limit=8192'
        }]
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
    },
    //添加我们的插件 会自动生成一个html文件
    plugins: [
        // 用于在building之前删除你以前build过的文件
        new CleanWebpackPlugin(['dist'], {
            root: ROOT_PATH,
            verbose: true,
            dry: false
        }),
        new ExtractTextPlugin('style.[contenthash].css', {
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/template.html'
        })
    ]
};
