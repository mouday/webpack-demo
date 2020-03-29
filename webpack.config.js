'use strict'
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');

module.exports = {
    // 文件监听
    watch: true,

    watchOptions: {
        //默认为空，设置不监听的文件或者文件夹，支持正则匹配
        ignored: /node_modules/,
        //监听到变化发生后会等300ms再去执行，默认300ms
        aggregateTimeout: 300,
        //设置轮询文件是否变化时间，默认每秒问1000次
        poll: 1000
    },

    // 打包入口
    entry: {
        index: './src/index.js',
    },

    // 指定输出地址及打包出来的文件名
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js'
    },

    plugins: [
        // 自动生成基本的 html 页面
        new HtmlWebpackPlugin({
            title: 'leaningwebpack',        // 文件的标题
            filename: 'webpack-index.html', // 文件名
            favicon: 'src/demo.png'          // 网页图标
        }),

        // 热更新
        new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
        contentBase: './dist',
        hot: true
    },

    module: {
        rules: [
            {
                test: /.js$/,
                use: 'babel-loader',
                // 忽略依赖包
                exclude: /node_modules/
            },
            {
                test: /.css$/,
                // 执行的时候是先加载css-loader，将css解析好后再将css传递给style-loader
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /.(jpg|png|gif|jpeg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // 如果图片大小小于这个值，就会被打包为base64格式
                        limit: 160000,
                        name: 'imgs/[name].[hash].[ext]'
                    }
                }]
            }
        ]
    },

    // 开发环境
    mode: 'production',
}